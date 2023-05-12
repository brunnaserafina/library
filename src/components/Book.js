import styled from "styled-components";

export function Book({ book }) {
  const { title, author, cover, status } = book;

  function handleBookReservation(title, author, status) {
    const message = `Olá, gostaria de ${
      status === "indisponível" ? "entrar na fila para" : ""
    } reservar o livro "${title}" do(a) autor(a) "${author}" que está disponível no site Nossa Biblioteca.`;

    window.open(
      `https://wa.me/5548996059421?text=${encodeURIComponent(message)}`
    );
  }

  return (
    <span>
      <img src={cover} alt={title} />
      <h2>{title}</h2>
      <p>{author}</p>
      <Button
        isAvailable={status === "disponível"}
        onClick={() => handleBookReservation(title, author, status)}
      >
        {status === "disponível" ? "Reservar" : "Entrar na fila"}
      </Button>
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
