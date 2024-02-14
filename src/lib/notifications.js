import { notificationStore } from "./stores";

const showNotification = () => {
    notificationStore.update(_ => true);

    setTimeout(() => {
        notificationStore.update(_ => false);
    }, 5000);
}

export {
    showNotification
}