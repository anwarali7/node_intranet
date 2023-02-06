import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [jsonData, setJsonData] = useState({});

  const getData = () => {
    fetch("http://localhost:8000/", {
      method: "GET",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setJsonData(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <button type="button" onClick={getData}>Get data</button>
      <div>{JSON.stringify(jsonData)}</div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
