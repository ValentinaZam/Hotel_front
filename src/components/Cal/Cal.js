import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';

function Cal() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date, dateString) => {
        setSelectedDate(dateString);
    };

    const handleOk = () => {
        console.log('Selected Date:', selectedDate);
    };

    return (
        <div className="App">
            <div>
                <label>Select Date:</label>
                <DatePicker onChange={handleDateChange} />
            </div>
            <Button onClick={handleOk} type="primary">OK</Button>
        </div>
    );
}

export default Cal;