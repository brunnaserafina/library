import { useEffect, useState } from "react";
import styled from "styled-components";
import { IconDelete } from "../common/Icons";
import { putStatusBook, deleteBook } from "../services/library";

export default function Book({ book, setRender }) {
  const { id, titulo, autor, capa, disponivel } = book;
  const [isAdminLogged, setIsAdminLogged] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  function handleBookReservation(titulo, autor, status) {
    const message = `Olá, gostaria de ${
      !disponivel ? "entrar na fila para" : ""
    } reservar o livro "${titulo}" do(a) autor(a) "${autor}" que está disponível no site Nossa Biblioteca.`;

    window.open(
      `https://wa.me/5548996059421?text=${encodeURIComponent(message)}`
    );
  }

  async function changeStatusBook() {
    if (window.confirm("Tem certeza que deseja alterar o status do livro?")) {
      try {
        await putStatusBook(id);
        setRender((prev) => !prev);
      } catch (err) {
        console.error(err);
        alert("Não foi possível alterar o status do livro");
      }
    }
  }

  async function handleDeleteBook() {
    if (window.confirm("Tem certeza que deseja deletar esse livro?")) {
      try {
        await deleteBook(id);
        setRender((prev) => !prev);
      } catch (err) {
        console.error(err);
        alert("Não foi possível deletar o livro, tente novamente");
      }
    }
  }

  return (
    <span>
      <Image>
        <img src={capa} alt={titulo} />

        {isAdminLogged && (
          <span onClick={handleDeleteBook}>
            <IconDelete />
          </span>
        )}
      </Image>

      <h2>{titulo}</h2>
      <p>{autor}</p>

      {isAdminLogged ? (
        <>
          <Button isAvailable={disponivel} onClick={changeStatusBook}>
            {disponivel ? "Mudar para reservado" : "Mudar para disponível"}
          </Button>
        </>
      ) : (
        <Button
          isAvailable={disponivel}
          onClick={() => handleBookReservation(titulo, autor, disponivel)}
        >
          {disponivel ? "Reservar" : "Entrar na fila"}
        </Button>
      )}
    </span>
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

const Image = styled.div`
  position: relative;

  > span {
    background-color: red;
    display: block;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    right: 10;
    top: 0;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    cursor: pointer;
    color: white;
    font-size: 20px;
  }
`;
