<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    // $lib
    import {
        dayRateStore,
        currencyStore,
        currentSavedCurrencyStore,
        rateFrequencyStore,
        currentRateFrequencyStore,
    } from "$lib/stores";
    import { showNotification } from "$lib/notifications";
    import Currencies from "../../components/currencies.svelte";
    import RateFrequencies from "../../components/rateFrequencies.svelte";

    let currency = "";
    let currentSetCurrency = "";

    let currentSetRate = 0;
    let currentRate = 0;

    let rateFrequency = "";
    let currentSetRateFrequency = "";

    dayRateStore.subscribe((x) => {
        currentSetRate = x;
        currentRate = x;
    });

    currencyStore.subscribe((x) => {
        currency = x;
    });

    rateFrequencyStore.subscribe((x) => {
        rateFrequency = x;
    });

    currentSavedCurrencyStore.subscribe((x) => {
        currentSetCurrency = x;
    });

    currentRateFrequencyStore.subscribe((x) => {
        currentSetRateFrequency = x;
    });

    onMount(() => {
        const rate = get(dayRateStore);
        currentSetCurrency = get(currentSavedCurrencyStore);
        currentSetRateFrequency = get(currentRateFrequencyStore);
        currentRate = rate == null ? 0 : rate;
        currentSetRate = currentRate;
    });

    const onModifyRate = () => {
        if (currentRate < 1) return;

        persistRate();

        dayRateStore.update((_) => currentRate);
        currencyStore.update((_) => currency);
        currentSavedCurrencyStore.update((_) => currency);
        rateFrequencyStore.update((_) => rateFrequency);
        currentRateFrequencyStore.update((_) => rateFrequency);

        showNotification();
        goto("/");
    };

    const persistRate = () => {
        localStorage.setItem("storedDayRate", currentRate.toString());
        localStorage.setItem("storedCurrency", currency);
        localStorage.setItem("storedRateFrequency", rateFrequency);
    };
</script>

<div class="p-8 w-full flex justify-center">
    <div class="w-[350px] flex flex- items-center">
        <a
            class="cursor-pointer fixed top-5 right-5 text-3xl"
            href="/"
            title="Home"
        >
            <i class="mi mi-home"></i>
        </a>

        <div class="mt-8 w-full">
            <span
                >Rate is set to {currentSetRate}
                {currentSetCurrency} per {currentSetRateFrequency}</span
            >

            <div class="flex justify-around items-center w-full">
                <div>
                    <input
                        class="w-[100px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="number"
                        type="number"
                        placeholder="Day rate"
                        bind:value={currentRate}
                        min="1"
                    />
                </div>
                <Currencies />
                <span>per</span>
                <RateFrequencies />
            </div>

            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                on:click={onModifyRate}
            >
                Modify
            </button>
        </div>
    </div>
</div>
