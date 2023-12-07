import React from 'react';
import LeftSIdeBar from '../../components/leftSideBar/LeftSIdeBar';
import HomeMenuBar from '../../components/homeMenuBar/HomeMenuBar';
import RightSideBar from '../../components/rightSideBar/rightSideBar';
import QuestionDetail from './QuestionDetail';

const DisplayQuestion = () => {
    return (
        <div className="home-container-1">
            <LeftSIdeBar />
            <div className="home-container-2">
                <QuestionDetail />
                <RightSideBar />
            </div>

        </div>
    );
}

export default DisplayQuestion;
