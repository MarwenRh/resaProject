import React, { useEffect,useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useHost } from "./HostProvider";
const words = ['Appartement', 'Hôtel', 'Maison de vacance', 'Auberge de jeunesse', 'Chambre d\'hôtes'];

const AddProperty = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [identity_card, setIdentity_card] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [birth_place, setBirth_place] = useState('');
  const [about, setAbout] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    // Validate Phone
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    // Validate Identity Card
    if (!identity_card.trim()) {
      newErrors.identity_card = 'Identity card is required';
    }

    // Validate Birth Date
    if (!birth_date.trim()) {
      newErrors.birth_date = 'Birth date is required';
    }

    // Validate Birth Place
    if (!birth_place.trim()) {
      newErrors.birth_place = 'Birth place is required';
    }

    // Validate About Section
    if (!about.trim()) {
      newErrors.about = 'About section cannot be empty';
    }

    setErrors(newErrors);
    
    // If there are no errors, return true
    return Object.keys(newErrors).length === 0;
  };
      const [currentWordIndex, setCurrentWordIndex] = useState(0);
     
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000); // Change word every 2 seconds
    
        return () => clearInterval(interval);
      }, []);
      const history = useHistory();
      const { setHostId } = useHost();

      const handleNavigate = async (e) => {
        e.preventDefault();
        if (validateForm()) {
        try {
          const response = await axios.post('http://localhost:3000/hosts/api', {
            name,
            email,
            phone,
            birth_date,
            birth_place,
            about,
            identity_card,
          });
          history.push(`/add`);
          setHostId(response.data._id); 
          if (response.status === 200 && response.data.access_token) {
            localStorage.setItem('token', response.data.access_token); // Save JWT token
         
          } else {
            console.log('Post failed');
          }
        } catch (postError) {
          console.error('There was an error posting!', postError);
        }}
      };
    
  return (
    <section>
        
        <div className="container-fluid booking py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6">
                        <h5 className="section-booking-title pe-3">Booking</h5>
                        <h1 className="text-white mb-4">
      Inscrivez votre <br></br><span className="animated-word ">{words[currentWordIndex]}</span> <br></br>sur Resa
    </h1><p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisiidentity_cardg elit. Aspernatur maxime ullam esse fuga blanditiis accusantium pariatur quis sapiente, veniam doloribus praesentium? Repudiandae iste voluptatem fugiat doloribus quasi quo iure officia.
                        </p>
                        <p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisiidentity_cardg elit. Aspernatur maxime ullam esse fuga blanditiis accusantium pariatur quis sapiente, veniam doloribus praesentium? Repudiandae iste voluptatem fugiat doloribus quasi quo iure officia.
                        </p>
                        <a href="#" className="btn btn-light text-primary rounded-pill py-3 px-5 mt-2">Read More</a>
                    </div>
                    <div className="col-lg-6">
                        <h1 className="text-white mb-3">Inscrivez-vous gratuitement</h1>
                        <p className="text-white mb-4">Get <span className="text-warning">50% Off</span> On Your First Adventure Trip With Travela. Get More Deal Offers Here.</p>
                        <form>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control bg-white border-0"
              id="name"
              placeholder="Your Name"
            />
            <label htmlFor="name">Your Name</label>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-white border-0"
              id="email"
              placeholder="Your Email"
            />
            <label htmlFor="email">Your Email</label>
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating date">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control bg-white border-0"
              id="phone"
              placeholder="Phone"
            />
            <label htmlFor="phone">Phone</label>
            {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating date">
            <input
              type="text"
              value={identity_card}
              onChange={(e) => setIdentity_card(e.target.value)}
              className="form-control bg-white border-0"
              id="identity_card"
              placeholder="Identity Card"
            />
            <label htmlFor="identity_card">Identity Card</label>
            {errors.identity_card && (
              <span className="text-danger">{errors.identity_card}</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating date">
            <input
              type="text"
              value={birth_date}
              onChange={(e) => setBirth_date(e.target.value)}
              className="form-control bg-white border-0"
              id="birth_date"
              placeholder="Birth Date"
            />
            <label htmlFor="birth_date">Birth Date</label>
            {errors.birth_date && (
              <span className="text-danger">{errors.birth_date}</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating date">
            <input
              type="text"
              value={birth_place}
              onChange={(e) => setBirth_place(e.target.value)}
              className="form-control bg-white border-0"
              id="birth_place"
              placeholder="Birth Place"
            />
            <label htmlFor="birth_place">Birth Place</label>
            {errors.birth_place && (
              <span className="text-danger">{errors.birth_place}</span>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="form-floating">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="form-control bg-white border-0"
              placeholder="About"
              id="about"
              style={{ height: '100px' }}
            ></textarea>
            <label htmlFor="about">About</label>
            {errors.about && <span className="text-danger">{errors.about}</span>}
          </div>
        </div>

        <div className="col-12">
          <button
            className="btn btn-primary text-white w-100 py-3"
            type="submit"
            onClick={handleNavigate}
          >
            Add Now
          </button>
        </div>
      </div>
    </form>
                    </div>
                </div>
            </div>
        </div>
         <div className="untree_co-section">
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-paper-plane"></span>
            <h3>Excellence in Travel</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-tag"></span>
            <h3>Discover Best</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-user"></span>
            <h3>A New Moments of Life</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-support"></span>
            <h3>Joy To Your Journey</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div className="untree_co-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-lg-6 text-center">
          <h2 className="section-title text-center mb-3">More Services</h2>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
        </div>
      </div>
      <div className="row align-items-stretch">
        <div className="col-lg-4 order-lg-1">
          <div className="h-100"><div className="frame h-100"><div className="feature-img-bg h-100"  style={{ backgroundImage: "url('assets/images/hero-slider-1.jpg')" }}></div></div></div>
        </div>

        <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1" >

          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="flaticon-house display-4 text-primary"></span>
              <h3>Beautiful Condo</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

          <div className="feature-1 ">
            <div className="align-self-center">
              <span className="flaticon-restaurant display-4 text-primary"></span>
              <h3>Restaurants & Cafe</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

        </div>

        <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3" >

          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="flaticon-mail display-4 text-primary"></span>
              <h3>Easy to Connect</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="flaticon-phone-call display-4 text-primary"></span>
              <h3>24/7 Support</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
    <div className="untree_co-section testimonial-section mt-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7 text-center">
          <h2 className="section-title text-center mb-5">Testimonials</h2>

          <div className="owl-single owl-carousel no-nav">
            <div className="testimonial mx-auto">
              <figure className="img-wrap">
                <img src="assets/images/person_2.jpg" alt="Image" className="img-fluid"/>
              </figure>
              <h3 className="name">Adam Aderson</h3>
              <blockquote>
                <p>&ldquo;There live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
              </blockquote>
            </div>

            <div className="testimonial mx-auto">
              <figure className="img-wrap">
                <img src="assets/images/person_3.jpg" alt="Image" className="img-fluid"/>
              </figure>
              <h3 className="name">Lukas Devlin</h3>
              <blockquote>
                <p>&ldquo;There live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
              </blockquote>
            </div>

            <div className="testimonial mx-auto">
              <figure className="img-wrap">
                <img src="assets/images/person_4.jpg" alt="Image" className="img-fluid"/>
              </figure>
              <h3 className="name">Kayla Bryant</h3>
              <blockquote>
                <p>&ldquo;There live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
              </blockquote>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
  <div className="untree_co-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <form className="contact-form" data-aos="fade-up" data-aos-delay="200">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label className="text-black" for="fname">First name</label>
                  <input type="text" className="form-control" id="fname"/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="text-black" for="lname">Last name</label>
                  <input type="text" className="form-control" id="lname"/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="text-black" for="email">Email address</label>
              <input type="email" className="form-control" id="email"/>
            </div>

            <div className="form-group">
              <label className="text-black" for="message">Message</label>
              <textarea name="" className="form-control" id="message" cols="30" rows="5"></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div className="col-lg-5 ml-auto">
          <div className="quick-contact-item d-flex align-items-center mb-4">
            <span className="flaticon-house"></span>
            <address className="text">
              155 Market St #101, Paterson, NJ 07505, United States
            </address>
          </div>
          <div className="quick-contact-item d-flex align-items-center mb-4">
            <span className="flaticon-phone-call"></span>
            <address className="text">
              +1 202 2020 200
            </address>
          </div>
          <div className="quick-contact-item d-flex align-items-center mb-4">
            <span className="flaticon-mail"></span>
            <address className="text">
              @info@mydomain.com
            </address>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>

  );
};

export default AddProperty;
