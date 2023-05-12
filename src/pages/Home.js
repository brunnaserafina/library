import { useEffect, useState } from "react";
import styled from "styled-components";
import books from "../dataBooks/Books";
import Header from "../components/Header";
import { Book } from "../components/Book";

export default function Home() {
  const [booksAvailable, setBooksAvailable] = useState([]);
  const [booksUnvailable, setBooksUnavailable] = useState([]);
  const [booksSearch, setBooksSearch] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getAllBooks() {
      if (search === "") {
        const available = getBooksByStatusAndCategory("disponível", category);
        setBooksAvailable(available);

        const unavailable = getBooksByStatusAndCategory(
          "indisponível",
          category
        );
        setBooksUnavailable(unavailable);
      } else {
        const searchResults = getBooksBySearch(search);
        setBooksSearch(searchResults);
      }
    }

    getAllBooks();
  }, [category, search]);

  return (
    <>
      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <Books>
        {search !== "" && (
          <>
            <h1>Resultado da busca</h1>
            <div>
              {booksSearch?.map((book, index) => (
                <Book key={index} book={book} />
              ))}
            </div>
          </>
        )}

        {booksAvailable.length > 0 && search === "" && (
          <>
            <h1>Disponíveis</h1>
            <div>
              {booksAvailable.map((book, index) => (
                <Book key={index} book={book} />
              ))}
            </div>
          </>
        )}

        {booksUnvailable.length > 0 && search === "" && (
          <>
            <h1>Reservados</h1>
            <div>
              {booksUnvailable.map((book, index) => (
                <Book key={index} book={book} isQueue />
              ))}
            </div>
          </>
        )}
      </Books>
    </>
  );
}

function getBooksByStatusAndCategory(status, category) {
  const booksFilteredByStatus = books.filter((book) => book.status === status);

  if (category !== "") {
    return booksFilteredByStatus.filter((book) => book.category === category);
  }

  return booksFilteredByStatus;
}

function getBooksBySearch(search) {
  const searchTerm = search.toLowerCase();

  return books.filter((book) => {
    const bookTitle = book.title.toLowerCase();
    const bookAuthor = book.author.toLowerCase();

    return bookTitle.includes(searchTerm) || bookAuthor.includes(searchTerm);
  });
}

const Books = styled.div`
  width: 100vw;
  padding: 0 15vw;
  margin-bottom: 5vw;

  h1 {
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 700;
    color: var(--dark-green);
    margin-top: 5vh;
  }

  h1:nth-of-type(2) {
    color: var(--red);
  }

  h2 {
    font-weight: 700;
    height: 50px;
    display: flex;
    align-items: center;
  }

  img {
    width: 135px;
    height: 205px;
    object-fit: cover;
    margin: 20px 0;
    border: 1px solid var(--dark-green);
  }

  div {
    display: flex;
    overflow-x: auto;
  }

  div::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  div::-webkit-scrollbar-track {
    background-color: var(--gray);
  }

  div::-webkit-scrollbar-thumb {
    background-color: var(--dark-green);
    border-radius: 8px;
    cursor: pointer;
  }

  span {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    max-width: 135px;
    text-align: center;
    margin-right: 50px;
  }

  p {
    margin: 10px 0;
    height: 30px;
  }

  @media (max-width: 768px) {
    padding: 0 6vw;
  }
`;
