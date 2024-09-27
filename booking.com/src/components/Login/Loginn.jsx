import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import "./styleLogin.css";
import { initializeFormToggle } from "./formToggle";
import axios from 'axios';

const Login = () => {
  useEffect(() => {
    initializeFormToggle();
  }, []);
  const handleGoogleLogin = () => {
    // Ouvre une fenêtre popup pour l'authentification Google
    const popup = window.open(
      'http://localhost:3000/auth/google', // URL vers votre backend pour l'auth Google
      'Google Login',
      'width=500,height=600'
    );

    // Écoute les messages envoyés par la fenêtre popup
    window.addEventListener('message', (event) => {
      // Vérifiez que le message provient bien de votre domaine backend
      if (event.origin !== 'http://localhost:3000') return;

      const token = event.data; // Récupération du token JWT
      if (token) {
        // Stocker le token dans localStorage
        localStorage.setItem('jwt', token);
        window.location.reload();
        // La fenêtre contextuelle sera fermée automatiquement par le backend
        console.log('Token JWT reçu et stocké :', token);
      }
    });
  };
  const handleFacebookLogin = () => {
    // Ouvre une fenêtre popup pour l'authentification Facebook
    const popup = window.open(
      'http://localhost:3000/auth/facebook/callback', // URL vers votre backend NestJS pour Facebook
      'Facebook Login',
      'width=500,height=600'
    );
  
    // Écoute les messages envoyés par la fenêtre popup
    window.addEventListener('message', (event) => {
      // Vérifiez que le message provient de votre domaine backend
      if (event.origin !== 'http://localhost:3000') return;
  
      const token = event.data; // Récupération du token JWT
      if (token) {
        // Stocker le token dans localStorage
        localStorage.setItem('jwt', token);
        window.location.reload();
        // Faites autre chose avec le token, comme rediriger l'utilisateur ou afficher un message
        console.log('Token JWT reçu et stocké :', token);
      }
    });
  };
  
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Log in and get the JWT token
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      
      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token); // Save JWT token
        console.log('Login successful');
        window.location.reload();
        // Set the Authorization header for subsequent requests
        const token = response.data.access_token;
        const headers = { Authorization: `Bearer ${token}` };
  
      try {
          // Step 2: Fetch host details by email
          const hostResponse = await axios.get(`http://localhost:3000/hosts/api/getByEmail/${username}`, { headers });
          const hostData = hostResponse.data;
          const hostsID = hostData._id; // Extract hostsID from response
          console.log(hostData);
          console.log(hostsID);
          try {
            // Step 3: Fetch properties by hostsID
            const propertyResponse = await axios.get(`http://localhost:3000/properties/api/getByHostsID/${hostsID}`, { headers });
            const propertyData = propertyResponse.data;
            const propertyID = propertyResponse.data._id; // Extract propertyID from response
            const propertyVille = propertyResponse.data.location.city; // Extract propertyID from response
            console.log(propertyData);
            console.log(propertyID);
            history.push(`/search/${propertyVille}/${propertyID}`);
           
          } catch (propertyError) {
            console.error('Error fetching properties:', propertyError);
          }
      } catch (hostError) {
          console.error('Error fetching hosts:', hostError);
      }
      } else {
        console.log('Login failed');
      }
    } catch (loginError) {
      console.error('There was an error logging in!', loginError);
    }
  };
  

  return (
    <section className="SignUp">
      <div className="containerSignUp" id="containerSignUp">
        <div className="form-containerSignUp sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
            <a href="#" className="icon"><i onClick={handleGoogleLogin} className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i onClick={handleFacebookLogin} className="fa-brands fa-facebook-f"></i></a> 
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your username for registration</span>
            <input type="text" placeholder="Name" />
            <input type="username" placeholder="username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-containerSignUp sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="social-icons">
            <a href="#" className="icon"><i onClick={handleGoogleLogin} className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i onClick={handleFacebookLogin} className="fa-brands fa-facebook-f"></i></a>
              
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your username password</span>
            <input type="username" placeholder="username"
              value={username}
              onChange={(e) => setusername(e.target.value)} />
            <input type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-containerSignUp">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

export const Logout = () => {
  const logoutres = () => {
    console.log("logout");
  };

  return (
    <div>
      <GoogleLogout
        className={styles.logout}
        clientId="378817930652-26drd8dhlmr4qet0ilu2qts92m12mpdr.apps.googleusercontent.com"
        buttonText=""
        onLogoutSuccess={logoutres}
      >
        <p style={{ marginBottom: "8px", marginRight: "10px" }} className={styles.logoutText}>logout</p>
      </GoogleLogout>
    </div>
  );
};
