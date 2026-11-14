import { logEventFromContext } from 'corsair/core';
import type { IgnisignEndpoint } from '..';
import { makeIgnisignRequest } from '../client';
import type { UserInvitation } from './types';
import {
	IgnisignEndpointInputSchemas,
	IgnisignEndpointOutputSchemas,
} from './types';

export const list: IgnisignEndpoint<'userInvitations.list'> = async (
	ctx,
	input,
) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['userInvitations.list'].parse(input);
	const endpoint = `/v4/applications/${encodeURIComponent(parsedInput.appId)}/users-invitations`;
	const response = await makeIgnisignRequest<UserInvitation[]>(
		endpoint,
		ctx.key,
		{
			method: 'GET',
		},
	);
	const parsed =
		IgnisignEndpointOutputSchemas['userInvitations.list'].parse(response);
	await logEventFromContext(
		ctx,
		'ignisign.userInvitations.list',
		{ appId: parsedInput.appId, count: parsed.length },
		'completed',
	);
	return parsed;
};

export const invite: IgnisignEndpoint<'userInvitations.invite'> = async (
	ctx,
	input,
) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['userInvitations.invite'].parse(input);
	const endpoint = `/v4/applications/${encodeURIComponent(parsedInput.appId)}/users-invitations`;
	const response = await makeIgnisignRequest<UserInvitation>(
		endpoint,
		ctx.key,
		{
			method: 'POST',
			body: { email: parsedInput.email, roles: parsedInput.roles },
		},
	);
	const parsed =
		IgnisignEndpointOutputSchemas['userInvitations.invite'].parse(response);
	await logEventFromContext(
		ctx,
		'ignisign.userInvitations.invite',
		{ appId: parsedInput.appId },
		'completed',
	);
	return parsed;
};

export const resend: IgnisignEndpoint<'userInvitations.resend'> = async (
	ctx,
	input,
) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['userInvitations.resend'].parse(input);
	const endpoint = `/v4/applications/${encodeURIComponent(parsedInput.appId)}/users-invitations/${encodeURIComponent(parsedInput.userInvitationId)}/resend`;
	await makeIgnisignRequest(endpoint, ctx.key, {
		method: 'POST',
		body: {},
	});
	const response = IgnisignEndpointOutputSchemas[
		'userInvitations.resend'
	].parse({
		success: true,
	});
	await logEventFromContext(
		ctx,
		'ignisign.userInvitations.resend',
		{
			appId: parsedInput.appId,
			userInvitationId: parsedInput.userInvitationId,
		},
		'completed',
	);
	return response;
};

export const cancel: IgnisignEndpoint<'userInvitations.cancel'> = async (
	ctx,
	input,
) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['userInvitations.cancel'].parse(input);
	const endpoint = `/v4/applications/${encodeURIComponent(parsedInput.appId)}/users-invitations/${encodeURIComponent(parsedInput.userInvitationId)}`;
	await makeIgnisignRequest(endpoint, ctx.key, {
		method: 'DELETE',
	});
	const response = IgnisignEndpointOutputSchemas[
		'userInvitations.cancel'
	].parse({
		success: true,
	});
	await logEventFromContext(
		ctx,
		'ignisign.userInvitations.cancel',
		{
			appId: parsedInput.appId,
			userInvitationId: parsedInput.userInvitationId,
		},
		'completed',
	);
	return response;
};

export const edit: IgnisignEndpoint<'userInvitations.edit'> = async (
	ctx,
	input,
) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['userInvitations.edit'].parse(input);
	const endpoint = `/v4/applications/${encodeURIComponent(parsedInput.appId)}/users-invitations/${encodeURIComponent(parsedInput.userInvitationId)}`;
	const response = await makeIgnisignRequest<UserInvitation>(
		endpoint,
		ctx.key,
		{
			method: 'PUT',
			body: { roles: parsedInput.roles },
		},
	);
	const parsed =
		IgnisignEndpointOutputSchemas['userInvitations.edit'].parse(response);
	await logEventFromContext(
		ctx,
		'ignisign.userInvitations.edit',
		{
			appId: parsedInput.appId,
			userInvitationId: parsedInput.userInvitationId,
		},
		'completed',
	);
	return parsed;
};

export const UserInvitationsEndpoints = {
	list,
	invite,
	resend,
	cancel,
	edit,
} as const;
