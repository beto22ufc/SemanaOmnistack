import React, {useState, useEffect} from 'react';
import api from './services/api'

import './Global.css'
import './App.css' 
import './Sidebar.css' 
import './main.css' 


//componente : bloco isolado de HTML, CSS e JS
//estado : informações mantidas pelo componente 
//propriedade : informações que um componenete passa para o outro




function App() {
  const [devs, setDevs] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [github_username, setUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  },[]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('./devs');
      
      setDevs(response.data);
    }

    loadDevs();
  },[]);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('./devs', {
        github_username,
        techs,
        latitude,
        longitude,
    })


    setUsername('');
    setTechs('');
    
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="github_username">Usuário do GitHub</label>
              <input 
                name="github_username"
                id="github_username"
                required
                value={github_username}
                onChange={e => setUsername(e.target.value)}>
              </input>
            </div>

            <div className="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input 
                name="techs"
                id="techs"
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}>
              </input>
            </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type = "number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}>
              </input>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type = "number"
                name="longitude" 
                id="longitude"
                required
                value={longitude} 
                onChange={e => setLongitude(e.target.value)} >
              </input>
            </div>
          </div>            

          <button type="submit">Salvar</button>
          </form>
        </aside>

        <main>
          <ul>
            {devs.map(dev => (
              <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            </li>
            ))}

          </ul>
        </main>

    </div>
      );
}

export default App;
