import { logEventFromContext } from 'corsair/core';
import { makeInterzoidRequest } from '../client';
import type { InterzoidContext } from '../index';
import type {
	ConvertCurrencyInput,
	ConvertCurrencyOutput,
	GetCurrencyRateInput,
	GetCurrencyRateOutput,
	GetEntityTypeInput,
	GetEntityTypeOutput,
	GetGenderInput,
	GetGenderOutput,
	GetGlobalLatencyInput,
	GetGlobalLatencyOutput,
	GetGlobalPageLoadInput,
	GetGlobalPageLoadOutput,
	GetGlobalTimeInput,
	GetGlobalTimeOutput,
	GetGlobalWeatherInput,
	GetGlobalWeatherOutput,
	GetNameOriginInput,
	GetNameOriginOutput,
	GetRemainingCreditsInput,
	GetRemainingCreditsOutput,
	GetWeatherZipCodeInput,
	GetWeatherZipCodeOutput,
	IdentifyLanguageInput,
	IdentifyLanguageOutput,
	TranslateToAnyInput,
	TranslateToAnyOutput,
	TranslateToEnglishInput,
	TranslateToEnglishOutput,
} from './types';
import {
	ConvertCurrencyInputSchema,
	ConvertCurrencyOutputSchema,
	GetCurrencyRateInputSchema,
	GetCurrencyRateOutputSchema,
	GetEntityTypeInputSchema,
	GetEntityTypeOutputSchema,
	GetGenderInputSchema,
	GetGenderOutputSchema,
	GetGlobalLatencyInputSchema,
	GetGlobalLatencyOutputSchema,
	GetGlobalPageLoadInputSchema,
	GetGlobalPageLoadOutputSchema,
	GetGlobalTimeInputSchema,
	GetGlobalTimeOutputSchema,
	GetGlobalWeatherInputSchema,
	GetGlobalWeatherOutputSchema,
	GetNameOriginInputSchema,
	GetNameOriginOutputSchema,
	GetRemainingCreditsInputSchema,
	GetRemainingCreditsOutputSchema,
	GetWeatherZipCodeInputSchema,
	GetWeatherZipCodeOutputSchema,
	IdentifyLanguageInputSchema,
	IdentifyLanguageOutputSchema,
	TranslateToAnyInputSchema,
	TranslateToAnyOutputSchema,
	TranslateToEnglishInputSchema,
	TranslateToEnglishOutputSchema,
} from './types';

export const Utilities = {
	getEntityType: async (
		ctx: InterzoidContext,
		input: GetEntityTypeInput,
	): Promise<GetEntityTypeOutput> => {
		const validatedInput = GetEntityTypeInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetEntityTypeOutput>(
			'/getentitytype',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetEntityTypeOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getEntityType', {
			endpoint: '/getentitytype',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getGender: async (
		ctx: InterzoidContext,
		input: GetGenderInput,
	): Promise<GetGenderOutput> => {
		const validatedInput = GetGenderInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetGenderOutput>(
			'/getgender',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetGenderOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getGender', {
			endpoint: '/getgender',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getNameOrigin: async (
		ctx: InterzoidContext,
		input: GetNameOriginInput,
	): Promise<GetNameOriginOutput> => {
		const validatedInput = GetNameOriginInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetNameOriginOutput>(
			'/getnameorigin',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetNameOriginOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getNameOrigin', {
			endpoint: '/getnameorigin',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	identifyLanguage: async (
		ctx: InterzoidContext,
		input: IdentifyLanguageInput,
	): Promise<IdentifyLanguageOutput> => {
		const validatedInput = IdentifyLanguageInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<IdentifyLanguageOutput>(
			'/identifylanguage',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = IdentifyLanguageOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_identifyLanguage', {
			endpoint: '/identifylanguage',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	translateToEnglish: async (
		ctx: InterzoidContext,
		input: TranslateToEnglishInput,
	): Promise<TranslateToEnglishOutput> => {
		const validatedInput = TranslateToEnglishInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<TranslateToEnglishOutput>(
			'/translatetoenglish',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = TranslateToEnglishOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_translateToEnglish', {
			endpoint: '/translatetoenglish',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	translateToAny: async (
		ctx: InterzoidContext,
		input: TranslateToAnyInput,
	): Promise<TranslateToAnyOutput> => {
		const validatedInput = TranslateToAnyInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<TranslateToAnyOutput>(
			'/translatetoany',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = TranslateToAnyOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_translateToAny', {
			endpoint: '/translatetoany',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getGlobalLatency: async (
		ctx: InterzoidContext,
		input: GetGlobalLatencyInput,
	): Promise<GetGlobalLatencyOutput> => {
		const validatedInput = GetGlobalLatencyInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetGlobalLatencyOutput>(
			'/globallatency',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetGlobalLatencyOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getGlobalLatency', {
			endpoint: '/globallatency',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getGlobalPageLoad: async (
		ctx: InterzoidContext,
		input: GetGlobalPageLoadInput,
	): Promise<GetGlobalPageLoadOutput> => {
		const validatedInput = GetGlobalPageLoadInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetGlobalPageLoadOutput>(
			'/globalpageload',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetGlobalPageLoadOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getGlobalPageLoad', {
			endpoint: '/globalpageload',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getCurrencyRate: async (
		ctx: InterzoidContext,
		input: GetCurrencyRateInput,
	): Promise<GetCurrencyRateOutput> => {
		const validatedInput = GetCurrencyRateInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetCurrencyRateOutput>(
			'/getcurrencyrate',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetCurrencyRateOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getCurrencyRate', {
			endpoint: '/getcurrencyrate',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	convertCurrency: async (
		ctx: InterzoidContext,
		input: ConvertCurrencyInput,
	): Promise<ConvertCurrencyOutput> => {
		const validatedInput = ConvertCurrencyInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<ConvertCurrencyOutput>(
			'/convertcurrency',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = ConvertCurrencyOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_convertCurrency', {
			endpoint: '/convertcurrency',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getWeatherZipCode: async (
		ctx: InterzoidContext,
		input: GetWeatherZipCodeInput,
	): Promise<GetWeatherZipCodeOutput> => {
		const validatedInput = GetWeatherZipCodeInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetWeatherZipCodeOutput>(
			'/getweatherzipcode',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetWeatherZipCodeOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getWeatherZipCode', {
			endpoint: '/getweatherzipcode',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getGlobalWeather: async (
		ctx: InterzoidContext,
		input: GetGlobalWeatherInput,
	): Promise<GetGlobalWeatherOutput> => {
		const validatedInput = GetGlobalWeatherInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetGlobalWeatherOutput>(
			'/getglobalweather',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetGlobalWeatherOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getGlobalWeather', {
			endpoint: '/getglobalweather',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getGlobalTime: async (
		ctx: InterzoidContext,
		input: GetGlobalTimeInput,
	): Promise<GetGlobalTimeOutput> => {
		const validatedInput = GetGlobalTimeInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetGlobalTimeOutput>(
			'/getglobaltime',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetGlobalTimeOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getGlobalTime', {
			endpoint: '/getglobaltime',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getRemainingCredits: async (
		ctx: InterzoidContext,
		input: GetRemainingCreditsInput,
	): Promise<GetRemainingCreditsOutput> => {
		const validatedInput = GetRemainingCreditsInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetRemainingCreditsOutput>(
			'/getremainingcredits',
			ctx.key,
			{
				method: 'GET',
			},
		);
		const parsed = GetRemainingCreditsOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getRemainingCredits', {
			endpoint: '/getremainingcredits',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
};
