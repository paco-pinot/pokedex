import "./main.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
function Main({ data,secondApiData,descriptionPokemonAPI,evoPokemonAPI,setSelectedTypes,selectedTypes}) {

  return (
    <>
      <Navbar setSelectedTypes={setSelectedTypes} selectedTypes={selectedTypes} />
      <main>
      <div className="container_main">
          {data.results.map((element, index) => {
            const secondApiElementData = secondApiData[index];
            return (
              <div className="pokemon_main" key={`pokemon-${index}`}>
                <div className="pokemonName">
                  {index + 1}. {element.name}
                </div>
                <div className="imgPokemon">
                  <Link to={`/pokemon/${element.name}/${index+1}`} state={{ 
                        secondApiElementData: secondApiElementData, 
                        descriptionPokemonAPI: descriptionPokemonAPI ,
                        evoPokemonAPI: evoPokemonAPI,
                      }}>
                        {secondApiElementData && secondApiElementData.sprites && (
                          <img src={secondApiElementData.sprites.versions['generation-v']['black-white'].front_default} alt="" />

                        )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

Main.propTypes = {
  data: PropTypes.object.isRequired,
  secondApiData: PropTypes.array.isRequired,
  descriptionPokemonAPI: PropTypes.array.isRequired,
  evoPokemonAPI : PropTypes.array.isRequired,
  setSelectedTypes: PropTypes.func.isRequired, 
  selectedTypes: PropTypes.array.isRequired,
};
export default Main;
