<script>
    import { toShortForm } from "$lib/numberFormatHelper";
    import { getTotalWorkingDays } from "$lib/helpers";
    import {
        dayRateStore,
        currentSavedCurrencyStore,
        currentRateFrequencyStore,
    } from "$lib/stores";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    let currentYear = new Date().getFullYear();
    let yearRate = 0;
    let monthRate = 0;
    let dayRate = 0;
    let rate = 0;
    let hourRate = 0;
    let minuteRate = 0;
    let rateFrequency = "";
    let currency = "";

    const calculateRates = () => {
        rateFrequency = get(currentRateFrequencyStore);
        const totalWorkingDays = getTotalWorkingDays(currentYear);

        switch (rateFrequency) {
            case "Hour":
                yearRate = rate * totalWorkingDays * 8;
                monthRate = rate * 20 * 8;
                dayRate = rate * 8;
                hourRate = rate;
                break;
            case "Day":
                yearRate = rate * totalWorkingDays;
                monthRate = rate * 20;
                dayRate = rate;
                hourRate = dayRate / 8;
                break;
            case "Month":
                yearRate = rate * 12;
                monthRate = rate;
                dayRate = rate / 20;
                hourRate = dayRate / 8;
                break;
            case "Year":
                yearRate = rate;
                monthRate = rate / 12;
                dayRate = rate / totalWorkingDays;
                hourRate = dayRate / 8;
                break;
            default:
                break;
        }

        minuteRate = hourRate / 60;
    };

    dayRateStore.subscribe((x) => {
        rate = x;
    });

    currentSavedCurrencyStore.subscribe((x) => {
        currency = x;
    });

    currentRateFrequencyStore.subscribe((x) => {
        rateFrequency = x;
        calculateRates();
    });

    onMount(() => {
        test();
    });

    export let data;
    async function test() {
        const resp = await fetch("/api/test", {
            method: "POST",
            body: JSON.stringify({ test: "test"}),
            headers: {
                "content-type": "application/json",
            }
        });

        const val = await resp.json();
        console.log(val);
    }
</script>

<div class="p-8 flex flex-col items-center font-serif">
    <a
        class="cursor-pointer fixed top-5 right-5 text-3xl"
        href="/settings"
        title="Settings"
    >
        <i class="mi mi-settings"></i>
    </a>

    <span class="my-2 text-xl"
        >In {currentYear} with {rate} {currency} per {rateFrequency}, you earn:</span
    >
    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(yearRate)}</span>
        <div class="mx-4 text-xl">
            <span class="font-bold">{currency}</span>
            <span class="italic">per year</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(monthRate)}</span>
        <div class="mx-4 text-xl">
            <span class="font-bold">{currency}</span>
            <span class="italic">per month</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(dayRate)}</span>
        <div class="mx-4 text-xl">
            <span class="font-bold">{currency}</span>
            <span class="italic">per day</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(hourRate)}</span>
        <div class="mx-4 text-xl">
            <span class="font-bold">{currency}</span>
            <span class="italic">per hour</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(minuteRate)}</span>
        <div class="mx-4 text-xl">
            <span class="font-bold">{currency}</span>
            <span class="italic">per minute</span>
        </div>
    </div>
</div>
