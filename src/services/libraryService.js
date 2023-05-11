import axios from "axios";

const BASE_URL = "http://localhost:5000/books";

function getBooks() {
  const promise = axios.get(BASE_URL);
  return promise;
}

export { getBooks };
