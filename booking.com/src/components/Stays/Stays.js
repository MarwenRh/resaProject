
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSuggestions} from "../../actions/suggestionAction";
import {HomeGuestsDiv} from "./PageSections/HomeGuests/HomeGuestsDiv"
import {MiddleSection} from "./PageSections/middleSection/MiddleSection"
import {NextTrip} from "./PageSections/NextTripDiv/NextTrip";
import Degination from "./PageSections/Degination";
import FirstSection from "./PageSections/FirstSection";
import SecondSection from "./PageSections/SecondSection";
import './Stays.css';
import ExploreSection from "./place";
import { CountSection } from "./PageSections/countSection";
function Stays() {
    const dispatch = useDispatch();
    const suggestions = useSelector(state => state.suggestionsData.suggestions);

    useEffect(() => {
        if (suggestions.length === 0) {
            dispatch(getSuggestions())
        }
    }, [suggestions])


    return (<>
  	<div className="hero">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-lg-7">
					<div className="intro-wrap">
						<h1 className="mb-5"><span className="d-block">Let's Enjoy Your</span> Trip In <span className="typed-words"></span></h1>

						
					</div>
				</div>
				<div className="col-lg-5">
					<div className="slides">
						<img src="assets/images/hero-slider-1.jpg" alt="Image" className="img-fluid active"/>
						<img src="assets/images/hero-slider-2.jpg" alt="Image" className="img-fluid"/>
						<img src="assets/images/hero-slider-3.jpg" alt="Image" className="img-fluid"/>
						<img src="assets/images/hero-slider-4.jpg" alt="Image" className="img-fluid"/>
						<img src="assets/images/hero-slider-5.jpg" alt="Image" className="img-fluid"/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br></br>
<br></br>
<br></br>
  <div>
     
      <ExploreSection />
    </div>
           
            <MiddleSection />
           
            <HomeGuestsDiv />
          <CountSection/>
            <div>
            <Degination />
            </div>
        </>);
}

export default Stays;
