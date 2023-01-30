import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [personajes, setPersonajes] = useState(null);

  //Traigo los personajes dede la API con AXIOS
  const getPersonajes = async (estado) => {
    const getData = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    estado(getData.data.results);
  };

  useEffect(() => {
    getPersonajes(setPersonajes);
  }, []);

  return (
    <div>
      <nav className="bg-slate-500 p-12 mb-5">
        <div>
          <p className="titulo_app text-center">Rick and Morty API</p>
        </div>
      </nav>
      <div className="grid md:grid-cols-4 gap-5 p-10">
        {/* Condicional que evalua si el state está en null */}
        {personajes != null
          ? /* Recorro los personajes con una variable temporal */
            personajes.map((personaje) => (
              <div className="text-center " key={personaje.id}>
                <img
                  className="img-100"
                  src={personaje.image}
                  alt="Imagen del personaje"
                />
                <p className="text-2xl font-black">Nombre: {personaje.name}</p>
                <p className="text-lg">Genre: {personaje.gender}</p>
                <p className="text-lg">Species: {personaje.species}</p>
                <p
                  /* Evaluo, segun el status (Vivo, Muerto, Desconocido) seteo un color */
                  className={`text-lg font-bold ${
                    personaje.status == "Alive"
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
    </div>
  );
}

export default App;
