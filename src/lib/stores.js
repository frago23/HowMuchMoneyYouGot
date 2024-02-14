import { writable } from "svelte/store";

const dayRateStore = writable(0);
const notificationStore = writable(false);

export {
    dayRateStore,
    notificationStore
}