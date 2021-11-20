export default class Narrativa {
  static #BASE_URL = 'https://api.covid19tracking.narrativa.com/api/';

  static getSingleDayInfo = async (date) => {
    const url = `${this.#BASE_URL}${date}`;
    const response = await fetch(url);
    return response.json();
  };
}
