# @corsair-dev/interzoid

Interzoid plugin for Corsair.

## Install

```bash
pnpm add @corsair-dev/interzoid
```

## Endpoints

| Operation | Operation ID | Risk | Description |
|-----------|--------------|------|-------------|
| `intelligence.getBuildingProfile` | `interzoid.api.intelligence.getBuildingProfile` | `destructive` | Retrieve commercial building intelligence, class, square footage, and tenants |
| `intelligence.getBusinessInfo` | `interzoid.api.intelligence.getBusinessInfo` | `destructive` | Retrieve comprehensive business intelligence and firmographic profile |
| `intelligence.getBusinessInfoDomain` | `interzoid.api.intelligence.getBusinessInfoDomain` | `destructive` | Resolve company name, ticker, or brand into primary internet domain |
| `intelligence.getBusinessInfoName` | `interzoid.api.intelligence.getBusinessInfoName` | `destructive` | Resolve domain or brand name into standard company name |
| `intelligence.getBuyingSignals` | `interzoid.api.intelligence.getBuyingSignals` | `destructive` | Retrieve real-time B2B purchase intent signals and expansion indicators |
| `intelligence.getCompanyVerification` | `interzoid.api.intelligence.getCompanyVerification` | `destructive` | Verify the legitimacy, existence, and reputability of a company |
| `intelligence.getCompetitorAnalysis` | `interzoid.api.intelligence.getCompetitorAnalysis` | `destructive` | Retrieve structured competitive intelligence, advantages, and market dynamics |
| `intelligence.getCustomData` | `interzoid.api.intelligence.getCustomData` | `destructive` | Query custom AI-powered dataset attributes specified by topic and requested columns |
| `intelligence.getCustomsDutyRates` | `interzoid.api.intelligence.getCustomsDutyRates` | `destructive` | Retrieve international customs duty rates based on origin, destination, and HS code |
| `intelligence.getEsgProfile` | `interzoid.api.intelligence.getEsgProfile` | `destructive` | Retrieve ESG, carbon scope emissions, and corporate sustainability intelligence |
| `intelligence.getEuVatRates` | `interzoid.api.intelligence.getEuVatRates` | `destructive` | Retrieve European VAT tax rates, standard/reduced categories, and thresholds |
| `intelligence.getExecutiveProfile` | `interzoid.api.intelligence.getExecutiveProfile` | `destructive` | Retrieve executive profile details based on company name and title |
| `intelligence.getFacilitiesProfile` | `interzoid.api.intelligence.getFacilitiesProfile` | `destructive` | Retrieve corporate facilities and real estate portfolio intelligence |
| `intelligence.getGovContracts` | `interzoid.api.intelligence.getGovContracts` | `destructive` | Retrieve US federal government contracting intelligence and major awards |
| `intelligence.getIndustryCodes` | `interzoid.api.intelligence.getIndustryCodes` | `destructive` | Retrieve NAICS and SIC industry classification codes for a company |
| `intelligence.getIrsPerDiemRates` | `interzoid.api.intelligence.getIrsPerDiemRates` | `destructive` | Retrieve official IRS per diem reimbursement rates for travel |
| `intelligence.getMuniIssuerProfile` | `interzoid.api.intelligence.getMuniIssuerProfile` | `destructive` | Retrieve municipal bond issuer profiles and credit diligence intelligence |
| `intelligence.getNearestCoffeeShops` | `interzoid.api.intelligence.getNearestCoffeeShops` | `destructive` | Find nearest coffee shops and proximity data for a location |
| `intelligence.getParentCompanyInfo` | `interzoid.api.intelligence.getParentCompanyInfo` | `destructive` | Retrieve corporate ownership and ultimate parent company intelligence |
| `intelligence.getPrivateCompanyDealIntel` | `interzoid.api.intelligence.getPrivateCompanyDealIntel` | `destructive` | Retrieve venture capital and private equity deal intelligence for private firms |
| `intelligence.getProductRecallInfo` | `interzoid.api.intelligence.getProductRecallInfo` | `destructive` | Retrieve consumer safety recall intelligence for products and brands |
| `intelligence.getPropertyHistory` | `interzoid.api.intelligence.getPropertyHistory` | `destructive` | Retrieve historical real estate property sales, deeds, and mortgages |
| `intelligence.getSalesUseTaxRates` | `interzoid.api.intelligence.getSalesUseTaxRates` | `destructive` | Retrieve US sales and use tax rates by address, zip code, or city |
| `intelligence.getSicCodes` | `interzoid.api.intelligence.getSicCodes` | `destructive` | Retrieve primary and secondary SIC codes with SEC filing provenance |
| `intelligence.getStockInfo` | `interzoid.api.intelligence.getStockInfo` | `destructive` | Retrieve financial stock metrics, market cap, and analyst consensus for a ticker |
| `intelligence.getTechStack` | `interzoid.api.intelligence.getTechStack` | `destructive` | Retrieve technology stack and web infrastructure detected for a domain |
| `intelligence.getUniversityInfo` | `interzoid.api.intelligence.getUniversityInfo` | `destructive` | Retrieve comprehensive higher education profile and statistics for a university |
| `intelligence.getUserXHandle` | `interzoid.api.intelligence.getUserXHandle` | `destructive` | Lookup X/Twitter handle for a person, company, or team |
| `intelligence.getXLast3` | `interzoid.api.intelligence.getXLast3` | `destructive` | Retrieve the latest three posts from an X/Twitter account |
| `intelligence.getXUserProfile` | `interzoid.api.intelligence.getXUserProfile` | `destructive` | Retrieve public profile statistics and bio for an X/Twitter handle |
| `matching.getAddressAndFullNameMatch` | `interzoid.api.matching.getAddressAndFullNameMatch` | `destructive` | Generate a composite similarity key based on both address and full name |
| `matching.getAddressMatch` | `interzoid.api.matching.getAddressMatch` | `destructive` | Generate a standard similarity key for street address matching and deduplication |
| `matching.getAddressMatchAdvanced` | `interzoid.api.matching.getAddressMatchAdvanced` | `destructive` | Generate an AI-powered similarity key for a street address to identify duplicates |
| `matching.getCityMatch` | `interzoid.api.matching.getCityMatch` | `destructive` | Generate a similarity key for city name matching and deduplication |
| `matching.getCompanyAndAddressMatch` | `interzoid.api.matching.getCompanyAndAddressMatch` | `destructive` | Generate a composite similarity key based on both company name and street address |
| `matching.getCompanyAndFullNameMatch` | `interzoid.api.matching.getCompanyAndFullNameMatch` | `destructive` | Generate a composite similarity key based on both company name and individual full name |
| `matching.getCompanyMatch` | `interzoid.api.matching.getCompanyMatch` | `destructive` | Generate a standard similarity key for company name matching and deduplication |
| `matching.getCompanyMatchAdvanced` | `interzoid.api.matching.getCompanyMatchAdvanced` | `destructive` | Generate an AI-powered similarity key for a company or organization name to identify duplicates |
| `matching.getCountryMatch` | `interzoid.api.matching.getCountryMatch` | `destructive` | Generate a similarity key for country name matching and deduplication |
| `matching.getFullNameMatch` | `interzoid.api.matching.getFullNameMatch` | `destructive` | Generate an AI-powered similarity key for an individual full name to identify duplicates |
| `matching.getFullNameMatchScore` | `interzoid.api.matching.getFullNameMatchScore` | `destructive` | Calculate a match similarity score between two individual names (0-100) |
| `matching.getFullNameParsedMatch` | `interzoid.api.matching.getFullNameParsedMatch` | `destructive` | Generate a similarity key from separate first and last names |
| `matching.getGlobalAddressMatch` | `interzoid.api.matching.getGlobalAddressMatch` | `destructive` | Generate an AI-powered similarity key for global addresses worldwide |
| `matching.getOrgMatchScore` | `interzoid.api.matching.getOrgMatchScore` | `destructive` | Calculate a match similarity score between two organization names (0-100) |
| `matching.getProductMatch` | `interzoid.api.matching.getProductMatch` | `destructive` | Generate an AI-powered similarity key for product names to detect duplicate items |
| `standardization.getCityStandard` | `interzoid.api.standardization.getCityStandard` | `destructive` | Standardize a city name to its canonical form |
| `standardization.getCountryInfo` | `interzoid.api.standardization.getCountryInfo` | `destructive` | Get standardized country metadata including ISO codes, currency, and calling code |
| `standardization.getCountryStandard` | `interzoid.api.standardization.getCountryStandard` | `destructive` | Standardize a country name or alias to canonical form |
| `standardization.getOfficialName` | `interzoid.api.standardization.getOfficialName` | `destructive` | Resolve commercial or colloquial brand name into official legal entity registration |
| `standardization.getOrgStandard` | `interzoid.api.standardization.getOrgStandard` | `destructive` | Standardize an organization name to its canonical English form |
| `standardization.getStateAbbreviation` | `interzoid.api.standardization.getStateAbbreviation` | `destructive` | Standardize a US state or Canadian province name into its two-letter abbreviation |
| `utilities.convertCurrency` | `interzoid.api.utilities.convertCurrency` | `destructive` | Convert an amount from one foreign currency into another |
| `utilities.getCurrencyRate` | `interzoid.api.utilities.getCurrencyRate` | `destructive` | Retrieve live USD foreign exchange rate for a currency symbol |
| `utilities.getEntityType` | `interzoid.api.utilities.getEntityType` | `destructive` | Classify text into entity type (Location, Organization, Individual, or Text) |
| `utilities.getGender` | `interzoid.api.utilities.getGender` | `destructive` | Infer the likely gender from an individual first name |
| `utilities.getGlobalLatency` | `interzoid.api.utilities.getGlobalLatency` | `destructive` | Measure website or API URL latency from a specified worldwide location |
| `utilities.getGlobalPageLoad` | `interzoid.api.utilities.getGlobalPageLoad` | `destructive` | Measure browser page load performance from a specified global geography |
| `utilities.getGlobalTime` | `interzoid.api.utilities.getGlobalTime` | `destructive` | Retrieve current date and time for a global city or locale |
| `utilities.getGlobalWeather` | `interzoid.api.utilities.getGlobalWeather` | `destructive` | Retrieve current weather conditions for worldwide city locations |
| `utilities.getNameOrigin` | `interzoid.api.utilities.getNameOrigin` | `destructive` | Infer the likely geographic country or region of origin from a personal name |
| `utilities.getRemainingCredits` | `interzoid.api.utilities.getRemainingCredits` | `destructive` | Retrieve the remaining API credits balance for the active API license key |
| `utilities.getWeatherZipCode` | `interzoid.api.utilities.getWeatherZipCode` | `destructive` | Retrieve current live weather conditions for a US ZIP code |
| `utilities.identifyLanguage` | `interzoid.api.utilities.identifyLanguage` | `destructive` | Detect the natural language of a text string |
| `utilities.translateToAny` | `interzoid.api.utilities.translateToAny` | `destructive` | Translate text from any language into a specified target language |
| `utilities.translateToEnglish` | `interzoid.api.utilities.translateToEnglish` | `destructive` | Translate non-English text to English |
| `validation.addressParse` | `interzoid.api.validation.addressParse` | `destructive` | Parse a free-form address string into structured postal components |
| `validation.getAreaCode` | `interzoid.api.validation.getAreaCode` | `destructive` | Retrieve geographic locale and city for a telephone area code |
| `validation.getAreaCodeFromNumber` | `interzoid.api.validation.getAreaCodeFromNumber` | `destructive` | Extract area code and locale information from a telephone number |
| `validation.getEmailDomainType` | `interzoid.api.validation.getEmailDomainType` | `destructive` | Classify email domain into Business, Government, Education, Generic, or Disposable |
| `validation.getEmailInfo` | `interzoid.api.validation.getEmailInfo` | `destructive` | Validate and enrich an email address with deliverability and demographic details |
| `validation.getEmailTrustScore` | `interzoid.api.validation.getEmailTrustScore` | `destructive` | Compute a trust and quality score for an email address |
| `validation.getGlobalNumberInfo` | `interzoid.api.validation.getGlobalNumberInfo` | `destructive` | Retrieve demographic and geographic information for an international phone number |
| `validation.getIpProfile` | `interzoid.api.validation.getIpProfile` | `destructive` | Retrieve IP intelligence, geolocation, ASN, and reputation profile |
| `validation.getPhoneProfile` | `interzoid.api.validation.getPhoneProfile` | `destructive` | Retrieve phone number intelligence, carrier, time zone, and risk assessment |
| `validation.getZipCodeInfo` | `interzoid.api.validation.getZipCodeInfo` | `destructive` | Retrieve detailed demographics, city, state, and geographic data for a US ZIP code |

## Auth

Auth: API key. Corsair prompts your tenant for credentials on first use.

## Credit usage

Interzoid's pricing documentation says standard API calls consume one credit; premium APIs and selected AI models consume multiple credits. Every operation in this package is marked `destructive`, so readonly/cautious execution requires approval before a call can spend credits. Check the provider's [API pricing](https://www.interzoid.com/api-pricing) and [AI model credit usage](https://docs.interzoid.com/entries/interzoid-ai-models) for current per-operation or model-specific costs.

## Webhooks

No webhooks.

## Out-of-Scope Operations

- **Batch Processing (`/enrich`)**: Hosted at `https://enrich-api.interzoid.com` for large multi-record/CSV file transformations, which operates outside Corsair's synchronous single-record request/response model.
- **Key Display (`INTERZOID_GET_LICENSE`)**: Catalog helper operation; excluded because credentials must not be reflected through endpoints (R6 security rule).

## Reference

- Official Interzoid Documentation: https://www.interzoid.com/services/
- Interzoid API Pricing: https://www.interzoid.com/api-pricing
- AI Model Credit Usage: https://docs.interzoid.com/entries/interzoid-ai-models
- Corsair Plugin Documentation: https://docs.corsair.dev/plugins/interzoid

## License

Apache-2.0
