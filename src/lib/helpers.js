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

function persistRates(currentRate, currency, rateFrequency) {
    localStorage.setItem("storedDayRate", currentRate.toString());
    localStorage.setItem("storedCurrency", currency);
    localStorage.setItem("storedRateFrequency", rateFrequency);
}

import { dayRateStore, currencyStore, currentSavedCurrencyStore, rateFrequencyStore, currentRateFrequencyStore } from "$lib/stores.js";
function updateStores(currentRate, currency, rateFrequency) {
    dayRateStore.update((_) => currentRate);
    currencyStore.update((_) => currency);
    currentSavedCurrencyStore.update((_) => currency);
    rateFrequencyStore.update((_) => rateFrequency);
    currentRateFrequencyStore.update((_) => rateFrequency);
}

export {
    getTotalWorkingDays,
    persistRates,
    updateStores
}