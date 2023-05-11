import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { getBooks } from "../services/libraryService";

export default function Home() {
  const [booksAvailable, setBooksAvailable] = useState([]);
  const [booksUnvailable, setBooksUnavailable] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      const allBooks = await getBooks();
      setBooksAvailable(
        allBooks.data.filter((book) => book.status === "disponível")
      );

      setBooksUnavailable(
        allBooks.data.filter((book) => book.status === "indisponível")
      );
    }

    getAllBooks();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <Books>
        <h1>Disponíveis</h1>
        <div>
          {booksAvailable.map((item, index) => (
            <span key={index}>
              <img src={item.cover} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.author}</p>
              <button>Reservar</button>
            </span>
          ))}
        </div>

        <h1>Reservados</h1>
        <div>
          {booksUnvailable.map((item, index) => (
            <span key={index}>
              <img src={item.cover} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.author}</p>
              <button>Entrar na fila </button>
            </span>
          ))}
        </div>
      </Books>
    </>
  );
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
    margin-bottom: 20px;
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
    margin-bottom: 20px;
    border: 1px solid var(--dark-green);
  }

  div {
    display: flex;
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

  > div:nth-of-type(2) button {
    background-color: var(--red);
  }

  button {
    width: 145px;
    height: 35px;
    border-radius: 15px;
    background-color: var(--light-green);
    border: none;
    color: var(--white);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
`;
