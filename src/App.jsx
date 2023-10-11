import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Error from './components/Error/Error';
import Main from './components/Main/Main';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Loader from './components/Loader/Loader';
import axios from 'axios';
import myData from "./data/myData.json"
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [secondApiData, setSecondApiData] = useState([]);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(true);
  const [pokemonChoisi, setPokemonChoisi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=649');
        const data = response.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchDataFromSecondApi = async () => {
      const secondApiDataArray = await Promise.all(
        data.results.map(async (element) => {
          const response = await axios.get(element.url);
          return response.data;
        })
      );

      setSecondApiData(secondApiDataArray);
      setIsLoadingPokemon(false)
    };

    fetchDataFromSecondApi();
  }, [data.results]);
  if (isLoadingPokemon || isLoading) {
    return <Loader/>
  }


  console.log(data);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main data={data} secondApiData={secondApiData} setPokemonChoisi={setPokemonChoisi} />,
    },
    {
      path: '/pokemon/:id',
      element: <PokemonPage myData={myData} pokemonChoisi={pokemonChoisi} SecondApiData={secondApiData} data={data}/>,
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
