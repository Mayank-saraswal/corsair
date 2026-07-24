import type { GoogleMapsEndpoints } from '../index';
import { complete, req } from './helpers';

export const geolocate: GoogleMapsEndpoints['geolocationGeolocate'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/geolocate', {
		method: 'POST',
		host: 'geolocation',
		legacyKeyQuery: true,
		body: {
			homeMobileCountryCode: input.homeMobileCountryCode,
			homeMobileNetworkCode: input.homeMobileNetworkCode,
			radioType: input.radioType,
			carrier: input.carrier,
			considerIp: input.considerIp,
			cellTowers: input.cellTowers,
			wifiAccessPoints: input.wifiAccessPoints,
		},
	});
	await complete(ctx, 'googlemaps.geolocation.geolocate', {
		hasWifi: Boolean(input.wifiAccessPoints?.length),
		hasCells: Boolean(input.cellTowers?.length),
	});
	return response;
};
