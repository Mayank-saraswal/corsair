import { logEventFromContext } from 'corsair/core';
import { makeInterzoidRequest } from '../client';
import type { InterzoidContext } from '../index';
import type {
	GetBuildingProfileInput,
	GetBuildingProfileOutput,
	GetBusinessInfoDomainInput,
	GetBusinessInfoDomainOutput,
	GetBusinessInfoInput,
	GetBusinessInfoNameInput,
	GetBusinessInfoNameOutput,
	GetBusinessInfoOutput,
	GetBuyingSignalsInput,
	GetBuyingSignalsOutput,
	GetCompanyVerificationInput,
	GetCompanyVerificationOutput,
	GetCompetitorAnalysisInput,
	GetCompetitorAnalysisOutput,
	GetCustomDataInput,
	GetCustomDataOutput,
	GetCustomsDutyRatesInput,
	GetCustomsDutyRatesOutput,
	GetEsgProfileInput,
	GetEsgProfileOutput,
	GetEuVatRatesInput,
	GetEuVatRatesOutput,
	GetExecutiveProfileInput,
	GetExecutiveProfileOutput,
	GetFacilitiesProfileInput,
	GetFacilitiesProfileOutput,
	GetGovContractsInput,
	GetGovContractsOutput,
	GetIndustryCodesInput,
	GetIndustryCodesOutput,
	GetIrsPerDiemRatesInput,
	GetIrsPerDiemRatesOutput,
	GetMuniIssuerProfileInput,
	GetMuniIssuerProfileOutput,
	GetNearestCoffeeShopsInput,
	GetNearestCoffeeShopsOutput,
	GetParentCompanyInfoInput,
	GetParentCompanyInfoOutput,
	GetPrivateCompanyDealIntelInput,
	GetPrivateCompanyDealIntelOutput,
	GetProductRecallInfoInput,
	GetProductRecallInfoOutput,
	GetPropertyHistoryInput,
	GetPropertyHistoryOutput,
	GetSalesUseTaxRatesInput,
	GetSalesUseTaxRatesOutput,
	GetSicCodesInput,
	GetSicCodesOutput,
	GetStockInfoInput,
	GetStockInfoOutput,
	GetTechStackInput,
	GetTechStackOutput,
	GetUniversityInfoInput,
	GetUniversityInfoOutput,
	GetUserXHandleInput,
	GetUserXHandleOutput,
	GetXLast3Input,
	GetXLast3Output,
	GetXUserProfileInput,
	GetXUserProfileOutput,
} from './types';
import {
	GetBuildingProfileInputSchema,
	GetBuildingProfileOutputSchema,
	GetBusinessInfoDomainInputSchema,
	GetBusinessInfoDomainOutputSchema,
	GetBusinessInfoInputSchema,
	GetBusinessInfoNameInputSchema,
	GetBusinessInfoNameOutputSchema,
	GetBusinessInfoOutputSchema,
	GetBuyingSignalsInputSchema,
	GetBuyingSignalsOutputSchema,
	GetCompanyVerificationInputSchema,
	GetCompanyVerificationOutputSchema,
	GetCompetitorAnalysisInputSchema,
	GetCompetitorAnalysisOutputSchema,
	GetCustomDataInputSchema,
	GetCustomDataOutputSchema,
	GetCustomsDutyRatesInputSchema,
	GetCustomsDutyRatesOutputSchema,
	GetEsgProfileInputSchema,
	GetEsgProfileOutputSchema,
	GetEuVatRatesInputSchema,
	GetEuVatRatesOutputSchema,
	GetExecutiveProfileInputSchema,
	GetExecutiveProfileOutputSchema,
	GetFacilitiesProfileInputSchema,
	GetFacilitiesProfileOutputSchema,
	GetGovContractsInputSchema,
	GetGovContractsOutputSchema,
	GetIndustryCodesInputSchema,
	GetIndustryCodesOutputSchema,
	GetIrsPerDiemRatesInputSchema,
	GetIrsPerDiemRatesOutputSchema,
	GetMuniIssuerProfileInputSchema,
	GetMuniIssuerProfileOutputSchema,
	GetNearestCoffeeShopsInputSchema,
	GetNearestCoffeeShopsOutputSchema,
	GetParentCompanyInfoInputSchema,
	GetParentCompanyInfoOutputSchema,
	GetPrivateCompanyDealIntelInputSchema,
	GetPrivateCompanyDealIntelOutputSchema,
	GetProductRecallInfoInputSchema,
	GetProductRecallInfoOutputSchema,
	GetPropertyHistoryInputSchema,
	GetPropertyHistoryOutputSchema,
	GetSalesUseTaxRatesInputSchema,
	GetSalesUseTaxRatesOutputSchema,
	GetSicCodesInputSchema,
	GetSicCodesOutputSchema,
	GetStockInfoInputSchema,
	GetStockInfoOutputSchema,
	GetTechStackInputSchema,
	GetTechStackOutputSchema,
	GetUniversityInfoInputSchema,
	GetUniversityInfoOutputSchema,
	GetUserXHandleInputSchema,
	GetUserXHandleOutputSchema,
	GetXLast3InputSchema,
	GetXLast3OutputSchema,
	GetXUserProfileInputSchema,
	GetXUserProfileOutputSchema,
} from './types';

