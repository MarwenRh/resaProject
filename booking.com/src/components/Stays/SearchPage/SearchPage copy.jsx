import React, { useState } from "react";
import styles from "./form.module.css";
import { FaCreditCard, FaPaypal, FaMoneyBillAlt, FaUniversity } from 'react-icons/fa';
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineSmokingRooms,MdOutlinePets } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { BsPersonRaisedHand } from "react-icons/bs";
import { CalendarPicker } from "./calendarPicker";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useHost } from "../../Login/HostProvider";
import { FaStar } from 'react-icons/fa';

export const SearchPage2 = () => {
  const { hostId } = useHost();
    const [formData, setFormData] = useState({
      name:"",
      phone:"",
      email:"",
      website:"",
      Rating:"",
      description: "",
      afterPriceLabel: "",
      hoaFee: "",
      type: "",
      address: "",
      country: "",
      state: "",
      city: "",
      latitude: "",
      longitude: "",
      size: "",
      lotSize: "",
      rooms: "",
      bedrooms: "",
      bathrooms: "",
      touristTax: "",
      maxGuest: "",
      minNight: "",
      availableFrom: "",
      maxGuestize: "",
      basement: "",
      roofing: "",
      structureType: "",
      floorsNo: "",
      energyClass: "",
      energyIndex: "",
      media: null,
      virtualTour: "",
      maxNight:"",
      beds_Number:null,
      amenities: {
        WiFi: false,
        Kitchen: false,
        Washer: false,
        Dryer: false,
        Free_parking: false,
        Air_conditioning: false,
        Heating: false,
        TV: false,
        Breakfast: false,
        Laptop_friendly_workspace: false,
        Crib: false,
        Hair_dryer: false,
        Iron: false,
        Essentials: false,
        Smoke_alarm: false,
        Carbon_monoxide_alarm: false,
        Fire_extinguisher: false,
        First_aid_kit: false,
        Lock_on_bedroom_door: false,
        Hangers: false,
        Shampoo: false,
        Garden_or_backyard: false,
        Patio_or_balcony: false,
        BBQ_grill: false,
      },
      policies: { 
        smoking: false,
        pets: false,
        parties_or_events: false,
        check_in_start: "",
        check_in_end: "",
        check_out_start: "",
        check_out_end: "",
        quiet_hours_start: "",
        quiet_hours_end: "",
        cleaning_maintenance: "",
        cancellation_policy: "",
        guests_allowed: false,
      },
      means_of_payment: [],
      paymentMethods: { // Initialize paymentMethods as an object
        "credit card": false,
        "debit card": false,
        "paypal": false,
        "cash": false,
        "check": false,
        "bank transfer": false,
      },
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
   
    const handlePaymentChange = (e) => {
      const { name, checked } = e.target;
    
      setFormData((prevState) => {
        const updatedPayments = checked
          ? [...prevState.means_of_payment, name]
          : prevState.means_of_payment.filter((method) => method !== name);
    
        return {
          ...prevState,
          means_of_payment: updatedPayments,
          paymentMethods: {
            ...prevState.paymentMethods,
            [name]: checked, // Update the specific payment method
          },
        };
      });
    
      // Validation: Ensure at least one payment method is selected
      const isAnyPaymentSelected = e.target.closest('form').querySelectorAll('input[type="checkbox"]:checked').length > 0;
    
      // Set error state based on selection
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentMethods: isAnyPaymentSelected ? '' : 'At least one payment option must be selected',
      }));
    };
    

  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };
    const [apartmentSpaces, setApartmentSpaces] = useState([
      { space_id: '', type: '', area: '', photos: [''] },
    ]);
  
    const handleApartmentSpaceChange = (index, event) => {
      const { name, value } = event.target;
      const updatedSpaces = apartmentSpaces.map((space, spaceIndex) =>
        spaceIndex === index
          ? { ...space, [name]: value }
          : space
      );
      setApartmentSpaces(updatedSpaces);
    };
  
    const handlePhotoChange = (spaceIndex, photoIndex, event) => {
      const updatedSpaces = apartmentSpaces.map((space, index) => {
        if (index === spaceIndex) {
          const updatedPhotos = [...space.photos];
          updatedPhotos[photoIndex] = event.target.value;
          return { ...space, photos: updatedPhotos };
        }
        return space;
      });
      setApartmentSpaces(updatedSpaces);
    };
  
    const addApartmentSpace = () => {
      setApartmentSpaces([
        ...apartmentSpaces,
        { space_id: '', type: '', area: '', photos: [''] },
      ]);
    };
  
    const addPhotoInput = (spaceIndex) => {
      const updatedSpaces = apartmentSpaces.map((space, index) => {
        if (index === spaceIndex) {
          return { ...space, photos: [...space.photos, ''] };
        }
        return space;
      });
      setApartmentSpaces(updatedSpaces);
    };
