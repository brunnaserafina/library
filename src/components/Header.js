import styled from "styled-components";
import { IconHeart, IconSearch, IconUser } from "../common/Icons";

export default function Header() {
  return (
    <Wrapper>
      <h1>
        Nossa <br></br> Biblioteca
      </h1>

      <div>
        <IconSearch color={"var(--dark-green)"} fontSize={"24px"} />
        <input
          type="text"
          placeholder="Digite o título ou o autor que você está procurando"
        />
      </div>

      <span>
        <IconHeart fontSize={"24px"} />
        <p>Lista de desejos</p>
      </span>

      <span>
        <IconUser fontSize={"22px"} />
        <p>Faça seu login</p>
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 110px;
  margin-top: 30px;
  padding: 0 15vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
  background-color: var(--dark-green);

  h1 {
    font-family: Ropa Sans;
    color: var(--white);
    text-align: center;
    font-size: 40px;
  }

  > div {
    width: 400px;
    height: 50px;
    padding: 0 5px;
    border-radius: 15px;
    color: black;
    background-color: var(--gray);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div h2 {
    width: 30%;
    border-right: 2px solid black;
    text-align: center;
  }

  > div span {
    width: 70%;
    padding: 0 15px;
    display: flex;
    justify-content: center;
  }

  input {
    background-color: transparent;
    border: none;
    width: 100%;
    font-size: 14px;
  }

  > div input::placeholder {
    color: gray;
    font-size: 16px;
  }

  > div input:focus {
    outline: 0;

    caret-color: var(--dark-green);
  }

  > span {
    display: flex;
    align-items: center;
  }

  > span p {
    font-size: 18px;
    margin-left: 5px;
  }
`;
