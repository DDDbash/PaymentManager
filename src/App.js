import React, { useState } from 'react';
import './styles/styles.css';
import Dashboard from './components/Dashboard';
import Logs from './components/Logs';
import Navbar from './components/Navbar';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const store = configureStore();

function App() {
  const [logs, setLogs] = useState([]);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard logs={logs} setLogs={setLogs} />} />
          <Route path="/logs" element={<Logs logs={logs} />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
