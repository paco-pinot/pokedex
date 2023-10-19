import "./main.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
function Main({ data,secondApiData,descriptionPokemonAPI,evoPokemonAPI,setSelectedTypes,selectedTypes,setSearch,Search}) {
  let recherche =(e)=>{
    console.log(e.target.value);
    setSearch(e.target.value)
}
const combinedData = data.results.map((element, index) => {
  const secondApiElementData = secondApiData[index];
  return {
    ...element,
    secondApiData: secondApiElementData,
  };
});
const filterBySelectedTypes = (pokemon, selectedTypes) => {
  if (selectedTypes.length === 0) {
    return true;
  }


  let typeMatches = 0;

  for (const type of pokemon.types) {
    if (selectedTypes.includes(type.type.name)) {
      typeMatches++;
    }
  }


  return typeMatches === selectedTypes.length;
};

const filteredData = combinedData.filter((element) => {

  const nameMatch = element.name.toLowerCase().includes(Search.toLowerCase());


  const typesMatch = filterBySelectedTypes(element.secondApiData, selectedTypes);

  return nameMatch && typesMatch;
});
  return (
    <>
    <Navbar recherche={recherche} setSelectedTypes={setSelectedTypes} selectedTypes={selectedTypes} />
    <main>
      <div className="container_main">
        {filteredData.map((element, index) => {
          return (
            <div className="pokemon_main" key={`pokemon-${index}`}>
              <div className="pokemonName">
                {element.secondApiData.id}. {element.name}
              </div>
              <div className="imgPokemon">
                <Link to={`/pokemon/${element.name}/${element.secondApiData.id}`} state={{ 
                  secondApiElementData: element.secondApiData, 
                  descriptionPokemonAPI: descriptionPokemonAPI,
                  evoPokemonAPI: evoPokemonAPI,
                }}>
                  <img src={element.secondApiData.sprites.versions['generation-v']['black-white'].front_default} alt="" />
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
  setSearch: PropTypes.func.isRequired,
  Search: PropTypes.array.isRequired,
};
export default Main;
