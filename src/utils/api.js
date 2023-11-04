/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export const fetchDataFromAPI = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params : {...params , swf:true},
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
 