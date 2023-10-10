import "./main.css";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
const cache = axios.create({
    cache: true,
  });
function Main({data,setIdPokemon,idPokemon}) {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonImages, setPokemonImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (idPokemon) {
      cache.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then((response) => {
          setPokemon(response.data);
          setPokemonImages([...pokemonImages, response.data.sprites.front_default]);
          setIsLoading(false);
        });
    }
  }, [idPokemon]);

  if (isLoading) {
    return (
      <div>
        <img src="https://i.imgur.com/2v2994b.gif" />
      </div>
    );
  }

  return (
    <>
        <Navbar/>
        <main>
            {data.results.map((element, index) => {
              setIdPokemon(index);
              return (
                <div key={`pokemon-${index}`}>
                    <div className="imgPokemon">
                        <img src={pokemonImages[index]} alt="" />
                    </div>
                    <div className="pokemonName">
                        {index} {element.name}
                    </div>
                </div>
              );
            })}
        </main>
        <Footer/>
    </>
  );
}

export default Main;