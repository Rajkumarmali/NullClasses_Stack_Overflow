import React, { useEffect, useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import './PublicSpace.css'
import { Link } from 'react-router-dom';
const PublicSpace = () => {

    const [publicSpace, setPublicSpace] = useState();

    const fetchPublic = async () => {
        const response = await fetch('http://localhost:3001/publicSpace/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json();
        //console.log(result)
        setPublicSpace(result?.data);
        console.log(publicSpace)
    }

    useEffect(() => {
        fetchPublic();
    }, [])

    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2">
                <div className='addPost-btn'>
                    <Link to='/addPublic' className='button-link'>Add Your Post</Link>
                    <hr />
                </div>

                <div>
                    <div className="con">
                        {publicSpace && publicSpace.length > 0 ? (
                            publicSpace.map((post, index) => (
                                <div key={index} >
                                    <div className="content">
                                        <h3 className="lead mb-3">{post.content}</h3>
                                        {post.type === 'photo' && (
                                            <img
                                                src={post.media}
                                                alt=''
                                                className="imag"
                                            />
                                        )}
                                        {post.type === 'video' && (
                                            <div >
                                                <iframe
                                                    title=" "
                                                    className="embed-responsive-item"
                                                    src={`https://www.youtube.com/embed/${post.media.split('v=')[1]}`}
                                                    frameBorder="0"
                                                    style={{ width: '100%', height: '400px' }}
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        )}
                                        {post.type === 'text' && <p className="lead mb-3">{post.media}</p>}

                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>Loading.....</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicSpace;
