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
  const [secondApiData, setSecondApiData] = useState([]);
  const [descriptionPokemonAPI, setDescriptionPokemonAPI] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);



// __________________API PRINCIPAL
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=649');
  //       const data = response.data;
  //       setData(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // //_________________ API POKEMON
  // useEffect(() => {
  //   const fetchDataFromSecondApi = async () => {
  //     const secondApiDataArray = await Promise.all(
  //       data.results.map(async (element) => {
  //         const response = await axios.get(element.url);
  //         return response.data;
  //       })
  //     );

  //     setSecondApiData(secondApiDataArray);
  //     console.log("second : " + secondApiData);
  //     setIsLoadingPokemon(false)
  //   };
  //   fetchDataFromSecondApi();
  // }, [data.results]);
  // // _______________API DESCRIPTION POKEMON
  // useEffect(() => {
  //   const fetchDataFromDescriptionApi = async () => {
  //     const descriptionPokemonApiArray = await Promise.all(
  //       secondApiData.map(async (element) => {
  //         const response = await axios.get(element.species.url);
  //         return response.data;
  //       })
  //     );

  //     setDescriptionPokemonAPI(descriptionPokemonApiArray);
  //     console.log("description : " + descriptionPokemonApiArray);
  //     setIsLoadingDescription(false)
  //   };
  //   fetchDataFromDescriptionApi();
  // }, [secondApiData]);



  useEffect(() => {
    const fetchData = async () => {
      // API PRINCIPAL
      try {
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

        // API DESCRIPTION
        const descriptionPokemonApiArray = [];
        for (const element of secondApiDataArray) {
          const response = await axios.get(element.species.url);
          descriptionPokemonApiArray.push(response.data);
        }
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
      element: <Main descriptionPokemonAPI={descriptionPokemonAPI} data={data} secondApiData={secondApiData}  />,
    },
    {
      path: '/pokemon/:id',
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
