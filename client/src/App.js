import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch } from "react-redux";
import AllRoutes from './AllRoutes';
import Navbar from './components/navbar/Navbar';
import { useEffect } from 'react';
import { fetchAllQuestions } from './action/question';
import { fetchAllUsers } from './action/users';

function App() {

  const dispatch = useDispatch();
  const determineBackgroundColor = () => {
    const currentHour = new Date().getHours();
    const isDaytime = currentHour >= 6 && currentHour < 18;
    //new Date().getHours();
    return isDaytime ? '#ffffff' : '#121212';
  };

  useEffect(() => {
    const body = document.body;
    const backgroundColor = determineBackgroundColor();
    body.style.backgroundColor = backgroundColor;
    body.style.color = backgroundColor === '#121212' ? '#800000' : '#000000';
  }, []);
  //#A52A2A

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers())
  }, [dispatch]);

  return (
    <div >
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
