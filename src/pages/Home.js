import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { getBooks } from "../services/libraryService";

export default function Home() {
  const [booksAvailable, setBooksAvailable] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      const allBooks = await getBooks();
      setBooksAvailable(
        allBooks.data.filter((book) => book.status === "disponível")
      );
    }

    getAllBooks();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <BooksAvailable>
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
      </BooksAvailable>
    </>
  );
}

const BooksAvailable = styled.div`
  width: 100vw;
  padding: 0 15vw;
  margin-top: 5vh;

  h1 {
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 700;
    color: var(--dark-green);
    margin-bottom: 20px;
  }

  h2 {
    font-weight: 700;
    height: 40px;
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
