import React, { useState } from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import { useNavigate } from 'react-router-dom';

const AddPublicSpace = () => {

    const [content, setContent] = useState()
    const [media, setMedia] = useState()
    const [type, setType] = useState();
    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //  console.log(content)
        //  console.log(media)
        // console.log(type)
        if (!content || !media || !type) {
            alert('please fill all field')
        } else {
            try {
                const response = await fetch('http://localhost:3001/publicSpace/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content, media, type })
                });
                if (response.ok) {

                    //window.location.reload();
                    navigation('/publicSpace')
                }

            } catch (err) {
                console.log(err);
            }
        }


    }

    const handleType = (e) => {
        setType(e.target.value);
    }

    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-1">
                <div className="form-wrapper1">
                    <form className='pub-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <select className='select1' value={type} onChange={handleType} >
                                <option>Select a Type</option>
                                <option value="text" >Text</option>
                                <option value="video" >Video</option>
                                <option value="photo">Photo</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <textarea className='textarea1' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Write your post '></textarea>
                        </div>
                        <div className='form-group'>
                            <input className="input1" type="text" value={media} onChange={(e) => setMedia(e.target.value)} placeholder="Enter Text image/video link" />
                        </div>

                        <button type='submit' className='button1'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPublicSpace;
