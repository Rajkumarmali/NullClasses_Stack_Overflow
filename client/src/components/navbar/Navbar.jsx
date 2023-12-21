import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg'
import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from "../../action/currentUser";
import "./Navbar.css";

const Navbar = ({ handleSlideIn }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Use state to track window width
    var User = useSelector((state) => state.currentUserReducer);

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        dispatch(setCurrentUser(null));
    }

    useEffect(() => {
        const token = User?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogOut();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));

        // Add event listener to update window width
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [User?.token, dispatch]);

    const dropdownMenu = () => {
        const x = document.getElementById("dropdownClick");
        if (x.className === "navbar") {
            x.className += "responsive";
        } else {
            x.className = "navbar";
        }
    }

    return (
        <nav className="main-nav">
            <div className='navbar' id="dropdownClick">
                <Link to="/" className='nav-item nav-btn'>
                    <img src={logo} alt='logl' />
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type='text' placeholder='search' />
                    <img src={search} alt='search' width="18" className="search-icon" />
                </form>
                {User === null ?
                    <Link to="/Auth" className='nav-item nav-links'>Log in</Link> :
                    <>
                        <Avatar backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color="white" >
                            <Link to={`/Users/${User?.result?._id}`} style={{ color: 'white', textDecoration: "none" }}>{User.result.name.charAt(0).toUpperCase()}</Link>
                        </Avatar>
                        <button className='nav-item nav-links' onClick={handleLogOut}>Log out</button>
                    </>
                }
                {windowWidth < 1024 && (
                    <Link className='dropdownIcone' onClick={dropdownMenu}>&#9776;</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
