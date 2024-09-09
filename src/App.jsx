import { useEffect, useState } from "react";
import Item from "./Item";

const ENDPOINT = "https://dolarapi.com/v1/dolares";
const COTIZACIONES = ["Blue", "Oficial", "Contado con liquidación", "Bolsa"];
const ENDOPOINTEURO = "https://dolarapi.com/v1/cotizaciones/eur";
function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultEuro, setResultEuro] = useState({});
  const [loadingEuro, setLoadingEuro] = useState([]);

  async function getCotization() {
    setLoading(true);
    const response = await fetch(ENDPOINT);
    const json = await response.json();
    const filteredresults = json.filter((cotizacion) =>
      COTIZACIONES.some((nombre) => nombre === cotizacion.nombre)
    );
    console.log(filteredresults);
    setResults(filteredresults);
    setLoading(false);
  }

  async function getCotizationEuro() {
    setLoadingEuro(true);
    const response = await fetch(ENDOPOINTEURO);
    const jsonData = await response.json();
    console.log(jsonData);

    setResultEuro(jsonData);
    setLoadingEuro(false);
  }

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }
  function handleOnClick() {
    setInputValue("");
    getCotization();
    getCotizationEuro();
  }
  useEffect(() => {
    getCotization();
    getCotizationEuro();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-[#D6FCE8]">
        <div className="flex items-center justify-around w-[40rem] h-[30rem] bg-[#FFFFFF] mx-5 rounded-lg flex-col p-5 md:p-10">
          <div className="flex justify-between gap-2 w-full mb-3">
            <input
              value={inputValue}
              onChange={handleOnChange}
              placeholder="valor en dolares"
              type="number"
              className="w-full h-[3rem]
             bg-[#E8EAEE] rounded-lg p-2"
            />

            <button
              className="border-4 border-indigo-500/50 rounded w-32 h-15"
              onClick={handleOnClick}
            >
              Refresh
            </button>
          </div>
          <div className="flex justify-between w-full bg-[#02694E] rounded-lg flex-col p-10 gap-2">
            {loading || loadingEuro ? (
              <span className="text-white">Loading...</span>
            ) : (
              [...results, resultEuro].map((result) => {
                return (
                  <Item
                    key={result.nombre}
                    nombre={result.nombre}
                    compra={result.compra}
                    inputValue={inputValue}
                  ></Item>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
