import axios from "axios";

export const API_URL =
  "https://crudcrud.com/api/SEU_ENDPOINT/livros";

export const api = axios.create({
  baseURL: API_URL,
});
