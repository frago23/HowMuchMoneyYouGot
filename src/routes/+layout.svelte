<script>
    import "../app.css";
    import { notificationStore, dayRateStore, currentSavedCurrencyStore, currentRateFrequencyStore, currencyStore, rateFrequencyStore } from "$lib/stores";
    import { onMount } from "svelte";

    let show = false;
    notificationStore.subscribe(x => {
        show = x;
    })

    onMount(async () => {
        const storedDayRate = localStorage.getItem("storedDayRate");
        const storedCurrency = localStorage.getItem("storedCurrency");
        const storedRateFrequency = localStorage.getItem("storedRateFrequency");

        if (storedDayRate) {
            dayRateStore.update((_) => +storedDayRate);
        }

        if (storedCurrency) {
            currencyStore.update((_) => storedCurrency);
            currentSavedCurrencyStore.update((_) => storedCurrency);
        }

        if (storedRateFrequency) {
            rateFrequencyStore.update((_) => storedRateFrequency);
            currentRateFrequencyStore.update((_) => storedRateFrequency);
        }
    });
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
    />
</svelte:head>

<slot />

{#if show}
    <div
        class="fixed bottom-3 right-3 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md opacity-85"
        role="alert"
    >
        <div class="flex justify-start items-center">
            <i class="mi mi-check mx-2"></i>
            <p class="font-bold">Settings updated</p>
        </div>
    </div>
{/if}

<style>
    :global(body) {
        background-color: #1d3040;
        color: #4ac4e2;
        transition: background-color 0.3s;
    }
</style>
