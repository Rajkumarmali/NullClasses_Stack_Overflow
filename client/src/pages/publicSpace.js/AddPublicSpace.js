import React, { useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Filter from 'bad-words';

const AddPublicSpace = () => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState('');
    const [type, setType] = useState('');
    const navigation = useNavigate();

    const User = useSelector((state) => state.currentUserReducer);

    const filter = new Filter();

    const isContentValid = () => {
        // Check if the content contains any banned words using the bad-words library
        return !filter.isProfane(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (User === null) {
            alert('Login or Signup to post a question');
            navigation('/Auth');
        } else if (!content || !media || !type) {
            alert('Please fill all fields');
        } else if (!isContentValid()) {
            alert('Content contains abusive or hateful words. Please revise.');
        } else {
            try {
                const response = await fetch(
                    'https://nullclasses-stack-overflow.onrender.com/publicSpace/post',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ content, media, type }),
                    }
                );
                if (response.ok) {
                    navigation('/publicSpace');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleType = (e) => {
        setType(e.target.value);
    };

    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-1">
                <div className="form-wrapper1">
                    <form className="pub-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <select
                                className="select1"
                                value={type}
                                onChange={handleType}
                            >
                                <option>Select a Type</option>
                                <option value="text">Text</option>
                                <option value="video">Video</option>
                                <option value="photo">Photo</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea
                                className="textarea1"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your post "
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <input
                                className="input1"
                                type="text"
                                value={media}
                                onChange={(e) => setMedia(e.target.value)}
                                placeholder="Enter Text image/video link"
                            />
                        </div>
                        <button type="submit" className="button1">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPublicSpace;
