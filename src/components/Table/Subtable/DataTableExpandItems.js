import React from 'react'

export const DataTableExpandItems = ({ aid, date, user_activity, detail }) => {
    return (
        <tr key={aid}
            className="activity">
            <td>{date}</td>
            <td colSpan="2">{user_activity}</td>
            <td colSpan="3">{detail}</td>
        </tr>
    )
}
