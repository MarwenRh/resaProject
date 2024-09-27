
import React from 'react';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import { Link } from 'react-router-dom';
function ArticlePage() {
    return ( 
    <div>
            <header className="mt-0 pt-0">
                <div className="row ml-0 mr-0">
                    <div className="col-md-6 pr-0">
                        <div className="card">
                            <img className="card-img" src={'/assets/images/left-img.jpg'} alt="" />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center flex-column">
                                <p>Spirituality</p>
                                <hr />
                                <h2>Free template designed by FreeHTML5.co</h2>
                                <Link to="/article" className="btn">READ MORE</Link>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-6 pl-0">
                        <div className="card">
                            <img className="card-img" src={'/assets/images/right-img.jpg'} alt="" />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center flex-column">
                                <p>DECOR</p>
                                <hr />
                                <h2>Sed ut perspiciatis unde omnis iste natus</h2>
                              
                                <Link to="/article" className="btn">READ MORE</Link>
                                     </div>
                        </div>
                    </div>
                    <div className="col-md-3 pr-0 first">
                        <div className="card">
                            <img className="card-img" src={'/assets/images/architecture.png'} alt="" />
                            <div className="card-img-overlay">
                                <h5>Architecture</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pl-0 pr-0">
                        <div className="card">
                            <img className="card-img" src={'/assets/images/interior.png'} alt="" />
                            <div className="card-img-overlay">
                                <h5>Interior</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pl-0 pr-0">
                        <div className="card">
                            <img className="card-img" src={'/assets/images/food.png'} alt="" />
                            <div className="card-img-overlay">
                                <h5>Food</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pl-0 last">
                        <div className="card">
                            <img className="card-img" src={'/assets/images/travel.png'} alt="" />
                            <div className="card-img-overlay">
                                <h5>Travel</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container-fluid video-player">
                <div className="container">
                    <div className="screen embed-responsive embed-responsive-16by9">
                        <iframe id="screen" src="https://www.youtube.com/embed/YE7VzlLtp-4" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </div>

                    <div className="play-list">
                        <div className="owl-carousel owl-carousel4 owl-theme">
                            <div>
                                <div className="card">
                                    <img className="card-img link-img" data-link="https://www.youtube.com/embed/ujPNSC4JllE" src={'/assets/images/play1.png'} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className="card">
                                    <img className="card-img link-img" data-link="https://www.youtube.com/embed/rMT8CffVFMk" src={'/assets/images/play2.png'} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className="card">
                                    <img className="card-img link-img" data-link="https://www.youtube.com/embed/bGC9f1Po6Q8" src={'/assets/images/play3.png'} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className="card">
                                    <img className="card-img link-img" data-link="https://www.youtube.com/embed/yHk_sypSiXU" src={'/assets/images/play4.png'} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className="card">
                                    <img className="card-img link-img" data-link="https://www.youtube.com/embed/7yoqm-kgKEk" src={'/assets/images/play5.png'} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="container-fluid fh5co-recent-news mt-5 pb-5">
                <h2 className="text-uppercase text-center">Recent News</h2>
                <hr className="mx-auto" />

                <div className="play-list mt-5 pt-4">
                    <div className="owl-carousel owl-carousel5 owl-theme">
                        <div>
                            <div className="card">
                                <img className="card-img link-img" src={'/assets/images/news6.png'} alt="" />
                                <div className="card-img-overlay">
                                    <div className="top-area"><a href="#" className="text-center d-block"><i className="far fa-heart"></i></a></div>
                                    <div className="bottom-area">
                                        <div className="row">
                                            <div className="col-5 pr-0 text-white">
                                                <a href="#" className="text-white"> <i className="fas fa-retweet"></i> Share</a>
                                            </div>
                                            <div className="col pl-0 text-right"><a href="#" className="text-white"> June 3, 2019 &nbsp; 6 <i className="far fa-comments"></i></a></div>
                                        </div>
                                        <h4 className="text-white mt-2">Xiaomi Hao Gertion Hones</h4>
                                        <p className="text-white">Jhone Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <img className="card-img link-img" src={'/assets/images/news2.png'} alt="" />
                                <div className="card-img-overlay">
                                    <div className="top-area"><a href="#" className="text-center d-block"><i className="far fa-heart"></i></a></div>
                                    <div className="bottom-area">
                                        <div className="row">
                                            <div className="col-5 pr-0 text-white">
                                                <a href="#" className="text-white"> <i className="fas fa-retweet"></i> Share</a>
                                            </div>
                                            <div className="col pl-0 text-right"><a href="#" className="text-white"> June 3, 2019 &nbsp; 6 <i className="far fa-comments"></i></a></div>
                                        </div>
                                        <h4 className="text-white mt-2">Xiaomi Hao Gertion Hones</h4>
                                        <p className="text-white">Jhone Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <img className="card-img link-img" src={'/assets/images/news3.png'} alt="" />
                                <div className="card-img-overlay">
                                    <div className="top-area"><a href="#" className="text-center d-block"><i className="far fa-heart"></i></a></div>
                                    <div className="bottom-area">
                                        <div className="row">
                                            <div className="col-5 pr-0 text-white">
                                                <a href="#" className="text-white"> <i className="fas fa-retweet"></i> Share</a>
                                            </div>
                                            <div className="col pl-0 text-right"><a href="#" className="text-white"> June 3, 2019 &nbsp; 6 <i className="far fa-comments"></i></a></div>
                                        </div>
                                        <h4 className="text-white mt-2">Xiaomi Hao Gertion Hones</h4>
                                        <p className="text-white">Jhone Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <img className="card-img link-img" src={'/assets/images/news4.png'} alt="" />
                                <div className="card-img-overlay">
                                    <div className="top-area"><a href="#" className="text-center d-block"><i className="far fa-heart"></i></a></div>
                                    <div className="bottom-area">
                                        <div className="row">
                                            <div className="col-5 pr-0 text-white">
                                                <a href="#" className="text-white"> <i className="fas fa-retweet"></i> Share</a>
                                            </div>
                                            <div className="col pl-0 text-right"><a href="#" className="text-white"> June 3, 2019 &nbsp; 6 <i className="far fa-comments"></i></a></div>
                                        </div>
                                        <h4 className="text-white mt-2">Xiaomi Hao Gertion Hones</h4>
                                        <p className="text-white">Jhone Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <img className="card-img link-img" src={'/assets/images/news5.png'} alt="" />
                                <div className="card-img-overlay">
                                    <div className="top-area"><a href="#" className="text-center d-block"><i className="far fa-heart"></i></a></div>
                                    <div className="bottom-area">
                                        <div className="row">
                                            <div className="col-5 pr-0 text-white">
                                                <a href="#" className="text-white"> <i className="fas fa-retweet"></i> Share</a>
                                            </div>
                                            <div className="col pl-0 text-right"><a href="#" className="text-white"> June 3, 2019 &nbsp; 6 <i className="far fa-comments"></i></a></div>
                                        </div>
                                        <h4 className="text-white mt-2">Xiaomi Hao Gertion Hones</h4>
                                        <p className="text-white">Jhone Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container-fluid px-0 bg-dark">
                    <div className="row m-0">
                        <div className="col-md-6 p-0">
                            <div className="newsletter">
                                <h2>Newsletter</h2>
                                <form action="#" className="row">
                                    <div className="col-md-10 pr-0">
                                        <input type="email" className="form-control" placeholder="Your Email Address" />
                                    </div>
                                    <div className="col-md-2 pl-1">
                                        <button type="submit" className="btn">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-uppercase">Categories</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">Interior</a></li>
                                <li><a href="#">Design</a></li>
                                <li><a href="#">Architecture</a></li>
                                <li><a href="#">Travel</a></li>
                                <li><a href="#">Food &amp; Drink</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-uppercase">Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Testimonials</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-uppercase">Follow Us</h5>
                            <ul className="list-unstyled">
                                <li><a href="#"><i className="fab fa-facebook-f"></i> Facebook</a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i> LinkedIn</a></li>
                                <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid copy-rights">
                    <div className="row">
                        <div className="col-md-6">
                            <p>© 2023 FreeHTML5. All Rights Reserved.</p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-md-right">Template by <a href="https://freehtml5.co" target="_blank" rel="noreferrer">FreeHTML5.co</a></p>
                        </div>
                    </div>
                </div>
            </footer>

            <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/jquery-1.12.0.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/owl.carousel.min.js"></script>
    <script src="assets/js/jquery.yu2fvl.js"></script>
    <script src="assets/js/main.js"></script>
        </div>
    );
}

export default ArticlePage;
