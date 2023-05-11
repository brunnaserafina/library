import { useEffect, useState } from "react";
import styled from "styled-components";
import books from "../dataBooks/Books";
import Header from "../components/Header";

export default function Home() {
  const [booksAvailable, setBooksAvailable] = useState([]);
  const [booksUnvailable, setBooksUnavailable] = useState([]);
  const [booksSearch, setBooksSearch] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getAllBooks() {
      if (search === "") {
        setBooksAvailable(
          category === ""
            ? books.filter((book) => book.status === "disponível")
            : books.filter(
                (book) =>
                  book.status === "disponível" &&
                  book.category === `${category}`
              )
        );

        setBooksUnavailable(
          category === ""
            ? books.filter((book) => book.status === "indisponível")
            : books.filter(
                (book) =>
                  book.status === "indisponível" &&
                  book.category === `${category}`
              )
        );
      } else {
        setBooksSearch(
          books.filter((book) => {
            return (
              book.title.toLowerCase().includes(search.toLowerCase()) ||
              book.author.toLowerCase().includes(search.toLowerCase())
            );
          })
        );
      }
    }

    getAllBooks();
  }, [category, search]);

  function handleBookReservation(title, author, status) {
    const message = `Olá, gostaria de ${
      status === "indisponível" ? "entrar na fila para" : ""
    } reservar o livro "${title}" do(a) autor(a) "${author}" que está disponível no site Nossa Biblioteca.`;

    window.open(
      `https://wa.me/5548996059421?text=${encodeURIComponent(message)}`
    );
  }

  return (
    <>
      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />
      {search !== "" ? (
        <Books>
          <div>
            {booksSearch?.map((item, index) => (
              <span key={index}>
                <img src={item.cover} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <Button
                  isAvailable={item.status === "disponível"}
                  onClick={() =>
                    handleBookReservation(item.title, item.author, item.status)
                  }
                >
                  {item.status === "disponível" ? "Reservar" : "Entrar na fila"}
                </Button>
              </span>
            ))}
          </div>
        </Books>
      ) : (
        <Books>
          {booksAvailable.length > 0 && <h1>Disponíveis</h1>}
          <div>
            {booksAvailable.map((item, index) => (
              <span key={index}>
                <img src={item.cover} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <Button
                  isAvailable={item.status === "disponível"}
                  onClick={() =>
                    handleBookReservation(item.title, item.author, item.status)
                  }
                >
                  Reservar
                </Button>
              </span>
            ))}
          </div>

          {booksUnvailable.length > 0 && <h1>Reservados</h1>}
          <div>
            {booksUnvailable.map((item, index) => (
              <span key={index}>
                <img src={item.cover} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <Button
                  isAvailable={item.status === "disponível"}
                  onClick={() =>
                    handleBookReservation(item.title, item.author, item.status)
                  }
                >
                  Entrar na fila{" "}
                </Button>
              </span>
            ))}
          </div>
        </Books>
      )}
    </>
  );
}

const Button = styled.button`
  background-color: ${(props) =>
    props.isAvailable ? "var(--light-green)" : "var(--red)"};
  width: 100%;
  height: 35px;
  border-radius: 15px;
  border: none;
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 15px;
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
`;
