import './App.css';
import Footer from './components/Footer/Footer';
import AllRoutes from './Routes/AllRoutes';
import { Navbar } from "./Navbar/Navbar";
import GoogleButton from './components/Login/google';
import {  HostProvider } from "./components/Login/HostProvider";
function App() {
  return (
    <div className="App">
      <Navbar />
      <HostProvider>
      <AllRoutes />
      </HostProvider>
      <br />
      <Footer />
      <GoogleButton />
    </div>
  );
}
export default App;

