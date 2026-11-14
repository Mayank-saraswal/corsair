import type { CorsairEndpoint } from 'corsair/core';
import { logEventFromContext } from 'corsair/core';
import type { SimlaComContext } from '..';
import { makeSimlaComRequest } from '../client';
import { SIMLACOM_INPUT_SCHEMAS, SIMLACOM_OUTPUT_SCHEMAS } from './schemas';
import type {
	JsonValue,
	SimlaComEndpointInput,
	SimlaComOperation,
} from './types';
import { SIMLACOM_OPERATIONS } from './types';

export type SimlaComEndpoint = CorsairEndpoint<
	SimlaComContext,
	SimlaComEndpointInput,
	JsonValue
>;

// Dynamic endpoint inputs and provider responses must be narrowed before property access.
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Output values stay unknown until validated, then this guard confirms they are serializable JSON.
function isJsonValue(value: unknown): value is JsonValue {
	if (
		value === null ||
		typeof value === 'string' ||
		typeof value === 'boolean'
	) {
		return true;
	}
	if (typeof value === 'number') return Number.isFinite(value);
	if (Array.isArray(value)) return value.every(isJsonValue);
	if (!isRecord(value)) return false;
	return Object.values(value).every(isJsonValue);
}

function operationFor(id: string): SimlaComOperation {
	const operation = SIMLACOM_OPERATIONS.find(
		(candidate) => candidate.id === id,
	);
	if (!operation) throw new Error(`Unknown Simla.com operation: ${id}`);
	return operation;
}

// Zod returns this dynamic wrapper as unknown; narrow it into the transport request shape.
function requestInput(value: unknown): {
	path?: Record<string, string | number>;
	query?: Record<string, unknown>;
	body?: unknown;
} {
	if (!isRecord(value))
		throw new Error('Simla.com operation input must be an object.');
	const request: {
		path?: Record<string, string | number>;
		query?: Record<string, unknown>;
		body?: unknown;
	} = {};
	if (isRecord(value.path)) {
		const path: Record<string, string | number> = {};
		for (const [key, item] of Object.entries(value.path)) {
			if (typeof item === 'string' || typeof item === 'number')
				path[key] = item;
		}
		request.path = path;
	}
	if (isRecord(value.query)) request.query = value.query;
	if ('body' in value) request.body = value.body;
	return request;
}

export function createSimlaComOperationEndpoint(id: string): SimlaComEndpoint {
	return async (ctx, input) => {
		const operation = operationFor(id);
		const inputSchema = SIMLACOM_INPUT_SCHEMAS.get(id);
		const outputSchema = SIMLACOM_OUTPUT_SCHEMAS.get(id);
		if (!inputSchema || !outputSchema) {
			throw new Error(`Simla.com schemas are missing for ${operation.id}.`);
		}
		const parsedInput = inputSchema.parse(input);
		const subdomain = ctx.options.subdomain;
		const response = await makeSimlaComRequest(
			operation,
			ctx.key,
			subdomain,
			requestInput(parsedInput),
		);
		const parsedOutput = outputSchema.parse(response);
		if (!isJsonValue(parsedOutput)) {
			throw new Error(`Simla.com ${operation.id} returned invalid JSON data.`);
		}
		await logEventFromContext(ctx, `simlacom.${operation.id}`, {}, 'completed');
		return parsedOutput;
	};
}
