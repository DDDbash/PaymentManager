import React from 'react'

const Logs = ({ logs }) => {
    function displayLogs() {
        return logs.map((log) => <p key={log}>{log}</p>)
    }

    return (
        <div>
            {logs.length === 0 ? 'No Logs' : displayLogs()}
        </div>
    )
}

export default Logs;
