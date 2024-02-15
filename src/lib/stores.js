import { writable } from "svelte/store";
import { defaultFrequency, defaultCurrency } from "./constants";

const dayRateStore = writable(0);
const notificationStore = writable(false);

const currencyStore = writable(defaultCurrency);
const currentSavedCurrencyStore = writable(defaultCurrency);

const rateFrequencyStore = writable(defaultFrequency);
const currentRateFrequencyStore = writable(defaultFrequency);

export {
    dayRateStore,
    notificationStore,
    currencyStore,
    currentSavedCurrencyStore,
    rateFrequencyStore,
    currentRateFrequencyStore
}