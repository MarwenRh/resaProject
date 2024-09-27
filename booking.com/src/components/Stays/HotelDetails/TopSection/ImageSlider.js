import React, { useState, useEffect } from 'react';
import axios from 'axios';

const sliderStyles = {
  position: "relative",
  height: "400px",
  margin: "0 auto",
  maxWidth: "900px",
};

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const arrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "30px",
  color: "gray",
  zIndex: 1,
  cursor: "pointer",
};

const rightArrowStyles = {
  ...arrowStyles,
  right: "10px",
};

const leftArrowStyles = {
  ...arrowStyles,
  left: "10px",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "12px",
  color: "gray",
};

const ImageSlider = ({ id }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/properties/getImages/${id}`);
        setImages(res.data);
        console.log(res.data);
        console.log(id);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [id]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentImage = images[currentIndex];

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: currentImage ? `url(${currentImage})` : '',
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div style={slideStylesWithBackground}></div>
      <div style={dotsContainerStyles}>
        {images.map((_, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
