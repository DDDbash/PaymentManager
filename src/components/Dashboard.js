import React, { useState } from 'react'
import SubNav from './SubNav';
import Filters from './Filters';
import DataTable from './DataTable';

const Dashboard = ({ logs, setLogs }) => {
    const [refresh, setRefresh] = useState(false)
    return (
        <main>
            <SubNav refresh={refresh} />
            <Filters />
            <DataTable refresh={refresh} setRefresh={setRefresh} logs={logs} setLogs={setLogs} />
        </main>
    )
}

export default Dashboard;
