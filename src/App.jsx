import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Error from "./components/Error/Error"
import Main from "./components/Main/Main"
import PokemonPage from "./components/PokemonPage/PokemonPage"
import Loader from "./components/Loader/Loader"

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idPokemon, setIdPokemon] = useState('');
  const [pokemon, setPokemon] = useState(null);
  let yo ='yo'
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=5')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Loader/>;
  }
  console.log(data);
  const router = createBrowserRouter([
    {
        path:"/",
        element: <Main yo={yo} data={data} idPokemon={idPokemon} setIdPokemon={setIdPokemon} setPokemon={setPokemon} pokemon={pokemon}/>,
    },
    {
        path:"/pokemon/:id",
        element: <PokemonPage />,
    },
    {
        path: '*',
        element: <Error />,
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
