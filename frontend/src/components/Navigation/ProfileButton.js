import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown sonMenu" + (showMenu ? "" : " hidden");
    // <i className="fas fa-user-circle" />
    return (
        <div id="box">
            
                <button className="profileBut" onClick={openMenu}>
                    <i className="fa-solid fa-bars" />{" "}
                    <i className="fas fa-user-circle" />
                </button>
           
            <div style={{width:'195px', border:'1px solid'}} className={ulClassName} ref={ulRef}>
                {user ? (user.username === 'Demo-lition' ? (
                    <>
                        <p>Demo User</p>
                        <p className="forManage"> <NavLink style={{ textDecoration: 'none' }} to={'/users/current'} >My profile</NavLink></p>
                        <button className="logOutBut" onClick={logout}>Log Out</button>
                       
                    
                    </>
                ) : (
                    <>
                        
                        <p>Hello, {user.firstName}</p>
                        <p>{user.email}</p>
                        <p className="forManage"><NavLink style={{ textDecoration: 'none' }} to={'/users/current'} > My profile</NavLink></p>
                        <button className="logOutBut" onClick={logout}>Log Out</button>

                    </>
                )
                ) : (
                    <>
                        <div>
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                        <div>
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileButton;