import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
function ProfileButton({ user }) {
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
    };

    const ulClassName = "profile-dropdown float-menu" + (showMenu ? "" : " hidden");
    // <i className="fas fa-user-circle" />
    return (
        <div id="box">
            
                <button className="profileBut" onClick={openMenu}>
                    <i className="fa-solid fa-bars" />{" "}
                    <i className="fas fa-user-circle" />
                </button>
           
            <div className={ulClassName} ref={ulRef}>
                {user ? (user.username === 'Demo-lition' ? (
                    <>
                        <li>Demo User</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                        <NavLink style={{ textDecoration: 'none' }} to={'/spots/current'} > <h4>Manage Spots</h4></NavLink>
                    </>
                ) : (
                    <>
                        <div>  <h4>{user.username}</h4></div>
                        <div><h4>Hello {user.firstName} {user.lastName}</h4></div>
                        <div>    <h4>{user.email}</h4> </div>
                        <NavLink style={{ textDecoration: 'none' }} to={'/spots/current'} >  <h4>Manage Spots</h4></NavLink>
                        <button onClick={logout}>Log Out</button>

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