import React from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar'
import UsersList from './UsersList';
import './User.css'
const Users = () => {
    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2" style={{ marginTop: "30px" }}>
                <h1 style={{ fontWeight: "400" }}>Users</h1>
                <UsersList />
            </div>
        </div>
    );
}

export default Users;
