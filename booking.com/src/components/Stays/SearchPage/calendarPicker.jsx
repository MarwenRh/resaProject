import React, { useState } from 'react'; // Import React and useState
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { enGB } from 'date-fns/locale'; // import your desired locale

export const CalendarPicker = () => { // Use PascalCase for the component name
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setDate(ranges.selection); // Update the date state with the new range
  };

  return (
    <DateRangePicker
      ranges={[date]}
      onChange={handleSelect}
      locale={enGB} // Pass the locale here
    />
  );
};
