import { useEffect, useState } from "react";
import Item from "./Item";

const ENDPOINT = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
const COTIZACIONES = [
  "Dolar Blue",
  "Dolar Oficial",
  "Dolar Contado con Liqui",
  "Dolar Bolsa",
];
const ENDOPOINTEURO = "https://www.dolarsi.com/api/api.php?type=euro";
const COTIZACIONEURO = ["Banco Nación"];
function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultEuro, setResultEuro] = useState([]);
  const [loadingEuro, setLoadingEuro] = useState([]);

  async function getCotization() {
    setLoading(true);
    const response = await fetch(ENDPOINT);
    const json = await response.json();
    const filteredresults = json.filter((cotizacion) =>
      COTIZACIONES.some((nombre) => nombre === cotizacion.casa.nombre)
    );
    setResults(filteredresults);
    setLoading(false);
  }

  async function getCotizationEuro() {
    setLoadingEuro(true);
    const response = await fetch(ENDOPOINTEURO);
    const json = await response.json();
    const filteredresulteuro = json.filter((cotizacion) =>
      COTIZACIONEURO.some((nombre) => nombre === cotizacion.casa.nombre)
    );
    setResultEuro(filteredresulteuro);
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
        <div className="flex items-center justify-around w-[40rem] h-[30rem] bg-[#FFFFFF] rounded-lg flex-col p-10">
          <div className="flex justify-between gap-2 w-full ">
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
              [...results, ...resultEuro].map((result) => {
                return (
                  <Item
                    key={result.casa.nombre}
                    nombre={result.casa.nombre}
                    compra={result.casa.compra}
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
