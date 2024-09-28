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
export const SearchPage2 = () => {
    const [formData, setFormData] = useState({
      name:"",
      phone:"",
      email:"",
      website:"",
      Rating:"",
      description: "",
      price: "",
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
      },means_of_payment: [],
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
          ? [...prevState.means_of_payment, name] // Add payment method if checked
          : prevState.means_of_payment.filter((method) => method !== name); // Remove if unchecked
    
        return {
          ...prevState,
          means_of_payment: updatedPayments,
        };
      });
    };
    
    const handleFileChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        media: e.target.files[0],
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };
    const [apartmentSpaces, setApartmentSpaces] = useState([
  { space_id: "", type: "", area: "", photos: ["", ""] },
]);

const handleApartmentSpaceChange = (index, event) => {
  const updatedSpaces = apartmentSpaces.map((space, spaceIndex) => 
    spaceIndex === index
      ? { ...space, [event.target.name]: event.target.value }
      : space
  );
  setApartmentSpaces(updatedSpaces);
};

const addApartmentSpace = () => {
  setApartmentSpaces([...apartmentSpaces, { space_id: "", type: "", area: "", photos: ["", ""] }]);
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


    const history = useHistory();
  
    const handleNavigate = async (e) => {

  const currentDate = new Date();
  
  const added_date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      e.preventDefault();
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
          apartment_spaces: apartmentSpaces,
          amenities: formData.amenities,
          policies: formData.policies,
          contact: { phone: formData.phone, email: formData.email, website: formData.website },
          means_of_payment: formData.means_of_payment,
          minimum_nights: formData.minNight,
          maximum_nights: formData.maxNight,
          added_date:added_date,
          
        });
        if (response.status === 200) {
          history.push('/add');
          console.log('Property added successfully!');
        } else {
          console.log('Post failed');
        }
      } catch (postError) {
        console.error('There was an error posting!', postError);
      }
    };

    
    return (
      <form className={styles.propertyForm} onSubmit={handleSubmit}>
      <section className={styles.section}>
        <h2>1. Description</h2>
        <div className={styles.inputContainer}>
        <i class="fas fa-user"></i>
          <input
            className={styles.fullWidth}
            type="text"
            placeholder="Property Title"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
         
        </div>
        <div className={styles.inputContainer}>
        <i class="fas fa-user"></i>
          <input
            className={styles.fullWidth}
            type="text"
            placeholder="Property Place"
            name="place"
            value={formData.place}
            onChange={handleChange}
          />
         
        </div>
        <div className={styles.inputContainer}>
        <i class="fas fa-pen"></i>
        <textarea
          className={styles.fullWidth}
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        </div>

        <div className={styles.inputContainer}>
        <i class="fas fa-pen"></i>
        <textarea
          className={styles.fullWidth}
          placeholder="Rating"
          name="Rating"
          value={formData.Rating}
          onChange={handleChange}
        />
        </div>
      </section>

      <section className={styles.section}>
        <h2> Property Price</h2>
        <div className={styles.inputContainer}>
        <i class="fas fa-dollar-sign"></i>
          <input
            type="number"
            placeholder="Price in $"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          
        </div>
       <CalendarPicker/>
        {/* Ajout de la sélection des catégories */}
        
      </section>
      <section className={styles.section}>
        <h2> Property Availibility</h2>
        <div className={styles.inputContainer}>
        <i class="fas fa-dollar-sign"></i>
          <input
            type="number"
            placeholder="Start Time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
        <i class="fas fa-dollar-sign"></i>
          <input
            type="number"
            placeholder="End Time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className={styles.section}>
        <h2> Select Type</h2>
     
        {/* Ajout de la sélection des catégories */}
        <div className={styles.inputContainer}>
        <i class="fas fa-chevron-down"></i>
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
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={space.type}
        onChange={(e) => handleApartmentSpaceChange(index, e)}
      />
      <input
        type="text"
        name="area"
        placeholder="Area (sqm)"
        value={space.area}
        onChange={(e) => handleApartmentSpaceChange(index, e)}
      />
      <input
        type="file"
        name="photos"
        accept="image/*"
        multiple
        onChange={(e) => handleFileChange(e, index)}
      />
    </div>
  ))}
  <button type="button" onClick={addApartmentSpace}>
    Add New Space
  </button>
</section>
        <section className={styles.section}>
          <h2>2. Media</h2>
          <input
            type="file"
            name="media"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          <input
            className={styles.fullWidth}
            type="text"
            placeholder="Virtual Tour URL"
            name="virtualTour"
            value={formData.virtualTour}
            onChange={handleChange}
          />
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
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
       
          <input
            type="number"
            placeholder="Latitude (for Google Maps)"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Longitude (for Google Maps)"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
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
          <input
            type="number"
            placeholder="Lot Size in ft2"
            name="lotSize"
            value={formData.lotSize}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
            <input
            type="number"
            placeholder="Beds_Number"
            name="beds_Number"
            value={formData.beds_Number}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Tourist Tax"
            name="touristTax"
            value={formData.touristTax}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Max_Guest"
            name="maxGuest"
            value={formData.maxGuest}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Min_Night"
            name="minNight"
            value={formData.minNight}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Max_Night"
            name="maxNight"
            value={formData.maxNight}
            onChange={handleChange}
          />
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
    name="Check-in_start"
    value={formData.policies["Check-in_start"]}
    onChange={handlePoliciesChange}
    style={{ width: '20%', height: '25%', marginLeft: '10px' }}
  />
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
</label>

<label>
  <input
    type="text"
    placeholder="Cleaning Maintenance"
    name="cleaning_maintenance"
    value={formData.policies.cleaning_maintenance}
    onChange={handlePoliciesChange}
  />
</label>

<label>
  <input
    type="text"
    placeholder="Cancellation Policy"
    name="cancellation_policy"
    value={formData.policies.cancellation_policy}
    onChange={handlePoliciesChange}
  />
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
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
         
        </section>
  
        <button type="submit" onClick={handleNavigate}>Submit Property</button>
      </form>
    );
  };
  
  