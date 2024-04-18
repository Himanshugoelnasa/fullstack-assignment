import logo from './logo.svg';
import './App.css';
import {Link, Outlet} from 'react-router-dom'

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <Link to='/'>List</Link>
        <Link to='/add'>Add</Link>
      </header>
    </div>
    <Outlet />
    </>
  );
}

export default App;