export const Intelligence = {
	getBusinessInfo: async (
		ctx: InterzoidContext,
		input: GetBusinessInfoInput,
	): Promise<GetBusinessInfoOutput> => {
		const validatedInput = GetBusinessInfoInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetBusinessInfoOutput>(
			'/getbusinessinfo',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetBusinessInfoOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getBusinessInfo', {
			endpoint: '/getbusinessinfo',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getParentCompanyInfo: async (
		ctx: InterzoidContext,
		input: GetParentCompanyInfoInput,
	): Promise<GetParentCompanyInfoOutput> => {
		const validatedInput = GetParentCompanyInfoInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetParentCompanyInfoOutput>(
			'/getparentcompanyinfo',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetParentCompanyInfoOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getParentCompanyInfo', {
			endpoint: '/getparentcompanyinfo',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getExecutiveProfile: async (
		ctx: InterzoidContext,
		input: GetExecutiveProfileInput,
	): Promise<GetExecutiveProfileOutput> => {
		const validatedInput = GetExecutiveProfileInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetExecutiveProfileOutput>(
			'/getexecutiveprofile',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetExecutiveProfileOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getExecutiveProfile', {
			endpoint: '/getexecutiveprofile',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getBusinessInfoDomain: async (
		ctx: InterzoidContext,
		input: GetBusinessInfoDomainInput,
	): Promise<GetBusinessInfoDomainOutput> => {
		const validatedInput = GetBusinessInfoDomainInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetBusinessInfoDomainOutput>(
			'/getbusinessinfodomain',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetBusinessInfoDomainOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getBusinessInfoDomain', {
			endpoint: '/getbusinessinfodomain',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getBusinessInfoName: async (
		ctx: InterzoidContext,
		input: GetBusinessInfoNameInput,
	): Promise<GetBusinessInfoNameOutput> => {
		const validatedInput = GetBusinessInfoNameInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetBusinessInfoNameOutput>(
			'/getbusinessinfoname',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetBusinessInfoNameOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getBusinessInfoName', {
			endpoint: '/getbusinessinfoname',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getCompanyVerification: async (
		ctx: InterzoidContext,
		input: GetCompanyVerificationInput,
	): Promise<GetCompanyVerificationOutput> => {
		const validatedInput = GetCompanyVerificationInputSchema.parse(input);
		const rawResponse =
			await makeInterzoidRequest<GetCompanyVerificationOutput>(
				'/getcompanyverification',
				ctx.key,
				{
					method: 'GET',
					query: validatedInput as Record<
						string,
						string | number | boolean | undefined
					>,
				},
			);
		const parsed = GetCompanyVerificationOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getCompanyVerification', {
			endpoint: '/getcompanyverification',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getStockInfo: async (
		ctx: InterzoidContext,
		input: GetStockInfoInput,
	): Promise<GetStockInfoOutput> => {
		const validatedInput = GetStockInfoInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetStockInfoOutput>(
			'/getstockinfo',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetStockInfoOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getStockInfo', {
			endpoint: '/getstockinfo',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getIndustryCodes: async (
		ctx: InterzoidContext,
		input: GetIndustryCodesInput,
	): Promise<GetIndustryCodesOutput> => {
		const validatedInput = GetIndustryCodesInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetIndustryCodesOutput>(
			'/getindustrycodes',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetIndustryCodesOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getIndustryCodes', {
			endpoint: '/getindustrycodes',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getSicCodes: async (
		ctx: InterzoidContext,
		input: GetSicCodesInput,
	): Promise<GetSicCodesOutput> => {
		const validatedInput = GetSicCodesInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetSicCodesOutput>(
			'/getsiccodes',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetSicCodesOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getSicCodes', {
			endpoint: '/getsiccodes',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getUniversityInfo: async (
		ctx: InterzoidContext,
		input: GetUniversityInfoInput,
	): Promise<GetUniversityInfoOutput> => {
		const validatedInput = GetUniversityInfoInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetUniversityInfoOutput>(
			'/getuniversityinfo',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetUniversityInfoOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getUniversityInfo', {
			endpoint: '/getuniversityinfo',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getProductRecallInfo: async (
		ctx: InterzoidContext,
		input: GetProductRecallInfoInput,
	): Promise<GetProductRecallInfoOutput> => {
		const validatedInput = GetProductRecallInfoInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetProductRecallInfoOutput>(
			'/getproductrecallinfo',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetProductRecallInfoOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getProductRecallInfo', {
			endpoint: '/getproductrecallinfo',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getTechStack: async (
		ctx: InterzoidContext,
		input: GetTechStackInput,
	): Promise<GetTechStackOutput> => {
		const validatedInput = GetTechStackInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetTechStackOutput>(
			'/gettechstack',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetTechStackOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getTechStack', {
			endpoint: '/gettechstack',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getCompetitorAnalysis: async (
		ctx: InterzoidContext,
		input: GetCompetitorAnalysisInput,
	): Promise<GetCompetitorAnalysisOutput> => {
		const validatedInput = GetCompetitorAnalysisInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetCompetitorAnalysisOutput>(
			'/getcompetitoranalysis',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetCompetitorAnalysisOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getCompetitorAnalysis', {
			endpoint: '/getcompetitoranalysis',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getBuyingSignals: async (
		ctx: InterzoidContext,
		input: GetBuyingSignalsInput,
	): Promise<GetBuyingSignalsOutput> => {
		const validatedInput = GetBuyingSignalsInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetBuyingSignalsOutput>(
			'/getbuyingsignals',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetBuyingSignalsOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getBuyingSignals', {
			endpoint: '/getbuyingsignals',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getPrivateCompanyDealIntel: async (
		ctx: InterzoidContext,
		input: GetPrivateCompanyDealIntelInput,
	): Promise<GetPrivateCompanyDealIntelOutput> => {
		const validatedInput = GetPrivateCompanyDealIntelInputSchema.parse(input);
		const rawResponse =
			await makeInterzoidRequest<GetPrivateCompanyDealIntelOutput>(
				'/getprivatecompanydealintel',
				ctx.key,
				{
					method: 'GET',
					query: validatedInput as Record<
						string,
						string | number | boolean | undefined
					>,
				},
			);
		const parsed = GetPrivateCompanyDealIntelOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getPrivateCompanyDealIntel', {
			endpoint: '/getprivatecompanydealintel',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getNearestCoffeeShops: async (
		ctx: InterzoidContext,
		input: GetNearestCoffeeShopsInput,
	): Promise<GetNearestCoffeeShopsOutput> => {
		const validatedInput = GetNearestCoffeeShopsInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetNearestCoffeeShopsOutput>(
			'/getnearestcoffeeshops',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetNearestCoffeeShopsOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getNearestCoffeeShops', {
			endpoint: '/getnearestcoffeeshops',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getUserXHandle: async (
		ctx: InterzoidContext,
		input: GetUserXHandleInput,
	): Promise<GetUserXHandleOutput> => {
		const validatedInput = GetUserXHandleInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetUserXHandleOutput>(
			'/getuserxhandle',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetUserXHandleOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getUserXHandle', {
			endpoint: '/getuserxhandle',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getXUserProfile: async (
		ctx: InterzoidContext,
		input: GetXUserProfileInput,
	): Promise<GetXUserProfileOutput> => {
		const validatedInput = GetXUserProfileInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetXUserProfileOutput>(
			'/getxuserprofile',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetXUserProfileOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getXUserProfile', {
			endpoint: '/getxuserprofile',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getXLast3: async (
		ctx: InterzoidContext,
		input: GetXLast3Input,
	): Promise<GetXLast3Output> => {
		const validatedInput = GetXLast3InputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetXLast3Output>(
			'/getxlast3',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetXLast3OutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getXLast3', {
			endpoint: '/getxlast3',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getEsgProfile: async (
		ctx: InterzoidContext,
		input: GetEsgProfileInput,
	): Promise<GetEsgProfileOutput> => {
		const validatedInput = GetEsgProfileInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetEsgProfileOutput>(
			'/getesgprofile',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetEsgProfileOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getEsgProfile', {
			endpoint: '/getesgprofile',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getGovContracts: async (
		ctx: InterzoidContext,
		input: GetGovContractsInput,
	): Promise<GetGovContractsOutput> => {
		const validatedInput = GetGovContractsInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetGovContractsOutput>(
			'/getgovcontracts',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetGovContractsOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getGovContracts', {
			endpoint: '/getgovcontracts',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getFacilitiesProfile: async (
		ctx: InterzoidContext,
		input: GetFacilitiesProfileInput,
	): Promise<GetFacilitiesProfileOutput> => {
		const validatedInput = GetFacilitiesProfileInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetFacilitiesProfileOutput>(
			'/getfacilitiesprofile',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetFacilitiesProfileOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getFacilitiesProfile', {
			endpoint: '/getfacilitiesprofile',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getBuildingProfile: async (
		ctx: InterzoidContext,
		input: GetBuildingProfileInput,
	): Promise<GetBuildingProfileOutput> => {
		const validatedInput = GetBuildingProfileInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetBuildingProfileOutput>(
			'/getbuildingprofile',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetBuildingProfileOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getBuildingProfile', {
			endpoint: '/getbuildingprofile',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getPropertyHistory: async (
		ctx: InterzoidContext,
		input: GetPropertyHistoryInput,
	): Promise<GetPropertyHistoryOutput> => {
		const validatedInput = GetPropertyHistoryInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetPropertyHistoryOutput>(
			'/getpropertyhistory',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetPropertyHistoryOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getPropertyHistory', {
			endpoint: '/getpropertyhistory',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getSalesUseTaxRates: async (
		ctx: InterzoidContext,
		input: GetSalesUseTaxRatesInput,
	): Promise<GetSalesUseTaxRatesOutput> => {
		const validatedInput = GetSalesUseTaxRatesInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetSalesUseTaxRatesOutput>(
			'/getsalesusetaxrates',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetSalesUseTaxRatesOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getSalesUseTaxRates', {
			endpoint: '/getsalesusetaxrates',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getIrsPerDiemRates: async (
		ctx: InterzoidContext,
		input: GetIrsPerDiemRatesInput,
	): Promise<GetIrsPerDiemRatesOutput> => {
		const validatedInput = GetIrsPerDiemRatesInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetIrsPerDiemRatesOutput>(
			'/getirsperdiemrates',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetIrsPerDiemRatesOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getIrsPerDiemRates', {
			endpoint: '/getirsperdiemrates',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getEuVatRates: async (
		ctx: InterzoidContext,
		input: GetEuVatRatesInput,
	): Promise<GetEuVatRatesOutput> => {
		const validatedInput = GetEuVatRatesInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetEuVatRatesOutput>(
			'/geteuvatrates',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetEuVatRatesOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getEuVatRates', {
			endpoint: '/geteuvatrates',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getCustomsDutyRates: async (
		ctx: InterzoidContext,
		input: GetCustomsDutyRatesInput,
	): Promise<GetCustomsDutyRatesOutput> => {
		const validatedInput = GetCustomsDutyRatesInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetCustomsDutyRatesOutput>(
			'/getcustomsdutyrates',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetCustomsDutyRatesOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getCustomsDutyRates', {
			endpoint: '/getcustomsdutyrates',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getMuniIssuerProfile: async (
		ctx: InterzoidContext,
		input: GetMuniIssuerProfileInput,
	): Promise<GetMuniIssuerProfileOutput> => {
		const validatedInput = GetMuniIssuerProfileInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetMuniIssuerProfileOutput>(
			'/getmuniissuerprofile',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetMuniIssuerProfileOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getMuniIssuerProfile', {
			endpoint: '/getmuniissuerprofile',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
	getCustomData: async (
		ctx: InterzoidContext,
		input: GetCustomDataInput,
	): Promise<GetCustomDataOutput> => {
		const validatedInput = GetCustomDataInputSchema.parse(input);
		const rawResponse = await makeInterzoidRequest<GetCustomDataOutput>(
			'/getcustom',
			ctx.key,
			{
				method: 'GET',
				query: validatedInput as Record<
					string,
					string | number | boolean | undefined
				>,
			},
		);
		const parsed = GetCustomDataOutputSchema.parse(rawResponse);
		logEventFromContext(ctx, 'interzoid_getCustomData', {
			endpoint: '/getcustom',
			status: (parsed as { Code?: string }).Code ?? 'Success',
		});
		return parsed;
	},
};
