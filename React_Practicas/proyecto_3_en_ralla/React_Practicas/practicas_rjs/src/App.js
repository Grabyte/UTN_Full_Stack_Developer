import './App.css';
import { FirtsComponent } from './components/FirstComponent';

function App() {
  let name = <h1>Ricardo website</h1>

  return (
    <div className="App">
      {name}
      <FirtsComponent></FirtsComponent>
    </div>
  );
}

export default App;
