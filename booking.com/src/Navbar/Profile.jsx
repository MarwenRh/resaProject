import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Use useHistory for v5
import {jwtDecode} from 'jwt-decode'; // Named import
import styles from "./Profile.module.css";
import { Logout } from "../components/Login/Loginn";
import ProfileDropdown from '../components/Login/ProfileDropdown';

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("jwt") || localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                console.log(decoded);
            } catch (error) {
                console.error('Token decoding failed:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

   
    return (
        <div>
            <div className={styles.profile} onClick={() => setIsLogoutVisible(!isLogoutVisible)}>
               <div>
               <h4 style={{ marginTop: '20px',marginRight: '20px' }}>{user?.username || user?.email || 'User'}</h4> {/* Handle null user */}
            </div> 
             <div>
                 <ProfileDropdown/>
             </div>
                
            </div>
          
        </div>
    );
};
