import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";
import Writing from "./pages/Writing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/writing" element={<Writing />} />
      </Routes>
    </Router>
  );
}

export default App;
