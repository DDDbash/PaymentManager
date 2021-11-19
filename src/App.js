import React, { useState } from 'react';
import './styles/styles.css';
import Navbar from './components/Navbar';
import SubNav from './components/SubNav';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  const [refresh, setRefresh] = useState(false)
  return (
    <Provider store={store}>
      <Navbar />
      <main>
        <SubNav refresh={refresh} />
        <Filters />
        <DataTable refresh={refresh} setRefresh={setRefresh} />
      </main>
    </Provider>
  )
}

export default App;
