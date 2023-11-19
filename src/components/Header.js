import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IconAdmin,
  IconMenuHamburger,
  IconOut,
  IconSearch,
} from "../common/Icons";
import { getCategories } from "../services/library";

export default function Header({ category, setCategory, search, setSearch }) {
  const [openMenuHamburger, setOpenMenuHamburger] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isAdminLogged, setIsAdminLogged] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categorias = (await getCategories()).data;
        setCategories(categorias);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    fetchCategories();
  }, []);

  async function loginAdmin() {
    navigate("/login");
  }

  function logoutAdmin() {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAdminLogged(false);
    window.location.reload();
  }

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
              setCategory(item.categoria);
              setSearch("");
            }}
            textDecoration={item.categoria === category}
          >
            {item.categoria}
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
                  setCategory(item.categoria);
                  setSearch("");
                }}
                textDecoration={item === category}
              >
                {item.categoria}
              </li>
            ))}
          </WindowCategories>
        )}
      </Categories>

      <Admin onClick={isAdminLogged ? logoutAdmin : loginAdmin}>
        {isAdminLogged ? (
          <>
            <IconOut />
            <p>Sair</p>
          </>
        ) : (
          <>
            <IconAdmin />
            <p>Admin</p>
          </>
        )}
      </Admin>
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
  padding: 0 12vw;
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

const Admin = styled.span`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
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
