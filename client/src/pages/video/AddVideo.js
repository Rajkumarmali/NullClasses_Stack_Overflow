import React, { useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { useNavigate } from 'react-router-dom';
import './Video.css'
const AddVideo = () => {
    const [video, setVideo] = useState();
    const navigate = useNavigate()

    const handleVideo = async (e) => {
        e.preventDefault();
        // console.log(video)
        if (!video) {
            alert('please fill all field')
        } else {
            try {
                const response = await fetch('http://localhost:3001/video/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ video })
                });
                if (response.ok) {
                    //window.location.reload();
                    navigate('/videoPlayer')
                }
            } catch (err) {
                console.log(err)
            }
        }

    }

    return (
        <div className='home-container-1'>
            <LeftSIdeBar />
            <div className="home-container-2">
                <div >
                    <div className="form-wrapper">
                        <form className='video-form' onSubmit={handleVideo}>
                            <div className="form-group">
                                <input className='input2' type='text' value={video} placeholder='Enter your video url' onChange={(e) => setVideo(e.target.value)} />
                            </div>
                            <button className='button1' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVideo;
