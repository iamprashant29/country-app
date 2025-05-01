export class ApiConstants {
  static BASE_URL = 'https://restcountries.com/v3.1';

  static constants  = {
    GET_ALL_COUNTRIES: `${ApiConstants.BASE_URL}/all`,
    SEARCH_BY_COUNTRY_NAME: `${ApiConstants.BASE_URL}/name`,
    FILTER_BY_REGION: `${ApiConstants.BASE_URL}/region`,
    FILTER_BY_CODE: `${ApiConstants.BASE_URL}/alpha`
  };
}
