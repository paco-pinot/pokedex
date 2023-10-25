import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Error from '../Error/Error';
import PropTypes from 'prop-types';
import "./pokemonPage.css"
function PokemonPage({ data, myData }) {
  const { name } = useParams();
  const location = useLocation();
  const { secondApiElementData, descriptionPokemonAPI } = location.state;
  const pokemonChoisi = data.results.find((element) => element.name === name);
  const selectedPokemonDescription = descriptionPokemonAPI.find(
    (description) => description.name === name
  );

  const [hovered, setHovered] = useState(secondApiElementData.sprites.front_default);

  return (
    <section className="section_pokemon_page">
      {pokemonChoisi ? (
        <div className="pokemon_page_container">
        <Link to={"/"}>
          <div className="backHome">Back</div>
        </Link>
          <div className="top_page_pokemon">
            <div className="name_pokemon">
              <img
                className="taille_pokeball_pkmn_page"
                src="/img/pokeball.png"
                alt=""
              />
              <span className="idPkmn_page"> {secondApiElementData.id}. </span>{' '}
              {pokemonChoisi.name}
            </div>
          </div>
          <div className="bottom_page_pokemon">
            <div className="img_and_name_container">
              <div className="border_gold_img_pkmn">
                <div
                  onMouseEnter={() =>
                    setHovered(secondApiElementData.sprites.back_default)
                  }
                  onMouseLeave={() =>
                    setHovered(secondApiElementData.sprites.front_default)
                  }
                  className="img_pokemon_page"
                >
                  <img src={hovered} alt="" />
                </div>
              </div>
              <div className="name_container">
                <div className="type_pokemon">
                  {secondApiElementData.types.map((element, index) => {
                    return (
                      <div key={index} className="typeImg">
                        <img
                          src={myData.types[element.type.name].img}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="poid_taille_pokemon">
                  <p> Height : <span> {secondApiElementData.height}m</span></p>
                  <p> Weight : <span> {secondApiElementData.weight}g</span></p>
                </div>
                <div className="description_pokemon">
                  {selectedPokemonDescription === undefined
                    ? 'There is no description'
                    : selectedPokemonDescription.flavor_text_entries[0].flavor_text.replace(/\f/g, ' ')}
                </div>
                <div className="stats_pokemon">
                  {secondApiElementData.stats.map((element, index) => {
                    return (
                      <div className="stat" key={index}>
                        <div className="title_stat"> base {element.stat.name}</div>
                        <div className="stat_number"> {element.base_stat} </div> 
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </section>
  );
}

PokemonPage.propTypes = {
  data: PropTypes.object.isRequired,
  myData: PropTypes.object.isRequired,
};

export default PokemonPage;
