import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { useNavigate } from 'react-router-dom';
import './Video.css'
import { useSelector } from 'react-redux';

const AddVideo = () => {
    const [video, setVideo] = useState('');
    const navigate = useNavigate();
    const User = useSelector((state) => state.currentUserReducer);

    const handleVideo = async (e) => {
        e.preventDefault();

        if (User === null) {
            alert('Login or Signup to post a question');
            navigate('/Auth');
        } else if (!video) {
            alert('Please fill all fields');
        } else {
            try {
                const response = await fetch('https://nullclasses-stack-overflow.onrender.com/video/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ video })
                });

                if (response.ok) {
                    navigate('/videoPlayer');
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div className='home-container-1'>
            <LeftSIdeBar />
            <div className="home-container-2">
                <div>
                    <div className="form-wrapper">
                        <form className='video-form' onSubmit={handleVideo}>
                            <div className="form-group">
                                <input
                                    className='input2'
                                    type='text'
                                    value={video}
                                    placeholder='Enter your video URL'
                                    onChange={(e) => setVideo(e.target.value)}
                                />
                            </div>
                            <button className='button1' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
                {video && (
                    <div className="video-player-wrapper">
                        <ReactPlayer
                            url={video}
                            width='100%'
                            height='100%'
                            controls
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddVideo;
