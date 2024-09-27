import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const DataContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 10px;
`;

const DataItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9e9e9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ItemTitle = styled.p`
  color: #4A9AD4;
  font-size: 15px;
  margin-bottom: 8px;
`;

const ItemCount = styled.p`
  color: #A5A5A5;
  font-size: 14px;
  margin-top: 10px;
`;

const DeginationData = ({ v }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [v]);

  const getData = () => {
    axios.get("https://manishsinghbhadouria.github.io/api/db.json").then((response) => {
      if (v === 'Regions') {
        setData(response.data[0].regions);
      } else if (v === 'Cities') {
        setData(response.data[0].cities);
      } else {
        setData(response.data[0].interests);
      }
    });
  };

  return (
    <div>
      {data && (
        <DataContainer>
          {data.map((el) => (
            <DataItem key={el.name}>
              <ItemTitle>{el.name}</ItemTitle>
              <ItemCount>{el.properties}</ItemCount>
            </DataItem>
          ))}
        </DataContainer>
      )}
    </div>
  );
};

export default DeginationData;
