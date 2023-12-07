import { useEffect, useRef, useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { Link } from 'react-router-dom';
import './Video.css'

const Video = () => {

    const [videos, setVideos] = useState([]);
    const touchStartTime = useRef(0);
    const videoRef = useRef(null);

    const fetchVideos = async () => {
        try {
            const response = await fetch('http://localhost:3001/video/get', {
                method: 'POST',
                headers: {},
            });
            const result = await response.json();
            setVideos(result?.data);
            //console.log(videos)
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
            const videoElement = videoRef.current;

            if (videoElement) {
                const rect = videoElement.getBoundingClientRect();
                const touchX = event.touches[0].clientX - rect.left;

                const videoWidth = rect.width;

                if (touchX < videoWidth / 4) {
                    videoElement.currentTime -= 10;
                } else if (touchX > (3 * videoWidth) / 4) {
                    videoElement.currentTime += 10;
                } else {
                    if (videoElement.paused) {
                        videoElement.play();
                    } else {
                        videoElement.pause();
                    }
                }
            }
        }

        touchStartTime.current = now;
    };


    return (
        <div className='home-container-1'>
            <LeftSIdeBar />
            <div className="home-container-2">
                <div>
                    <div className='addVideo-btn'>
                        <Link to='/addVideo' className='button-link'>
                            Add Your Video
                        </Link>
                        <hr />
                    </div>

                    <div className='video_con'>
                        {videos.length !== 0 ? (videos.map((data, index) => (
                            <div key={index}>
                                <div className='video'>
                                    <iframe
                                        ref={videoRef}
                                        title={`Video ${index}`}
                                        width="760"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${data.video.split('v=')[1]}`}
                                        frameBorder="0"
                                        allowFullScreen
                                        onTouchStart={handleTouchStart}
                                    ></iframe>
                                </div>
                            </div>
                        ))) : (
                            <h1>Loading...</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
