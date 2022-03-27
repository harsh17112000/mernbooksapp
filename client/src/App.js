import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Bookadd from './components/Bookadd';
import Update from './components/Update';
import { Routes, Route } from "react-router-dom";
import View from './components/View';
import Login from './components/Login';
import Register from './components/Register';
import { useContext } from 'react';
import { LoginContext } from './components/contextProvider/Context';
import Error from './components/Error';


function App() {

  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/bookadd' element={<Bookadd />} />
        <Route path='/bookupdate/:id' element={<Update />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/dash' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
