import React, { useState, useEffect } from 'react';
import './App.css'

function ConversorDeMoedas() {
  const [moedas, setMoedas] = useState([]);
  const [deMoeda, setDeMoeda] = useState('USD');
  const [paraMoeda, setParaMoeda] = useState('EUR');
  const [quantidade, setQuantidade] = useState(1);
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setMoedas([...Object.keys(data.rates)]);
      })
      .catch(error => console.error('Erro ao buscar moedas:', error));
  }, []);

  const converterMoeda = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${deMoeda}`)
      .then(response => response.json())
      .then(data => {
        const taxaDeCambio = data.rates[paraMoeda];
        setResultado(quantidade * taxaDeCambio);
      })
      .catch(error => console.error('Erro ao converter moeda:', error));
  };

  return (
<>
      <h2>Conversor de Moedas</h2>
      <div className="textInput">
        <label>De:</label>
        <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
          {moedas.map(moeda => (
            <option key={moeda} value={moeda}>{moeda}</option>
          ))}
        </select>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </div>
      <div className="textInput">
        <label>Para:</label>
        <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
          {moedas.map(moeda => (
            <option key={moeda} value={moeda}>{moeda}</option>
          ))}
        </select>
        <button onClick={converterMoeda}>Converter</button>
      <div className="textInput">
        <h3>Resultado:</h3>
        <p>{resultado.toFixed(2)}</p>
      </div>
      </div>
</>
  );
}

export default ConversorDeMoedas;