import React from 'react';
import { Routes, Route } from "react-router-dom";
import Auth from './pages/home/auth/Auth';
import Home from './pages/home/Home';
import Questions from './pages/question/Questions';
import AskQuestion from './pages/askQuestion/AskQuestion'
import DisplayQuestion from './pages/question/DisplayQuestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/User/Users';
import UserProfile from './pages/UserProfile/UserProfile';
import Video from './pages/video/Video'
import AddVideo from './pages/video/AddVideo';
import LoginInfo from './pages/UserProfile/LoginInfo';
import PublicSpace from './pages/publicSpace.js/PublicSpace';
import AddPublicSpace from './pages/publicSpace.js/AddPublicSpace';
import TextEditor from './pages/textEditor/TextEditor';
import AddTextEditor from './pages/textEditor/AddTextEditor';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/Questions' element={<Questions />} />
            <Route path='/AskQuestion' element={<AskQuestion />} />
            <Route path='/Questions/:id' element={<DisplayQuestion />} />
            <Route path='/Tags' element={<Tags />} />
            <Route path='/Users' element={<Users />} />
            <Route path='/Users/:id' element={<UserProfile />} />
            <Route path='/videoPlayer' element={<Video />} />
            <Route path='/addVideo' element={<AddVideo />} />
            <Route path='/loginInfo/:currentUserInfo' element={<LoginInfo />} />

            <Route path='/publicSpace' element={<PublicSpace />} />
            <Route path='/addPublic' element={<AddPublicSpace />} />
            <Route path='/textEditor' element={<TextEditor />} />
            <Route path='/addTextEditor' element={<AddTextEditor />} />
        </Routes>
    );
}

export default AllRoutes;
