function getTotalWorkingDays(currentYear) {
    const startDate = new Date(currentYear, 1, 1);
    const endDate = new Date(currentYear, 12, 31);
    let workingDays = 0;

    while (startDate <= endDate) {
        if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
            workingDays++;
        }
        startDate.setDate(startDate.getDate() + 1);
    }
    
    return workingDays;
}

export {
    getTotalWorkingDays
}