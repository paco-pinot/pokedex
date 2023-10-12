import "./main.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
function Main({ data,secondApiData,descriptionPokemonAPI}) {

  return (
    <>
      <Navbar />
      <main>
        {data.results.map((element, index) => {
          const secondApiElementData = secondApiData[index];
          return (
            <div key={`pokemon-${index}`}>
            <Link to={`/pokemon/${element.name}`} state={{ 
                  secondApiElementData: secondApiElementData, 
                  descriptionPokemonAPI: descriptionPokemonAPI 
                }}>
                <div className="imgPokemon">
                  {secondApiElementData && secondApiElementData.sprites && (
                    <img src={secondApiElementData.sprites.front_default} alt="" />

                  )}
                </div>
            </Link>
              <div className="pokemonName">
                {index + 1}. {element.name}
                
                {secondApiElementData && (
                  <div>
                    Height: {secondApiElementData.height}
                    Weight: {secondApiElementData.weight}
                    
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </>
  );
}

Main.propTypes = {
  data: PropTypes.object.isRequired,
  secondApiData: PropTypes.array.isRequired,
  descriptionPokemonAPI: PropTypes.array.isRequired,
};
export default Main;
