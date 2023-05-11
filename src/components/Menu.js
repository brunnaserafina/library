import styled from "styled-components";
import { IconLocalization, IconMenuHamburger } from "../common/Icons";

export default function Menu() {
  return (
    <Wrapper>
      <div>
        <IconLocalization color={"var(--dark-green)"} fontSize={"40px"} />
        <h1>
          Selecione a biblioteca pública <br></br>da sua cidade
        </h1>
      </div>

      <span>
        <IconMenuHamburger color={"var(--dark-green)"} fontSize={"25px"} />
        <h3>Todas as categorias</h3>
        <h4>Ciência política</h4>
        <h4>História do Brasil</h4>
        <h4>Infanto-juvenis</h4>
        <h4>Literatura brasileira</h4>
        <h4>Literatura estrangeira</h4>
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 80px;
  padding: 0 15vw;
  background-color: var(--gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 76.5%;
  }

  > div {
    display: flex;
    width: 20%;
    align-items: center;
  }
`;
