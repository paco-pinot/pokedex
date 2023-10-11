import "./pokemonPage.css";
import { useParams, useLocation } from "react-router-dom";
import Error from "../Error/Error";

function PokemonPage({ data,myData }) {
  const { id } = useParams();
  const location = useLocation();
  const secondApiElementData = location.state?.secondApiElementData;
  const pokemonChoisi = data.results.find((element) => element.name === id);

  return (
    <section>
      {pokemonChoisi ? (
        <div>
          Name: {pokemonChoisi.name}
          {/* Utilisez les données de la deuxième API ici */}
          {secondApiElementData && (
            <div>
              Height: {secondApiElementData.height}
              Weight: {secondApiElementData.weight}
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

export default PokemonPage;
