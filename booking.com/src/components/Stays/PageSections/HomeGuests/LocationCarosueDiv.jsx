import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { CarouselDiv } from "./CarosueDiv";



export const LocationCarosueDiv = () => {
  const history = useHistory();

 

  const handleNavigation = (destination, articles) => {
    history.push(`/searchPlace/${destination}`, { articles, destination });
  };

 

  return (
    <div className="untree_co-section">
		<div className="container">
			<div className="row justify-content-center text-center mb-5">
				<div className="col-lg-6">
					<h2 className="section-title text-center mb-3">Special Offers &amp; Discounts</h2>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
				</div>
			</div>
			<div className="row">
				<div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
					<div className="media-1">
						<a href="#" className="d-block mb-3"><img src="assets/images/hero-slider-1.jpg" alt="Image" className="img-fluid"/></a>
						<span className="d-flex align-items-center loc mb-2">
							<span className="icon-room mr-3"></span>
							<span>Italy</span>
						</span>
						<div className="d-flex align-items-center">
							<div>
								<h3><a href="#">Rialto Mountains</a></h3>
								<div className="price ml-auto">
									<span>$520.00</span>
								</div>
							</div>
							
						</div>
						
					</div>
				</div>
				<div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
					<div className="media-1">
						<a href="#" className="d-block mb-3"><img src="assets/images/hero-slider-2.jpg" alt="Image" className="img-fluid"/></a>
						<span className="d-flex align-items-center loc mb-2">
							<span className="icon-room mr-3"></span>
							<span>United States</span>
						</span>
						<div className="d-flex align-items-center">
							<div>
								<h3><a href="#">San Francisco</a></h3>
								<div className="price ml-auto">
									<span>$520.00</span>
								</div>
							</div>
							
						</div>
						
					</div>
				</div>
				<div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
					<div className="media-1">
						<a href="#" className="d-block mb-3"><img src="assets/images/hero-slider-3.jpg" alt="Image" className="img-fluid"/></a>
						<span className="d-flex align-items-center loc mb-2">
							<span className="icon-room mr-3"></span>
							<span>Malaysia</span>
						</span>
						<div className="d-flex align-items-center">
							<div>
								<h3><a href="#">Perhentian Islands</a></h3>
								<div className="price ml-auto">
									<span>$750.00</span>
								</div>
							</div>
							
						</div>
						
					</div>
				</div>
				<div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
					<div className="media-1">
						<a href="#" className="d-block mb-3"><img src="assets/images/hero-slider-4.jpg" alt="Image" className="img-fluid"/></a>

						<span className="d-flex align-items-center loc mb-2">
							<span className="icon-room mr-3"></span>
							<span>Switzerland</span>
						</span>

						<div className="d-flex align-items-center">
							<div>
								<h3><a href="#">Lake Thun</a></h3>
								<div className="price ml-auto">
									<span>$520.00</span>
								</div>
							</div>
							
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
  );
};
