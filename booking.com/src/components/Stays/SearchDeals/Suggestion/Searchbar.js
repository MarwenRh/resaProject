import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PiMapPinAreaThin } from 'react-icons/pi';

mapboxgl.accessToken = 'pk.eyJ1IjoieW9zcmNoYXJlazMxIiwiYSI6ImNsdDZkd2JzcTBjcHYybW12NzE4aGNseDYifQ.pv6x004655o_tl9uncoxag';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-input': {
        height: '20px', // Adjust height if needed
        backgroundColor: 'white',
        padding: '8px',
        color: 'rgb(85, 84, 84)',
        fontWeight: '500',
        fontSize: '18px',
        marginRight: '10px', // Adjust padding if needed
    },
});

export default function SearchBar({ destination, onChange }) {
    const [inputValue, setInputValue] = useState(destination);
    const [suggestions, setSuggestions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (destination) {
            setInputValue(destination);
        }
    }, [destination]);

    const handleSearchInput = (event, newInputValue) => {
        setInputValue(newInputValue);
        onChange(newInputValue);

        const trimmedInputValue = newInputValue.trim();
        if (!trimmedInputValue) {
            setSuggestions([]);
            return;
        }

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${trimmedInputValue}.json?access_token=${mapboxgl.accessToken}&types=address,poi,place,locality`)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.features);
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
    };

    const handleSuggestionClick = (event, newValue) => {
        if (newValue) {
            const selectedPlace = newValue.place_name;
            setInputValue(selectedPlace);
            setSuggestions([]);
            onChange(selectedPlace);
            handleNavigation(selectedPlace);
        }
    };

    const handleNavigation = (dest) => {
        history.push(`/search/${encodeURIComponent(dest)}`);
    };

    return (
        <Autocomplete
            sx={{
                width: 402,
                outlineColor: 'white',
                outlineWidth: 0,
                borderColor: 'white',
                height: 35,
                marginTop: -1,
            }}
            freeSolo
            disableClearable
            options={suggestions}
            getOptionLabel={(option) => option.place_name || ''}
            inputValue={inputValue}
            onInputChange={handleSearchInput}
            onChange={handleSuggestionClick}
            renderOption={(props, option) => (
                <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                    <PiMapPinAreaThin style={{ marginRight: '8px', color: '#04668a' }} />
                    {option.place_name}
                </li>
            )}
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    label={inputValue ? '' : 'Where are you going?'}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setInputValue('');
                                        onChange('');
                                    }}
                                    edge="end"
                                    sx={{ marginRight: '5px' }}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}
