import React, { useEffect, useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar'
import Avatar from '../../components/Avatar/Avatar'
import moment from "moment";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import './UserProfile.css'
const UserProfile = () => {

    const { id } = useParams();
    //console.log(id)
    const users = useSelector((state) => state.usersReducer);
    const currentProfile = users.filter((user) => user._id === id)[0];
    //console.log(currentProfile)
    const [questionNumber, setQuestionNumebr] = useState(0);
    const [answerNumber, setAnswerNumber] = useState();

    const currentUser = useSelector((state) => state.currentUserReducer);

    const [Switch, setSwitch] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:3001/question/user-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: id }),
                });
                const data = await response.json();
                setQuestionNumebr(data?.length)
                //console.log(questionNumber)
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [id]);

    useEffect(() => {
        const fetchAnswer = async () => {
            try {
                const response = await fetch('http://localhost:3001/answer/user-answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: id }),
                });
                const data = await response.json();
                setAnswerNumber(data?.length)
                // console.log(answerNumber)
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchAnswer();
    }, []);


    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px" >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p>
                                    <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                                    {moment(currentProfile?.joinedOn).fromNow()}
                                </p>
                            </div>
                        </div>
                        {currentUser?.result._id === id && (
                            <button type="button" className="edit-profile-btn" onClick={() => setSwitch(true)}>
                                <FontAwesomeIcon icon={faPen} /> Edit Profile
                            </button>
                        )}
                    </div>
                    <div className='badge-container'>
                        {currentUser?.result._id === id && (
                            <Link className='login-btn' to='/loginInfo'>Login History</Link>
                        )}
                        <h4>Total Points :{(questionNumber || answerNumber) ? (questionNumber * 5) + answerNumber * 10 : "0"}</h4>
                        <h4>Total Badge : {Math.floor((questionNumber * 5 + answerNumber * 10) / 20)}</h4>

                    </div>
                    <>
                        {Switch ? (
                            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                        ) : (
                            <ProfileBio currentProfile={currentProfile} />
                        )}
                    </>
                </section>
                <hr />
                <div className='badge-con'>
                    {(() => {
                        const values = [];
                        for (let i = 20; i <= (questionNumber * 5 + answerNumber * 10); i += 20) {
                            values.push(i);
                        }
                        return values.map((value, index) => (
                            <div className='badge-img'>
                                <img src='data:image/jpeg;base64,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' alt='' />
                            </div>
                        ));
                    })()}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
