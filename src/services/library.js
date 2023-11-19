import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getBooks() {
  const promise = axios.get(`${BASE_URL}/books`);
  return promise;
}

function getCategories() {
  const promise = axios.get(`${BASE_URL}/categories`);
  return promise;
}

function putStatusBook(id) {
  const promise = axios.put(`${BASE_URL}/books/${id}`);
  return promise;
}

function deleteBook(id) {
  const promise = axios.delete(`${BASE_URL}/books/${id}`);
  return promise;
}

function postBook(body) {
  const promise = axios.post(`${BASE_URL}/books`, body);
  return promise;
}

export { getBooks, getCategories, putStatusBook, deleteBook, postBook };
