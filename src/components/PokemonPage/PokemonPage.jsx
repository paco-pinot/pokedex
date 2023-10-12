import "./pokemonPage.css";
import { useParams, useLocation } from "react-router-dom";
import Error from "../Error/Error";
import PropTypes from 'prop-types';

function PokemonPage({ data,myData }) {
  const { id } = useParams();
  const location = useLocation();
  // const secondApiElementData = location.state?.secondApiElementData;
  const { secondApiElementData, descriptionPokemonAPI } = location.state;
  const pokemonChoisi = data.results.find((element) => element.name === id);
  const selectedPokemonDescription = descriptionPokemonAPI.find((description) => description.name === id);

  return (
    <section>
      {pokemonChoisi ? (
        <div>
        <h3>{pokemonChoisi.name}</h3>

          {secondApiElementData && descriptionPokemonAPI && (
            <div>
            <div className="description">
              Description  {selectedPokemonDescription.flavor_text_entries[5].flavor_text}
            </div>
            <p>
              Height: {secondApiElementData.height}
            </p>
            <p>
             Weight: {secondApiElementData.weight}
            </p>
            <p>
              Id : {secondApiElementData.id}
            </p>
            <p>
              Pokedex color : {selectedPokemonDescription.color.name}
            </p>
            <div>
              Stats: {secondApiElementData.stats.map((element,index)=>{
                return(
                  <div className="stat" key={index}>
                    base {element.stat.name} : {element.base_stat}
                  </div>
                )
              })}
            </div>
             
             
            <div className="imgPokemon">
              <img src={secondApiElementData.sprites.front_default} alt="" />
            </div>
            <div className="types">
              {secondApiElementData.types.map((element,index)=>{
                return(
                    <div key={index} className="typeImg">
                      <img src={ myData.types[element.type.name].img} alt="" />
                    </div>
                )
              })}
            </div>
            <div>
              <img src={secondApiElementData.sprites.back_default} alt="" />
            </div>
            </div>
          )}
        </div>
      ) : (
       <Error/>
      )}
    </section>
  );
}
PokemonPage.propTypes = {
  data: PropTypes.object.isRequired,
  myData: PropTypes.object.isRequired,
};
export default PokemonPage;
