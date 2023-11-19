import Header from "../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCategories, postBook } from "../services/library";

export default function RegisterBook({ setRender }) {
  const [categories, setCategories] = useState([]);
  const initialBookData = {
    titulo: "",
    autor: "",
    capa: "",
    categoria_id: "",
  };
  const [bookData, setBookData] = useState({ ...initialBookData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postBook(bookData);
      alert("Livro cadastrado com sucesso!");
      setBookData({ ...initialBookData });
      setRender((prev) => !prev);
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      alert("Erro ao cadastrar o livro, confira os dados e tente novamente");
    }
  };

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

  return (
    <Wrapper>
      <h1>Cadastro de livros</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          placeholder="Insira o título do livro"
          value={bookData.titulo}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="autor">Autor</label>
        <input
          type="text"
          id="autor"
          name="autor"
          placeholder="Insira o nome do autor"
          value={bookData.autor}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="capa">Capa</label>
        <input
          type="text"
          id="capa"
          name="capa"
          placeholder="Insira o link da imagem da capa do livro"
          value={bookData.capa}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          name="categoria_id"
          value={bookData.categoria_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecione a categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoria}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--gray);
    padding: 40px;
  }

  input,
  label,
  select,
  button {
    width: 400px;
    text-align: center;
    margin: 3px 0;
  }

  h1 {
    text-transform: uppercase;
    margin-bottom: 25px;
    font-weight: 600;
    font-size: 20px;
    color: var(--dark-green);
  }

  button {
    background-color: var(--dark-green);
  }

  input,
  select,
  button {
    border-radius: 10px;
    height: 30px;
    border: none;
  }

  button {
    margin-top: 15px;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }

  label {
    margin-top: 10px;
  }

  select {
    background-color: white;
  }
`;
