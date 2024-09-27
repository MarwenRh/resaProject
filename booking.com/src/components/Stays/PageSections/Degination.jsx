import React, { useState } from 'react';
import styled from 'styled-components';
import DeginationData from './DeginationData';

// Styled components
const Tab = styled.button`
  margin-right: 15px;
  font-size: 14px;
  background: ${({ active }) => (active ? '#0071C2' : 'transparent')};
  border: ${({ active }) => (active ? '1px solid #0071C2' : '1px solid #ccc')};
  outline: none;
  padding: 10px 20px;
  cursor: pointer;
  color: ${({ active }) => (active ? 'white' : 'black')};
  transition: all ease-in-out 0.2s;
  border-radius: 5px;
  ${({ active }) =>
    active &&
    `
    background-color: #0071C2;
    color: white;
  `}

  &:hover {
    background-color: ${({ active }) => (active ? '#0056a3' : '#f1f1f1')};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Separator = styled.hr`
  border: 0.1px solid #0071C2;
  margin-top: 4px;
  margin-bottom: 20px;
`;

const types = ['Regions', 'Cities', 'Places of Interest'];

export default function Degination() {
  const [active, setActive] = useState(types[0]);

  return (
    <Container>
      <Title>Destinations we love</Title>
      <ButtonGroup>
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <Separator />
      <DeginationData v={active}></DeginationData>
    </Container>
  );
}
