import "./main.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
function Main({ data,secondApiData}) {

  return (
    <>
      <Navbar />
      <main>
        {data.results.map((element, index) => {
          const secondApiElementData = secondApiData[index];

          return (
            <div key={`pokemon-${index}`}>
            <Link  state={{ secondApiElementData: secondApiElementData }} to={`/pokemon/${element.name}`} >
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

export default Main;
