import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";

function App() {

  const [personajes, setPersonajes] = useState([]);
  const [infoPage, setInfoPage] = useState({});
  const [itemPagination, setItemPagination] = useState([]);

  //Traigo los personajes dede la API con AXIOS
  const getPersonajes = async (page) => {
    const getData = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    setPersonajes(getData.data.results);
    //Seteando EpisodesCount, NextPage, Pages, Prev
    setInfoPage(getData.data.info);


  };

  useEffect(() => {
    getPersonajes(0);
  }, []);

  useEffect(() => {

    let items = []

    for (let i = 1; i < infoPage.pages; i++) {

      items.push(

        <Pagination.Item
          className="cursor bg-cyan-500 hover:bg-cyan-600 p-5 mb-5 rounded-lg shadow-md text-white font-bold text-xl"
          key={i}
          onClick={(e) => (getPersonajes(parseInt(e.target.text)))}>{i}

        </Pagination.Item>);

    }
    setItemPagination(items)
  }, [infoPage]);

  return (

    <div>

      <nav className="bg-slate-500 p-12 mb-5">
        <div>
          <p className="titulo_app text-center">Rick and Morty API</p>
        </div>
      </nav>

      <div className="flex justify-center">

      </div>
      <div className="grid md:grid-cols-4 gap-5 p-10">
        {/* Condicional que evalua si el state está en null */}
        {personajes != []
          ? /* Recorro los personajes con una variable temporal */
          personajes.map((personaje) => (
            <div
              key={personaje.id}
              className="text-center rounded shadow-lg bg-gray-50 p-5"

            >
              <img
                className="img-100 rounded-full mb-2 mx-auto"
                src={personaje.image}
                alt="Imagen del personaje"
              />

              <p className="text-2xl font-black">Name: {personaje.name}</p>
              <p className="text-lg">Genre: {personaje.gender}</p>
              <p className="text-lg">Species: {personaje.species}</p>
              <p
                /* Evaluo, segun el status (Vivo, Muerto, Desconocido) seteo un color */
                className={`text-lg font-bold ${personaje.status == "Alive"
                  ? "text-green-600"
                  : "text-red-600"
                  } ${personaje.status == "unknown" && "text-yellow-400"} `}
              >
                {" "}
                <span className="font-normal text-black text-lg">
                  Status:{" "}
                </span>
                {personaje.status}
              </p>
              <p>Origin: {personaje.origin.name}</p>

            </div>
          ))
          : //En caso de que el state esté en Null, esta será la respuesta por defecto
          "No hay personajes"}

      </div>

      <Pagination className="flex space-x-1 mx-5 overflow-x-scroll">

        {itemPagination.map(item => (
          item
        ))}

      </Pagination>


    </div>

  );

}
export default App;
