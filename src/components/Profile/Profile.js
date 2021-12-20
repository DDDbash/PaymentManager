import React, { useContext } from 'react'
import { AppContext } from '../../ProtectedRoutes';

const Profile = () => {
    const { isAuth } = useContext(AppContext);

    return (
        <table className='profile-table'>
            <thead>
            </thead>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{isAuth.result?.name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{isAuth.result?.email}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Profile
