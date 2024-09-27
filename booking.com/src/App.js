import './App.css';
import Footer from './components/Footer/Footer';
import AllRoutes from './Routes/AllRoutes';
import { Navbar } from "./Navbar/Navbar";
import GoogleButton from './components/Login/google';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <br />
      <Footer />
      <GoogleButton />
    </div>
  );
}

export default App;

