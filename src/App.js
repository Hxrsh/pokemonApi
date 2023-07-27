import { useEffect, useState } from "react";
import "./App.css";
import headimg from "./poke-head.png";
const BASE_URL = "https://pokeapi.co/api/v2";

function App() {
  const [data, setData] = useState([]);
  // const [dispData, setDispData] = useState([]);

  const [offset, setOffest] = useState(0);

  async function Fetch(offset) {
    const url = `${BASE_URL}/pokemon?offset=${offset}&limit=10`;
    try {
      const response = await fetch(url);
      const dataFetch = await response.json();
      if (!dataFetch) return;
      if (data.includes(dataFetch.results)) return;
      console.log(dataFetch.results);
      setData((prev) => {
        return [...prev, ...dataFetch.results];
      });
      // return dataFetch.results;
      // setData((prev) => {
      //   console.log(prev, "prev");
      //   return prev.length === 0
      //     ? dataFetch.results
      //     : prev.concat(dataFetch.results);
      // });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const abortcontroller = new AbortController();
    console.log(offset);
    Fetch(offset);

    console.log("fetched");
  }, [offset]);
  // useEffect(() => {
  //   setDispData((prevState) => {
  //     return dispData.length === 0 ? data : prevState.concat(data);
  //   });
  // }, [data]);
  // useEffect(() => {
  //   setDispData((prevState) => {
  //     return prevState.concat(data);
  //   });
  //   console.log("disp data on mount", data);
  // }, [data]);
  // useEffect(() => {
  //   console.log(dispData, "disp");
  // }, [dispData]);
  function nxtHandler() {
    setOffest(offset + 10);
  }
  return (
    <h1 className="app">
      <div className="header">POKEMON</div>
      <div className="card_container">
        {data?.map((el, index) => {
          const poke_img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`;
          return <Card onImg={poke_img} name={el.name} key={el.name}></Card>;
        })}
      </div>

      <button onClick={nxtHandler}>Next</button>
    </h1>
  );
}

function Card({ name, onImg }) {
  return (
    <div className="card">
      <img src={onImg} alt={name} className="pokemon_image" />
      <div className="name">{name}</div>
    </div>
  );
}
export default App;
