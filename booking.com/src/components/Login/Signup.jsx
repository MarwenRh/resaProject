import React, { useEffect ,useState} from "react";
import "./styleLogin.css";
import { initializeFormToggle2 } from "./formToggle2";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

import axios from 'axios';

const SignUp = () => {
  useEffect(() => {
    initializeFormToggle2();
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email,
        password,
      });
  
      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token); // Save JWT token
        console.log('signup successful');
    
      } 
    } catch (loginError) {
      console.error('There was an error sign  up!', loginError);
    }
  };
 
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
  
        // Faites autre chose avec le token, comme rediriger l'utilisateur ou afficher un message
        console.log('Token JWT reçu et stocké :', token);
      }
    });
  };
  
  const [profile, setProfile] = useState(null);
  return (
    <section className="sign-up-section">
      <div className="sign-up-container active" id="sign-up-container">
        <div className="form-container sign-up-form">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i onClick={handleGoogleLogin} className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i onClick={handleFacebookLogin} className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="email" placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password"   
            value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-form hidden">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
            <a href="#" className="icon"><i onClick={handleGoogleLogin} className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i onClick={handleFacebookLogin} className="fa-brands fa-facebook-f"></i></a>
              
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"   
           
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button id="register" >Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
