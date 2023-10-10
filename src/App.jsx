import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Error from './components/Error/Error';
import Main from './components/Main/Main';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Loader from './components/Loader/Loader';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idPokemon, setIdPokemon] = useState('');
  const [pokemon, setPokemon] = useState(null);

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

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main data={data} idPokemon={idPokemon} setIdPokemon={setIdPokemon} setPokemon={setPokemon} pokemon={pokemon} />,
    },
    {
      path: '/pokemon/:id',
      element: <PokemonPage />,
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
