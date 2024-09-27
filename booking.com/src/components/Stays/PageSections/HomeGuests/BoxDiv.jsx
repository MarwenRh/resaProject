import styled from "styled-components";
import { useHistory } from 'react-router-dom';

const Div = styled.div`
  width: 240px;
  overflow: hidden;
  margin: 0;
  cursor: pointer;
  text-align: center; /* Center align text */
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    display: block;
    margin-bottom: 8px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  p {
    margin: 0;
    margin-right: 8px;
  }
`;

const Title = styled.p`
  color: rgb(38, 38, 38);
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  color: #6b6b6b;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Price = styled.p`
  margin-top: 8px !important;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 4px !important;
`;

const Rating = styled.p`
  padding: 5px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  background: #003580;
  color: #fff;
  border-radius: 5px 5px 5px 0;
`;

const Reviews = styled.p`
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  margin-top: 2px;
  line-height: 1;
  color: #6b6b6b;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center; /* Center align items */
  align-items: center;
`;

const OfferTag = styled.div`
  font-size: 12px;
  color: white;
  background-color: #6898AA;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  display: inline-block;
`;

export const BoxDiv = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/search/${props.city}/${props.id}`);
  };

  return (
    <Div onClick={handleClick}>
      <img src={props.url} alt={props.name} />
      <Title>{props.name}</Title>
      <Subtitle>{props.city}</Subtitle>
      <Price>Starting from ₹{props.price}</Price>
      {props.offer && <OfferTag>{props.offer}</OfferTag>}
      <FlexDiv>
        <Rating>{props.rating}</Rating>
        <Reviews>&nbsp;&nbsp;{props.reviews} reviews</Reviews>
      </FlexDiv>
    </Div>
  );
};
