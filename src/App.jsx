import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Error from './components/Error/Error';
import Main from './components/Main/Main';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Loader from './components/Loader/Loader';
import axios from 'axios';
import useSWR from 'swr'
import myData from "./data/myData.json"
function App() {
  // const [cachedData, setCachedData] = useState(null);
  const [data, setData] = useState([]);
  const [secondApiData, setSecondApiData] = useState([]);
  const [descriptionPokemonAPI, setDescriptionPokemonAPI] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API PRINCIPAL
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=649');
        const data = response.data;
        setData(data);
  
        // API POKEMON
        const secondApiDataArray = await Promise.all(
          data.results.map(async (element) => {
            const response = await axios.get(element.url);
            return response.data;
          })
        );
        setSecondApiData(secondApiDataArray);
  
        // API DESCRIPTION (récupération des descriptions ici)
        const descriptionPokemonApiArray = await Promise.all(
          secondApiDataArray.map(async (element) => {
            const response = await axios.get(element.species.url);
            return response.data;
          })
        );
        setDescriptionPokemonAPI(descriptionPokemonApiArray);
  
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);







  if (isLoading ) {
    return <Loader/>
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main setSearch={setSearch} Search={Search} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} myData={myData}  descriptionPokemonAPI={descriptionPokemonAPI} data={data} secondApiData={secondApiData}  />,
    },
    {
      path: '/pokemon/:name/:id',
      element: <PokemonPage myData={myData} data={data}/>,
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
