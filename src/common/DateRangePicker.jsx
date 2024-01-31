import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePickerComponent = (props) => {

    const [startDate, endDate] = props.dateRange;

    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
                props.setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Select date range"
        />
    )

};

export default DateRangePickerComponent;