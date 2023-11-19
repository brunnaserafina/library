import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { getBooks } from "../services/library";
import Book from "../components/Book";
import { Link } from "react-router-dom";

export default function Home({ render, setRender }) {
  const [booksAvailable, setBooksAvailable] = useState([]);
  const [booksUnvailable, setBooksUnavailable] = useState([]);
  const [booksSearch, setBooksSearch] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [isAdminLogged, setIsAdminLogged] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  useEffect(() => {
    async function getAllBooks() {
      if (search === "") {
        const books = (await getBooks()).data;

        const available = getBooksByStatusAndCategory(books, true, category);
        setBooksAvailable(available);

        const unavailable = getBooksByStatusAndCategory(books, false, category);
        setBooksUnavailable(unavailable);
      } else {
        const searchResults = await getBooksBySearch(search);
        setBooksSearch(searchResults);
      }
    }

    async function getBooksBySearch(search) {
      const searchTerm = search.toLowerCase();

      const books = (await getBooks()).data;

      return books.filter((livro) => {
        const bookTitle = livro.titulo.toLowerCase();
        const bookAuthor = livro.autor.toLowerCase();
        return (
          bookTitle.includes(searchTerm) || bookAuthor.includes(searchTerm)
        );
      });
    }

    getAllBooks();
  }, [category, search, render, setRender]);

  return (
    <>
      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <Books>
        {isAdminLogged && (
          <Link to="/cadastrar-livro" target="_blank">
            <ButtonRegisterBook>Cadastrar novos livros</ButtonRegisterBook>
          </Link>
        )}

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
                <Book key={index} book={book} setRender={setRender} />
              ))}
            </div>
          </>
        )}

        {booksUnvailable.length > 0 && search === "" && (
          <>
            <h1>Reservados</h1>
            <div>
              {booksUnvailable.map((book, index) => (
                <Book key={index} book={book} setRender={setRender} />
              ))}
            </div>
          </>
        )}
      </Books>
    </>
  );
}

function getBooksByStatusAndCategory(books, disponivel, category) {
  const booksFilteredByStatus = books.filter(
    (livro) => livro.disponivel === disponivel
  );

  if (category !== "") {
    return booksFilteredByStatus.filter(
      (livro) => livro.categoria === category
    );
  }

  return booksFilteredByStatus;
}

const ButtonRegisterBook = styled.button`
  background-color: var(--gray);
  color: var(--dark-green);
  height: 35px;
  border-radius: 15px;
  border: none;
  width: fit-content;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
`;

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

  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding: 0 6vw;
  }
`;
