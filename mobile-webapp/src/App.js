import React, {useState} from 'react';
import './App.css';
import Switch from '@material-ui/core/Switch';
import MapContainer from './features/heatmap/MapContainer'

function App() {
  const [show, setShow] = useState(true)

  return (
    <div className="App">
        <div>
          <Switch checked={show} onChange={_ => setShow(!show)}/>
        </div>
        <div>
        { show &&
        <MapContainer />
        }
        </div>
    </div>
  );
}

export default App;
