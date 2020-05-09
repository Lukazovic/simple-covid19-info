import React, { useState, useEffect } from "react";
import axios from "axios";
import covid from "./covid.svg";
import copyIcon from "./copyIcon.svg";
import loadingIcon from "./loadingIcon.gif";
import "./Info.css";

const URL = "https://api.covid19api.com/country/brazil";

function Info() {
  const [loading, setLoading] = useState(true);
  const [currentBrazilData, setCurrentBrazilData] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    active: 0,
    updatedAt: "",
  });

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get(URL);
    const current = data[data.length - 1];
    const [year, month, rest] = current.Date.toString().split("-");
    const [day] = rest.split("T");
    setCurrentBrazilData({
      confirmed: current.Confirmed,
      deaths: current.Deaths,
      recovered: current.Recovered,
      active: current.Active,
      updatedAt: `${day}/${month}/${year}`,
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const { confirmed, deaths, recovered, active, updatedAt } = currentBrazilData;

  const handleCopyClick = text => {
    if (text) {
      navigator.clipboard.writeText(text);
    }

    navigator.clipboard.writeText(`Casos Confirmados: ${confirmed} 
      \nCasos Ativos: ${active} 
      \nMortos: ${deaths} 
      \nRecuperados: ${recovered} 
      \nAtualizado em: ${updatedAt}`);
  };

  return (
    <div className="Info">
      <div className="Info-title">
        <h1>
          <img src={covid} alt="covid logo" /> Info COVID-19 Brasil{" "}
          <img src={covid} alt="covid logo" />
        </h1>
      </div>
      <div className="Info-container">
        {loading ? (
          <div className="Info-loading">
            <img src={loadingIcon} alt="loading icon" />
          </div>
        ) : (
          <>
            <div className="Info-container-line">
              <h3>Casos Confirmados: {confirmed}</h3>
              <img
                src={copyIcon}
                alt="copy to clipboard"
                onClick={() =>
                  handleCopyClick(`Casos Confirmados: ${confirmed}`)
                }
              />
            </div>
            <div className="Info-container-line">
              <h3>Casos Ativos: {active}</h3>
              <img
                src={copyIcon}
                alt="copy to clipboard"
                onClick={() => handleCopyClick(`Casos Ativos: ${active}`)}
              />
            </div>
            <div className="Info-container-line">
              <h3>Mortos: {deaths}</h3>
              <img
                src={copyIcon}
                alt="copy to clipboard"
                onClick={() => handleCopyClick(`Mortos: ${deaths}`)}
              />
            </div>
            <div className="Info-container-line">
              <h3>Recuperados: {recovered}</h3>
              <img
                src={copyIcon}
                alt="copy to clipboard"
                onClick={() => handleCopyClick(`Recuperados: ${recovered}`)}
              />
            </div>
            <div className="Info-container-line">
              <h3>Atualizado em: {updatedAt}</h3>
              <img
                src={copyIcon}
                alt="copy to clipboard"
                onClick={() => handleCopyClick(`Atualizado em: ${updatedAt}`)}
              />
            </div>
            <div className="Info-buttons">
              <button onClick={handleCopyClick}>Copiar</button>
              <button onClick={getData}>Atualizar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Info;
