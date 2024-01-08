import { useEffect, useRef, useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { Link } from 'react-router-dom';
import './Video.css';
import ReactPlayer from 'react-player';

const Video = () => {
    const [videos, setVideos] = useState([]);
    const touchStartTime = useRef(0);
    const videoRef = useRef(null);

    const fetchVideos = async () => {
        try {
            const response = await fetch('https://nullclasses-stack-overflow.onrender.com/video/get', {
                method: 'POST',
                headers: {},
            });
            const result = await response.json();
            setVideos(result?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleTouchStart = (event) => {
        const now = Date.now();

        if (now - touchStartTime.current < 300) {
            handleDoubleTap();
        }

        touchStartTime.current = now;
    };

    const handleDoubleTap = () => {
        const videoElement = videoRef.current?.getInternalPlayer(); // Use optional chaining

        if (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        }
    };


    return (
        <div className='home-container-1'>
            <LeftSIdeBar />
            <div className="home-container-2">
                <div>
                    {/* <div className='addVideo-btn'>
                        <Link to='/addVideo' className='button-link'>
                            Add Your Video
                        </Link>
                        <hr />
                    </div> */}

                    <div className='video_con' onTouchStart={handleTouchStart}>
                        <ReactPlayer
                            ref={videoRef}
                            url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                            muted={true}
                            width="100%"
                            height="100%"
                            controls={true}
                        />
                    </div>

                    {/* <div className='video_con'>
                        {videos.length !== 0 ? (
                            videos.map((data, index) => (
                                <div key={index} className='video' onTouchStart={handleTouchStart}>
                                    <ReactPlayer
                                        ref={videoRef}
                                        url={data.video}
                                        muted={true}
                                        width="100%"
                                        height="100%"
                                        controls={true}
                                    />
                                </div>
                            ))
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Video;
