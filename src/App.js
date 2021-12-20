import React, { useState } from 'react';
import './styles/styles.css';
import Dashboard from './components/Dashboard';
import Logs from './components/Logs/Logs';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const store = configureStore();

function App() {
  const [logs, setLogs] = useState([]);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard logs={logs} setLogs={setLogs} />} />
            <Route path="/logs" element={<Logs logs={logs} />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
