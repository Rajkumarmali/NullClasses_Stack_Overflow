import React, { useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { useNavigate } from 'react-router-dom';

const AddTextEditor = () => {
    const [editor, setEditor] = useState('');
    const [code, setCode] = useState('');
    const [video, setVideo] = useState('');

    const navigate = useNavigate();

    const handleText = async (e) => {
        e.preventDefault();
        // console.log(editor)
        // console.log(code)
        // console.log(video)
        if (!editor || !code || !video) {
            alert('please fill all field')
        } else {
            try {
                const response = await fetch('http://localhost:3001/textEditor/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ editor, code, video }),
                });
                if (response.ok) {
                    setEditor('');
                    setCode('');
                    setVideo('');
                    navigate('/textEditor')
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-1">
                <div >
                    <form className="addText-form" onSubmit={handleText}>
                        <div className='form-wrapper'>
                            <div>
                                <label htmlFor="editorContent">Question</label>
                                <input className='input1' type="text" value={editor} placeholder="Question" onChange={(e) => setEditor(e.target.value)} />
                            </div>

                            <div >
                                <label htmlFor="codeInput">Enter Code</label>
                                <textarea className='input1' rows={3} value={code} placeholder="Enter Code" onChange={(e) => setCode(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="videoInput">Enter Video URL</label>
                                <input className='input1' type="text" value={video} placeholder="Enter Video URL" onChange={(e) => setVideo(e.target.value)} />
                            </div>

                            <button className='button1' type="submit">Submit Question</button>
                        </div>
                    </form>

                    {code && (
                        <div className="mt-3">
                            <h4 >Entered Code for Evaluation:</h4>
                            <pre>{code}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddTextEditor;
