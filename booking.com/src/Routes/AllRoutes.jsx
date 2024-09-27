import { Route, Switch } from "react-router-dom";
import CarAvailable from "../components/CarRentalsPage/CarAvailable";
import CarPayment from "../components/CarRentalsPage/carPayment";
import CarRentals from "../components/CarRentalsPage/CarRentals";
import CarSearch from "../components/CarRentalsPage/CarSearch";
import AttractionIndex from '../components/Attractions/AttractionIndex'
import ListLanding from "../components/Attractions/pages_and_layouts/attractionPlaceListpage/ListLanding";
import ViewPlaceLanding from "../components/Attractions/pages_and_layouts/viewPlace/ViewPlaceLanding";
import Login from "../components/Login/Loginn";
import Home from "../components/Home";
import {SearchPage} from "../components/Stays/SearchPage/SearchPage";
import {SearchAll} from "../components/Stays/SearchPage/searchAll";
import {SearchPage2} from "../components/Stays/SearchPage/SearchPage copy";
import VarifyUser from "../components/Attractions/pages_and_layouts/varifyUserDeatils/VarifyUser";
import Checkout from "../components/Attractions/pages_and_layouts/checkout/CheckOut";
import {ExplorePlaces} from "../components/Stays/SearchPage/ExplorePlaces";
import ArticlePage from "../components/Stays/SearchPage/ArticlePage";
import Article from "../components/Stays/SearchPage/Article";
import  Index  from "../pages/index";
import { Hebergement } from "../components/Stays/SearchPage/Hebergement";
import SignUp from "../components/Login/Signup";
import AddProperty from "../components/Login/AddProperty";
import { Details } from "../components/Stays/HotelDetails/details";
import { Hosts } from "../components/Hosts/Hosts";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";



export default function AllRoutes(){
    return(
        <>
          <Switch>
          <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
            <Route exact path="/">
            <Home/>
            </Route>

            <PublicRoute exact path="/login">
              <Login />
            </PublicRoute>
            <PublicRoute exact path="/signUp">
              <SignUp />
            </PublicRoute>
            <Route exact path="/addProperty">
              <AddProperty />
            </Route>
            <Route exact path="/Hosts">
              <Hosts/>
            </Route>
            <Route exact path="/carrentals">
                <CarRentals/>
            </Route>
            <Route exact path="/car-available">
                <CarAvailable/>
            </Route>
            <Route exact path="/car-available/:id">
                <CarPayment/>
            </Route>
            <PublicRoute exact path="/carrentals/:id">
              <CarSearch/>
          </PublicRoute>
          <PublicRoute exact path="/attractions/:country">
             <ListLanding/>
            </PublicRoute>
            <PublicRoute exact path="/attractions/:country/:id">
             <ViewPlaceLanding/>
          </PublicRoute>
          <PublicRoute exact path="/attractions">
             <AttractionIndex/>
            </PublicRoute>
              <Route exact path="/search">
                 <SearchAll/>
              </Route>
              <Route exact path="/search/:ville">
                  <SearchPage/>
              </Route>
              <Route exact path="/searchType">
                  <Hebergement/>
              </Route>
              <Route exact path="/add">
                  <SearchPage2/>
              </Route>
              <Route exact path="/searchPlace/:name">
                  <ExplorePlaces/>
              </Route>

              <PublicRoute path="/article"  ><ArticlePage/> </PublicRoute>
          <PublicRoute path="/articlePage" ><Article/>  </PublicRoute>
            
        <Route path="/search/:ville/:id"><Details/></Route>
         
          <PublicRoute exact path="/varifyPurchase/:id">
                  <VarifyUser/>
          </PublicRoute>
          <PublicRoute exact path="/checkout/:id">
           <Checkout/>
          </PublicRoute>

          </Switch>
        </>
    )
}
