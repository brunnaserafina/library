import styled from "styled-components";
import { IconSearch } from "../common/Icons";
import books from "../dataBooks/Books";

export default function Header({ category, setCategory, search, setSearch }) {
  const categories = books
    .reduce((acc, book) => {
      if (!acc.includes(book.category)) {
        acc.push(book.category);
      }
      return acc;
    }, [])
    .sort();

  return (
    <Wrapper>
      <Logo>
        <h1>
          Nossa <br></br> Biblioteca
        </h1>

        <div>
          <IconSearch color={"var(--dark-green)"} fontSize={"24px"} />
          <input
            type="text"
            placeholder="O que você está procurando?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Logo>

      <Categories>
        <AllCategories
          onClick={() => {
            setCategory("");
            setSearch("");
          }}
          textDecoration={category === ""}
        >
          Todas as categorias
        </AllCategories>

        {categories.map((item, index) => (
          <Category
            key={index}
            onClick={() => {
              setCategory(item);
              setSearch("");
            }}
            textDecoration={item === category}
          >
            {item}
          </Category>
        ))}
      </Categories>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Logo = styled.div`
  width: 40vw;
  height: 80px;
  padding: 0 0 0 15vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
  background-color: var(--dark-green);
  margin-bottom: 40px;

  h1 {
    font-family: Ropa Sans;
    color: var(--white);
    text-align: center;
    font-size: 33px;
    margin-right: 30px;
  }

  input {
    background-color: transparent;
    border: none;
    width: 100%;
    font-size: 14px;
  }

  > div {
    width: 250px;
    height: 40px;
    border-radius: 15px;
    color: black;
    background-color: var(--white);
    display: flex;
    align-items: center;
    padding: 0 5px;
  }

  > div input::placeholder {
    color: gray;
    font-size: 16px;
  }

  > div input:focus {
    outline: 0;

    caret-color: var(--dark-green);
  }
`;

const Category = styled.h4`
  margin-right: 10px;
  cursor: pointer;
  text-decoration: ${(props) => (props.textDecoration ? "underline" : "none")};
`;

const AllCategories = styled.h3`
  text-decoration: ${(props) => (props.textDecoration ? "underline" : "none")};
`;

const Categories = styled.div`
  width: 60vw;
  height: 80px;
  padding: 0 15vw 0 5vw;
  background-color: var(--dark-green);
  color: var(--white);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  h3 {
    margin: 0 10px;
    cursor: pointer;
  }
`;
