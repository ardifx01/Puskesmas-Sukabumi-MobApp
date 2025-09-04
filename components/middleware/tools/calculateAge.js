import React from 'react';

export default function calculateAge(date1, date2) {
    const calculatedAge = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && date2.getDate() < date1.getDate())) {
        console.log("Age Calculated ! ", calculatedAge - 1);
        return calculatedAge - 1;
    } else {
        console.log("Age Calculated ! ", calculatedAge);
        return calculatedAge;
    }
};