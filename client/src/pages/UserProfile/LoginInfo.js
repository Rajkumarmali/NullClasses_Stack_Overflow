import React, { useEffect, useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const LoginInfo = () => {
    const userData = localStorage.getItem('Profile');
    const profileData = JSON.parse(userData);
    // const username = profileData.result.name;

    const { currentUserInfo } = useParams();
    //  console.log(currentUserInfo);

    const [loginHistory, setLoginHistory] = useState([]);
    const [sortedLoginHistory, setSortedLoginHistory] = useState([]);

    const fetchLoginHis = async () => {
        const response = await fetch('https://nullclasses-stack-overflow.onrender.com/user/loginHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: currentUserInfo }),
        });
        const data = await response.json();
        // console.log(data)
        setLoginHistory(data?.loginHistory);
    };

    const sortLoginHistory = () => {
        const sortedData = [...loginHistory].sort((a, b) =>
            moment(b.timeStemp).valueOf() - moment(a.timeStemp).valueOf()
        );
        setSortedLoginHistory(sortedData);
    };

    useEffect(() => {
        fetchLoginHis();
    }, []);

    useEffect(() => {
        sortLoginHistory();
    }, [loginHistory]);

    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2">
                <table className="login-table">
                    <thead className="login-thead">
                        <tr>
                            <th className="login-th">Username</th>
                            <th className="login-th">Browser</th>
                            <th className="login-th">IP Address</th>
                            <th className="login-th">Device Type</th>
                            <th className="login-th">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLoginHistory.length !== 0 ? (
                            sortedLoginHistory.map((data) => (
                                <tr key={data._id}>
                                    <td className="login-td">{data.username}</td>
                                    <td className="login-td">{data.browser}</td>
                                    <td className="login-td">{data.ipAddress}</td>
                                    <td className="login-td">{data.deviceType}</td>
                                    <td className="login-td">
                                        {moment(data.timeStemp).format('DD/MM/YYYY hh:mm A')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="login-td">
                                    Loading...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoginInfo;
