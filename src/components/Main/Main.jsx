import "./main.css";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import axios from "axios";



function Main({ data, setIdPokemon, idPokemon }) {
  const [pokemon, setPokemon] = useState(null);
  const [secondApiData, setSecondApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromSecondApi = async () => {
      const secondApiDataArray = await Promise.all(
        data.results.map(async (element) => {
          const response = await axios.get(element.url);
          return response.data;
        })
      );

      setSecondApiData(secondApiDataArray);
      setIsLoading(false)
    };

    fetchDataFromSecondApi();
  }, [data.results]);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <>
      <Navbar />
      <main>
        {data.results.map((element, index) => {
          setIdPokemon(index + 1);
          const secondApiElementData = secondApiData[index];

          return (
            <div key={`pokemon-${index}`}>
              <div className="imgPokemon">
                {secondApiElementData && secondApiElementData.sprites && (
                  <img src={secondApiElementData.sprites.front_default} alt="" />
                )}
              </div>
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
