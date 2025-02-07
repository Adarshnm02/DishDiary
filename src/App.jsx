import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DishDetails from './pages/DishDetails';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path='/explore' element={<Explore />}/>
        <Route path="/dish/:id" element={<DishDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
