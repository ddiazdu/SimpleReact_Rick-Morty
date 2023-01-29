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
      <nav className="bg-slate-500 p-12 mb-10">
        <div>
          <p className="titulo_app">Rick and Morty API</p>
        </div>
      </nav>
      <div className="grid grid-cols-4 gap-4 px-10">
        {/* Condicional que evalua si el state está en null */}
        {personajes != null
          ? /* Recorro los personajes con una variable temporal */
            personajes.map((personaje) => (
              <div className="text-center " key={personaje.id}>
                <img src={personaje.image} alt="Imagen del personaje" />
                <p className="text-2xl font-black">{personaje.name}</p>
                <p className="text-xl font-bold">{personaje.gender}</p>
                <p>{personaje.species}</p>
                <p
                  /* Evaluo, segun el status (Vivo, Muerto, Desconocido) seteo un color */
                  className={`text-lg font-bold ${
                    personaje.status == "Alive"
                      ? "text-green-600"
                      : "text-red-600"
                  } ${personaje.status == "unknown" && "text-yellow-400"} `}
                >
                  {personaje.status}
                </p>
                <p>{personaje.origin.name}</p>
              </div>
            ))
          : //En caso de que el state esté en Null, esta será la respuesta por defecto
            "No hay personajes"}
      </div>
    </div>
  );
}

export default App;
