import { Wizard } from './features/wizard/Wizard';
import './App.css';

function App() {
  return (
    <div className="lw-app">
      <div>
        {<Wizard />}
      </div>
    </div>
  );
}

export default App;
