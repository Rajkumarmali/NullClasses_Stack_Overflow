import React from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import './Tag.css'
import TagList from './TagList.jsx';
import { tagsList } from './tagList';


const Tags = ({ slideIn, handleSlideIn }) => {

    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2">
                <h1 className="tags-h1">Tags</h1>
                <p className="tags-p">A tag is a keyword or label that categorizes your question with other,similar questions.</p>
                <p className="tags-p">Using the right tags makes it easier for others to find and answer your question. </p>
                <div className="tags-list-container">
                    {tagsList.map((tag, index) => (
                        <TagList tag={tag} key={index} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Tags;
