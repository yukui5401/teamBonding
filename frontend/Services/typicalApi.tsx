import axios from "axios";

export default class TypicalApi {
  static async getCatFact() {
    try {
      var factObj = await axios.get("https://catfact.ninja/fact");
      return factObj.data.fact;
    } catch {
      return null;
    }
  }
}
