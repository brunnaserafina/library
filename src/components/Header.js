import { useState } from "react";
import styled from "styled-components";
import { IconMenuHamburger, IconSearch } from "../common/Icons";
import books from "../dataBooks/Books";

export default function Header({ category, setCategory, search, setSearch }) {
  const [openMenuHamburger, setOpenMenuHamburger] = useState(false);

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

        <MenuHamburger onClick={() => setOpenMenuHamburger(!openMenuHamburger)}>
          <IconMenuHamburger />
        </MenuHamburger>

        {openMenuHamburger && (
          <WindowCategories>
            <li
              onClick={() => {
                setCategory("");
                setSearch("");
              }}
              textDecoration={category === ""}
            >
              Todas as categorias
            </li>
            {categories.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setCategory(item);
                  setSearch("");
                }}
                textDecoration={item === category}
              >
                {item}
              </li>
            ))}
          </WindowCategories>
        )}
      </Categories>
    </Wrapper>
  );
}

const MenuHamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: initial;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark-green);
  padding: 0 15vw;
  width: 100vw;

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

  @media (max-width: 768px) {
    padding: 0 6vw;

    > div {
      width: 150px;
    }

    h1 {
      margin-right: 0;
    }
  }
`;

const Category = styled.h4`
  margin-left: 15px;
  cursor: pointer;
  text-decoration: ${(props) => (props.textDecoration ? "underline" : "none")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const AllCategories = styled.h3`
  text-decoration: ${(props) => (props.textDecoration ? "underline" : "none")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Categories = styled.span`
  height: 80px;
  background-color: var(--dark-green);
  color: var(--white);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  position: relative;

  h3 {
    margin: 0 10px;
    cursor: pointer;
  }
`;

const WindowCategories = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--dark-green);
  height: fit-content;
  color: white;
  position: absolute;
  top: 80px;
  right: 0;
  padding: 10px;
  width: 40vw;

  li {
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
