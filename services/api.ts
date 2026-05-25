import axios from "axios";

export const api = axios.create({
  baseURL: "https://crudcrud.com/api/SUA_URL/books",
});
