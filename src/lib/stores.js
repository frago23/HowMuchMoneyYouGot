import { writable } from "svelte/store";

const dayRateStore = writable(0);
const notificationStore = writable(false);
const currencyStore = writable('EUR');

export {
    dayRateStore,
    notificationStore,
    currencyStore
}