import React, { useEffect, useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import './TextEditor.css'
import { Link } from 'react-router-dom';
const TextEditor = () => {

    const [textEditor, setTextEditor] = useState();
    const fetchText = async () => {
        try {
            const response = await fetch('https://nullclasses-stack-overflow.onrender.com/textEditor/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            setTextEditor(result?.data);
            // console.log(textEditor)
        } catch (error) {
            console.error('Error fetching text editor data:', error);
        }
    };

    useEffect(() => {
        fetchText();
    }, []);


    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2">
                <div className='addtext-btn'>
                    <Link to="/addTextEditor" className='button-link'>Add Your Text</Link>
                    <hr />
                </div>

                <div className="container">
                    {textEditor ? (
                        textEditor.map((data, index) => (
                            <div key={index} className="card mb-4 border text-center">
                                <div className='content'>
                                    <h4>{data.editor}</h4>
                                    <iframe
                                        title=" "
                                        className="embed-responsive-item"
                                        src={`https://www.youtube.com/embed/${data.video.split('v=')[1]}`}
                                        frameBorder="0"
                                        style={{ width: '100%', height: '400px' }}
                                        allowFullScreen
                                    ></iframe>
                                    <div>
                                        <h4>Code</h4>
                                        <pre className="text-start" style={{ color: 'black' }}>{data.code}</pre>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TextEditor;