const handleAmenitiesChange = (e) => {
  const { name, checked } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    amenities: {
      ...prevState.amenities,
      [name]: checked,
    },
  }));
};
const handlePoliciesChange = (e) => {
  const { name, type, checked, value } = e.target;

  setFormData((prevState) => ({
    ...prevState,
    policies: {
      ...prevState.policies,
      [name]: type === "checkbox" ? checked : value, // Use value directly, no need for trim check
    },
  }));
};


const [availabilities, setAvailabilities] = useState([]);
  
// State to store current selected date and price
const [currentAvailability, setCurrentAvailability] = useState({
  start_time: "",
  end_time: "",
  price: "",
});
const handleAvailabilityChange = (e) => {
  const { name, value } = e.target;
  setCurrentAvailability((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Add the current availability to the array
const handleAddAvailability = () => {
  setAvailabilities((prevAvailabilities) => [
    ...prevAvailabilities,
    currentAvailability,
  ]);
  // Reset the current availability for next input
  setCurrentAvailability({ start_time: "", end_time: "", price: "" });
};
const handleDateSelect = (range) => {
  const start = new Date(range.startDate);
  const end = new Date(range.endDate);

  // Set start time at midnight
  const start_time = new Date(start.setHours(0, 0, 0, 0)).toISOString();

  // Set end time at midnight of the day after end date
  const end_time = new Date(end.setDate(end.getDate() + 1)).toISOString();

  setCurrentAvailability((prevData) => ({
    ...prevData,
    start_time,
    end_time,
  }));
};

const [errors, setErrors] = useState({});
const validateForm = () => {
  let newErrors = {};
  
  // Validation for property details
  if (!formData.name) {
    newErrors.name = "Property Title is required";
  }
  if (!formData.place) {
    newErrors.place = "Property Place is required";
  }
  if (!formData.description) {
    newErrors.description = "Description is required";
  }
  if (!formData.Rating || isNaN(formData.Rating) || formData.Rating < 0 || formData.Rating > 5) {
    newErrors.Rating = "Rating must be a number between 0 and 5";
  }
  if (!formData.phone) {
    newErrors.phone = "Phone number is required";
  }
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email format is invalid";
  }
  if (formData.website && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.website)) {
    newErrors.website = "Website URL format is invalid";
  }
  // Validation for type selection
  if (!formData.type) {
    newErrors.type = "Property Type is required";
  }
  const paymentOptions = [
    formData.paymentMethods["credit card"],
    formData.paymentMethods["debit card"],
    formData.paymentMethods["paypal"],
    formData.paymentMethods["cash"],
    formData.paymentMethods["check"],
    formData.paymentMethods["bank transfer"],
  ];

  // Check if at least one payment method is selected
  if (!paymentOptions.some(option => option)) {
    newErrors.paymentMethods = "At least one payment option must be selected";
  }

  // Validation for apartment spaces
  apartmentSpaces.forEach((space, index) => {
    if (!space.space_id) {
      newErrors[`space_id_${index}`] = "Space ID is required";
    }
    if (!space.type) {
      newErrors[`type_${index}`] = "Type is required for this space";
    }
    if (!space.area || isNaN(space.area) || space.area <= 0) {
      newErrors[`area_${index}`] = "Area must be a positive number";
    }
    // Validate photo URLs
    space.photos.forEach((photo, photoIndex) => {
      if (!photo) {
        newErrors[`photo_${index}_${photoIndex}`] = "Photo URL is required";
      }
    });
  });

  // Validation for availability
  if (!currentAvailability.price || currentAvailability.price <= 0) {
    newErrors.price = "Price must be a positive number";
  }
  
  if (!currentAvailability.start_time || !currentAvailability.end_time) {
    newErrors.dateRange = "You must select a date range";
  } else if (new Date(currentAvailability.start_time) >= new Date(currentAvailability.end_time)) {
    newErrors.dateRange = "End date must be after the start date";
  }

  // Validation for location
  if (!formData.address) {
    newErrors.address = "Address is required";
  }
  if (!formData.country) {
    newErrors.country = "Country is required";
  }
  if (!formData.state) {
    newErrors.state = "State is required";
  }
  if (!formData.city) {
    newErrors.city = "City is required";
  }
  if (formData.latitude === undefined || formData.latitude === '') {
    newErrors.latitude = "Latitude is required";
  } else if (formData.latitude < -90 || formData.latitude > 90) {
    newErrors.latitude = "Latitude must be between -90 and 90";
  }
  if (formData.longitude === undefined || formData.longitude === '') {
    newErrors.longitude = "Longitude is required";
  } else if (formData.longitude < -180 || formData.longitude > 180) {
    newErrors.longitude = "Longitude must be between -180 and 180";
  }

  // Validation for details
  if (!formData.size || formData.size <= 0) {
    newErrors.size = "Size in ft2 is required and must be positive";
  }
  if (!formData.lotSize || formData.lotSize <= 0) {
    newErrors.lotSize = "Lot Size in ft2 is required and must be positive";
  }
  if (!formData.rooms || formData.rooms < 0) {
    newErrors.rooms = "Rooms must be a non-negative number";
  }
  if (!formData.bedrooms || formData.bedrooms < 0) {
    newErrors.bedrooms = "Bedrooms must be a non-negative number";
  }
  if (!formData.bathrooms || formData.bathrooms < 0) {
    newErrors.bathrooms = "Bathrooms must be a non-negative number";
  }
  if (!formData.beds_Number || formData.beds_Number < 0) {
    newErrors.beds_Number = "Beds_Number must be a non-negative number";
  }
  if (!formData.touristTax || formData.touristTax < 0) {
    newErrors.touristTax = "Tourist Tax must be a non-negative number";
  }
  if (!formData.maxGuest || formData.maxGuest <= 0) {
    newErrors.maxGuest = "Max_Guest must be a positive number";
  }
  if (!formData.minNight || formData.minNight <= 0) {
    newErrors.minNight = "Min_Night must be a positive number";
  }
  if (!formData.maxNight || formData.maxNight <= 0) {
    newErrors.maxNight = "Max_Night must be a positive number";
  }
  if (!formData.policies.check_in_start) {
    newErrors.check_in_start = "Check-in start time is required";
  }
  if (!formData.policies.check_in_end) {
    newErrors.check_in_end = "Check-in end time is required";
  } else if (formData.policies.check_in_start >= formData.policies.check_in_end) {
    newErrors.check_in_end = "Check-in end time must be after check-in start time";
  }

  if (!formData.policies.check_out_start) {
    newErrors.check_out_start = "Check-out start time is required";
  }
  if (!formData.policies.check_out_end) {
    newErrors.check_out_end = "Check-out end time is required";
  } else if (formData.policies.check_out_start >= formData.policies.check_out_end) {
    newErrors.check_out_end = "Check-out end time must be after check-out start time";
  }

  if (!formData.policies.quiet_hours_start) {
    newErrors.quiet_hours_start = "Quiet hours start time is required";
  }
  if (!formData.policies.quiet_hours_end) {
    newErrors.quiet_hours_end = "Quiet hours end time is required";
  } else if (formData.policies.quiet_hours_start >= formData.policies.quiet_hours_end) {
    newErrors.quiet_hours_end = "Quiet hours end time must be after quiet hours start time";
  }

  if (!formData.policies.cleaning_maintenance) {
    newErrors.cleaning_maintenance = "Cleaning maintenance details are required";
  }
  if (!formData.policies.cancellation_policy) {
    newErrors.cancellation_policy = "Cancellation policy details are required";
  }
  // Set all errors at once
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Return true if no errors
};

const [starRating, setStarRating] = useState(0); // Tracks selected stars (rating)
const [hoverRating, setHoverRating] = useState(null); // Tracks hover effect

const handleChangeRating = (ratingValue) => {
  setStarRating(ratingValue); // Update star rating state
  setFormData((prevState) => ({
    ...prevState,
    Rating: ratingValue, // Save star rating in formData as Rating
  }));
};

    const history = useHistory();
  
    const handleNavigate = async (e) => {
  const currentDate = new Date();
  console.log(availabilities);
  const added_date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      e.preventDefault();
      if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/properties/api', {
          name:formData.name,
          type:formData.type,
          place:formData.place,
          description:formData.description,
          max_guests: formData.maxGuest,
          beds_number:formData.beds_Number,
          overall_rating:formData.Rating,
          tourist_tax: formData.touristTax,
          location:{address:formData.adress,country:formData.country,city:formData.city,
            state:formData.state,
            coordinates:{
              latitude:formData.latitude,
              longitude:formData.longitude
          }},
          apartment_spaces:  apartmentSpaces,
          amenities: formData.amenities,
          policies: formData.policies,
          contact: { phone: formData.phone, email: formData.email, website: formData.website },
          means_of_payment: formData.means_of_payment,
          minimum_nights: formData.minNight,
          maximum_nights: formData.maxNight,
          added_date:added_date,
          host_id: hostId,
        });
        if (response.status === 201) {
          const validAvailabilities = availabilities.filter(slot => 
            slot.start_time && slot.end_time && slot.price
          );
    
          // Log filtered availabilities for debugging
          console.log("Valid availabilities:", validAvailabilities);
          console.log("propertyid:", response.data.property_id);
    
          if (validAvailabilities.length > 0) {
            // Post valid availabilities
            const availResponse = await axios.post('http://localhost:3000/availabilities/api', {
              property_id:response.data.property_id, // Assuming the property ID is returned from the first post
              available_slots: validAvailabilities,
            });
    
            console.log("Availabilities added successfully:", availResponse.data);
          } else {
            console.error("No valid availabilities to post.");
          }
          history.push('/add');
          console.log('Property added successfully!');
        } else {
          console.log('Post failed');
        }
      } catch (postError) {
        console.error('There was an error posting!', postError);
      }}
    };

    
    return (
      <form className={styles.propertyForm} onSubmit={handleSubmit}>
    <section className={styles.section}>
  <h2>1. Description</h2>
    <div className={styles.inputContainer}>
      <i className="fas fa-user"></i>
      <input
        className={styles.fullWidth}
        type="text"
        placeholder="Property Title"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}
    </div>

    <div className={styles.inputContainer}>
      <i className="fas fa-user"></i>
      <input
        className={styles.fullWidth}
        type="text"
        placeholder="Property Place"
        name="place"
        value={formData.place}
        onChange={handleChange}
      />
      {errors.place && <span className={styles.error}>{errors.place}</span>}
    </div>

    <div className={styles.inputContainer}>
      <i className="fas fa-pen"></i>
      <textarea
        className={styles.fullWidth}
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      {errors.description && <span className={styles.error}>{errors.description}</span>}
    </div>

    <div className={styles.inputContainer}> <label style={{ paddingBottom: '20px' }}> Rating : </label>

      <div className={styles.stars}>
     
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
         
          return (
            <label key={index}>
              
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleChangeRating(ratingValue)} // Set rating on click
                style={{ display: 'none' }} // Hide the default radio input
              />
              <FaStar
                size={30}
                color={ratingValue <= (hoverRating || starRating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={() => setHoverRating(ratingValue)} // Hover effect
                onMouseLeave={() => setHoverRating(null)} // Reset hover
                style={{ cursor: 'pointer', marginRight: '10px' }}
              />
            </label>
          );
        })}
      </div>
      {errors.Rating && <span className={styles.error}>{errors.Rating}</span>}
    </div>
    </section>


      <section className={styles.section}>
      <h2>Property Price</h2>
      <div>
    <input
      type="number"
      placeholder="Price in $"
      name="price"
      value={currentAvailability.price}
      onChange={handleAvailabilityChange}
    />
    {errors.price && (
      <span className={styles.error}>{errors.price}</span>
    )}
  </div>

  {/* Calendar for selecting date range */}
  <CalendarPicker onDateSelect={handleDateSelect} />

  {errors.dateRange && (
    <span className={styles.error}>{errors.dateRange}</span>
  )}
        <button type="button" onClick={handleAddAvailability}>Add Availability</button>

        <div>
          <h3>Added Availabilities:</h3>
          <ul>
            {availabilities.map((availability, index) => (
              <li key={index}>
                {`Start: ${availability.start_time}, End: ${availability.end_time}, Price: $${availability.price}`}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.section}>
  <h2>Select Type</h2>
  <div className={styles.inputContainer}>
    <i className="fas fa-chevron-down"></i>
    <select
      className={styles.fullWidth}
      name="type"
      value={formData.type}
      onChange={handleChange}
    >
      <option value="">Select Type</option>
      <option value="Hotel">Hotel</option>
      <option value="Appartement">Appartement</option>
      <option value="Villa">Villa</option>
    </select>
    {errors.type && <span className={styles.error}>{errors.type}</span>}
  </div>
</section>

<section className={styles.section}>
  <h2>Apartment Spaces</h2>
  {apartmentSpaces.map((space, index) => (
    <div key={index}>
      <input
        type="text"
        name="space_id"
        placeholder="Space ID"
        value={space.space_id}
        onChange={(e) => handleApartmentSpaceChange(index, e)}
      />
      {errors[`space_id_${index}`] && <span className={styles.error}>{errors[`space_id_${index}`]}</span>}
      
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={space.type}
        onChange={(e) => handleApartmentSpaceChange(index, e)}
      />
      {errors[`type_${index}`] && <span className={styles.error}>{errors[`type_${index}`]}</span>}
      
      <input
        type="text"
        name="area"
        placeholder="Area (sqm)"
        value={space.area}
        onChange={(e) => handleApartmentSpaceChange(index, e)}
      />
      {errors[`area_${index}`] && <span className={styles.error}>{errors[`area_${index}`]}</span>}
      
      {space.photos.map((photo, photoIndex) => (
        <div key={photoIndex}>
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => handlePhotoChange(index, photoIndex, e)}
          />
          {errors[`photo_${index}_${photoIndex}`] && <span className={styles.error}>{errors[`photo_${index}_${photoIndex}`]}</span>}
        </div>
      ))}
      <button type="button" onClick={() => addPhotoInput(index)}>
        Add Another Photo
      </button>
    </div>
  ))}
  <button type="button" onClick={addApartmentSpace}>
    Add New Space
  </button>
</section>

  
<section className={styles.section}> 
  <h2>3. Location</h2>
  <input
    className={styles.fullWidth}
    type="text"
    placeholder="Address"
    name="address"
    value={formData.address}
    onChange={handleChange}
  />
  {errors.address && <span className={styles.error}>{errors.address}</span>}

  <input
    type="text"
    placeholder="Country"
    name="country"
    value={formData.country}
    onChange={handleChange}
  />
  {errors.country && <span className={styles.error}>{errors.country}</span>}

  <input
    type="text"
    placeholder="State"
    name="state"
    value={formData.state}
    onChange={handleChange}
  />
  {errors.state && <span className={styles.error}>{errors.state}</span>}

  <input
    type="text"
    placeholder="City"
    name="city"
    value={formData.city}
    onChange={handleChange}
  />
  {errors.city && <span className={styles.error}>{errors.city}</span>}

  <input
    type="number"
    placeholder="Latitude (for Google Maps)"
    name="latitude"
    value={formData.latitude}
    onChange={handleChange}
  />
  {errors.latitude && <span className={styles.error}>{errors.latitude}</span>}

  <input
    type="number"
    placeholder="Longitude (for Google Maps)"
    name="longitude"
    value={formData.longitude}
    onChange={handleChange}
  />
  {errors.longitude && <span className={styles.error}>{errors.longitude}</span>}
  
  <div className={styles.mapContainer}>
    <iframe
      title="Location"
      src={`https://maps.google.com/maps?q=${formData.latitude},${formData.longitude}&z=15&output=embed`}
      allowFullScreen
    />
  </div>
</section>

<section className={styles.section}>
  <h2>4. Details</h2>
  <input
    type="number"
    placeholder="Size in ft2"
    name="size"
    value={formData.size}
    onChange={handleChange}
  />
  {errors.size && <span className={styles.error}>{errors.size}</span>}

  <input
    type="number"
    placeholder="Lot Size in ft2"
    name="lotSize"
    value={formData.lotSize}
    onChange={handleChange}
  />
  {errors.lotSize && <span className={styles.error}>{errors.lotSize}</span>}

  <input
    type="number"
    placeholder="Rooms"
    name="rooms"
    value={formData.rooms}
    onChange={handleChange}
  />
  {errors.rooms && <span className={styles.error}>{errors.rooms}</span>}

  <input
    type="number"
    placeholder="Bedrooms"
    name="bedrooms"
    value={formData.bedrooms}
    onChange={handleChange}
  />
  {errors.bedrooms && <span className={styles.error}>{errors.bedrooms}</span>}

  <input
    type="number"
    placeholder="Bathrooms"
    name="bathrooms"
    value={formData.bathrooms}
    onChange={handleChange}
  />
  {errors.bathrooms && <span className={styles.error}>{errors.bathrooms}</span>}

  <input
    type="number"
    placeholder="Beds_Number"
    name="beds_Number"
    value={formData.beds_Number}
    onChange={handleChange}
  />
  {errors.beds_Number && <span className={styles.error}>{errors.beds_Number}</span>}

  <input
    type="number"
    placeholder="Tourist Tax"
    name="touristTax"
    value={formData.touristTax}
    onChange={handleChange}
  />
  {errors.touristTax && <span className={styles.error}>{errors.touristTax}</span>}

  <input
    type="number"
    placeholder="Max_Guest"
    name="maxGuest"
    value={formData.maxGuest}
    onChange={handleChange}
  />
  {errors.maxGuest && <span className={styles.error}>{errors.maxGuest}</span>}

  <input
    type="number"
    placeholder="Min_Night"
    name="minNight"
    value={formData.minNight}
    onChange={handleChange}
  />
  {errors.minNight && <span className={styles.error}>{errors.minNight}</span>}

  <input
    type="number"
    placeholder="Max_Night"
    name="maxNight"
    value={formData.maxNight}
    onChange={handleChange}
  />
  {errors.maxNight && <span className={styles.error}>{errors.maxNight}</span>}
</section>

  
        <section className={styles.section}>
        <h2>5. Amenities</h2>
       

        <div >
        <div className={styles.amenitiesSection}>
  <h3>Essential Amenities</h3>
  <div className={styles.checkboxGroup}>
    <label>
      <input type="checkbox" name="WiFi" 
        checked={formData.amenities.WiFi}
        onChange={handleAmenitiesChange} /> WiFi
    </label>
    <label>
      <input type="checkbox" name="Kitchen" 
        checked={formData.amenities.Kitchen}
        onChange={handleAmenitiesChange}/> Kitchen
    </label>
    <label>
      <input type="checkbox" name="Washer" 
        checked={formData.amenities.Washer}
        onChange={handleAmenitiesChange} /> Washer
    </label>
    <label>
      <input type="checkbox" name="Dryer" 
        checked={formData.amenities.Dryer}
        onChange={handleAmenitiesChange} /> Dryer
    </label>
    <label>
      <input type="checkbox" name="Free_parking" 
        checked={formData.amenities.Free_parking}
        onChange={handleAmenitiesChange}/> Free parking
    </label>
    <label>
      <input type="checkbox" name="Air_conditioning" 
        checked={formData.amenities.Air_conditioning}
        onChange={handleAmenitiesChange}/> Air conditioning
    </label>
    <label>
      <input type="checkbox" name="Heating" 
        checked={formData.amenities.Heating}
        onChange={handleAmenitiesChange} /> Heating
    </label>
    <label>
      <input type="checkbox" name="TV" 
        checked={formData.amenities.TV}
        onChange={handleAmenitiesChange}/> TV
    </label>
    <label>
      <input type="checkbox" name="Breakfast" 
        checked={formData.amenities.Breakfast}
        onChange={handleAmenitiesChange} /> Breakfast
    </label>
    <label>
      <input type="checkbox" name="Laptop_friendly_workspace" 
        checked={formData.amenities.Laptop_friendly_workspace}
        onChange={handleAmenitiesChange} /> Laptop-friendly workspace
    </label>
    <label>
      <input type="checkbox" name="Crib" 
        checked={formData.amenities.Crib}
        onChange={handleAmenitiesChange}/> Crib
    </label>
    <label>
      <input type="checkbox" name="Hair_dryer" 
        checked={formData.amenities.Hair_dryer}
        onChange={handleAmenitiesChange} /> Hair dryer
    </label>
    <label>
      <input type="checkbox" name="Iron" 
        checked={formData.amenities.Iron}
        onChange={handleAmenitiesChange}/> Iron
    </label>
    <label>
      <input type="checkbox" name="Essentials" 
        checked={formData.amenities.Essentials}
        onChange={handleAmenitiesChange} /> Essentials
    </label>
  </div>
</div>

<div className={styles.amenitiesSection}>
  <h3>Safety Features</h3>
  <div className={styles.checkboxGroup}>
    <label>
      <input type="checkbox" name="Smoke_alarm" 
        checked={formData.amenities.Smoke_alarm}
        onChange={handleAmenitiesChange} /> Smoke alarm
    </label>
    <label>
      <input type="checkbox" name="Carbon_monoxide_alarm" 
        checked={formData.amenities.Carbon_monoxide_alarm}
        onChange={handleAmenitiesChange} /> Carbon monoxide alarm
    </label>
    <label>
      <input type="checkbox" name="Fire_extinguisher" 
        checked={formData.amenities.Fire_extinguisher}
        onChange={handleAmenitiesChange} /> Fire extinguisher
    </label>
    <label>
      <input type="checkbox" name="First_aid_kit" 
        checked={formData.amenities.First_aid_kit}
        onChange={handleAmenitiesChange} /> First aid kit
    </label>
    <label>
      <input type="checkbox" name="Lock_on_bedroom_door" 
        checked={formData.amenities.Lock_on_bedroom_door}
        onChange={handleAmenitiesChange}/> Lock on bedroom door
    </label>
  </div>
</div>

<div className={styles.amenitiesSection}>
  <h3>Other Features</h3>
  <div className={styles.checkboxGroup}>
    <label>
      <input type="checkbox" name="Hangers" 
        checked={formData.amenities.Hangers}
        onChange={handleAmenitiesChange}/> Hangers
    </label>
    <label>
      <input type="checkbox" name="Shampoo" 
        checked={formData.amenities.Shampoo}
        onChange={handleAmenitiesChange}/> Shampoo
    </label>
    <label>
      <input type="checkbox" name="Garden_or_backyard" 
        checked={formData.amenities.Garden_or_backyard}
        onChange={handleAmenitiesChange}/> Garden or backyard
    </label>
    <label>
      <input type="checkbox" name="Patio_or_balcony" 
        checked={formData.amenities.Patio_or_balcony}
        onChange={handleAmenitiesChange} /> Patio or balcony
    </label>
    <label>
      <input type="checkbox" name="BBQ_grill" 
        checked={formData.amenities.BBQ_grill}
        onChange={handleAmenitiesChange}/> BBQ grill
    </label>
  </div>
</div>

</div>


        </section>
        <section className={styles.section}>
  <h2>6. Policies</h2>
  <div className={styles.checkboxGroup}>
    <label>
      <input type="checkbox" name="smoking"
        checked={formData.policies.smoking}
        onChange={handlePoliciesChange} />
      <MdOutlineSmokingRooms size={20} style={{ marginRight: '8px' }} />
      Smoking
    </label>

    <label>
      <input type="checkbox" name="pets"
        checked={formData.policies.pets}
        onChange={handlePoliciesChange} />
      <MdOutlinePets size={20} style={{ marginRight: '8px' }} />
      Pets
    </label>

    <label>
      <input type="checkbox" name="parties_or_events"
        checked={formData.policies.parties_or_events}
        onChange={handlePoliciesChange} />
      <GiPartyPopper size={20} style={{ marginRight: '8px' }} />
      Parties or Events
    </label>

    <label>
      <input type="checkbox" name="guests_allowed"
        checked={formData.policies.guests_allowed}
        onChange={handlePoliciesChange} />
      <BsPersonRaisedHand size={20} style={{ marginRight: '8px' }} />
      Guests Allowed
    </label>


<label>
  <div style={{ marginBottom: '20px' }}>
    <IoCalendarOutline size={20} style={{ marginRight: '8px' }} />
    Check-in Start
  </div>
  <input
    type="time"
    name="check_in_start"
    value={formData.policies.check_in_start}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
  {errors.check_in_start && <span className={styles.error}>{errors.check_in_start}</span>}
</label>

<label>
  <div style={{ marginBottom: '20px' }}>
    <IoCalendarOutline size={20} style={{ marginRight: '8px' }} />
    Check-in End
  </div>
  <input
    type="time"
    name="check_in_end"
    value={formData.policies.check_in_end}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
  {errors.check_in_end && <span className={styles.error}>{errors.check_in_end}</span>}
</label>

<label>
  <div style={{ marginBottom: '20px' }}>
    <IoCalendarOutline size={20} style={{ marginRight: '8px' }} />
    Check-out Start
  </div>
  <input
    type="time"
    name="check_out_start"
    value={formData.policies.check_out_start}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
  {errors.check_out_start && <span className={styles.error}>{errors.check_out_start}</span>}
</label>

<label>
  <div style={{ marginBottom: '20px' }}>
    <IoCalendarOutline size={20} style={{ marginRight: '8px' }} />
    Check-out End
  </div>
  <input
    type="time"
    name="check_out_end"
    value={formData.policies.check_out_end}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
  {errors.check_out_end && <span className={styles.error}>{errors.check_out_end}</span>}
</label>

<label>
  <div style={{ marginBottom: '20px' }}>
    <IoCalendarOutline size={20} style={{ marginRight: '8px' }} />
    Quiet Hours Start
  </div>
  <input
    type="time"
    name="quiet_hours_start"
    value={formData.policies.quiet_hours_start}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
  {errors.quiet_hours_start && <span className={styles.error}>{errors.quiet_hours_start}</span>}
</label>

<label>
  <div style={{ marginBottom: '20px' }}>
    <IoCalendarOutline size={20} style={{ marginRight: '8px' }} />
    Quiet Hours End
  </div>
  <input
    type="time"
    name="quiet_hours_end"
    value={formData.policies.quiet_hours_end}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
  {errors.quiet_hours_end && <span className={styles.error}>{errors.quiet_hours_end}</span>}
</label>

<label>
  <input
    type="text"
    placeholder="Cleaning Maintenance"
    name="cleaning_maintenance"
    value={formData.policies.cleaning_maintenance}
    onChange={handlePoliciesChange}
  />
  {errors.cleaning_maintenance && <span className={styles.error}>{errors.cleaning_maintenance}</span>}
</label>

<label>
  <input
    type="text"
    placeholder="Cancellation Policy"
    name="cancellation_policy"
    value={formData.policies.cancellation_policy}
    onChange={handlePoliciesChange}
  />
  {errors.cancellation_policy && <span className={styles.error}>{errors.cancellation_policy}</span>}
</label>


  </div>
        </section>
        <section className={styles.section}>
  <h2>7. Means of payment</h2>
  <div>
    <div className={styles.checkboxGroup}>
      <label>
        <input
          type="checkbox"
          name="credit card"
          onChange={handlePaymentChange}
        />
        <FaCreditCard size={20} style={{ marginRight: '8px' }} />
        Credit Card
      </label>

      <label>
        <input
          type="checkbox"
          name="debit card"
          onChange={handlePaymentChange}
        />
        <FaCreditCard size={20} style={{ marginRight: '8px' }} />
        Debit Card
      </label>

      <label>
        <input
          type="checkbox"
          name="paypal"
          onChange={handlePaymentChange}
        />
        <FaPaypal size={20} style={{ marginRight: '8px' }} />
        Paypal
      </label>

      <label>
        <input
          type="checkbox"
          name="cash"
          onChange={handlePaymentChange}
        />
        <FaMoneyBillAlt size={20} style={{ marginRight: '8px' }} />
        Cash
      </label>

      <label>
        <input
          type="checkbox"
          name="check"
          onChange={handlePaymentChange}
        />
        <CiMoneyCheck1 size={25} style={{ marginRight: '8px' }} />
        Check
      </label>

      <label>
        <input
          type="checkbox"
          name="bank transfer"
          onChange={handlePaymentChange}
        />
        <FaUniversity size={20} style={{ marginRight: '8px' }} />
        Bank Transfer
      </label>
    </div>
    {errors.paymentMethods && (
      <span className={styles.error}>{errors.paymentMethods}</span>
    )}
  </div>
</section>


        <section className={styles.section}> 
  <h2>8. Contact</h2>
  <input
    type="text"
    placeholder="Phone"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
  />
  {errors.phone && <span className={styles.error}>{errors.phone}</span>}

  <input
    type="email"
    placeholder="Email"
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
  {errors.email && <span className={styles.error}>{errors.email}</span>}

  <input
    type="text"
    placeholder="Website"
    name="website"
    value={formData.website}
    onChange={handleChange}
  />
  {errors.website && <span className={styles.error}>{errors.website}</span>}
</section>

  
        <button type="submit" onClick={handleNavigate}>Submit Property</button>
      </form>
    );
  };
  
  