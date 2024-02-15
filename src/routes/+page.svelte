<script>
    import { toHumanReadable, toShortForm } from "$lib/numberFormatHelper";
    import { getTotalWorkingDays } from "$lib/helpers";
    import {
        dayRateStore,
        currentSavedCurrencyStore,
        currentRateFrequencyStore,
    } from "$lib/stores";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    import ExchangeRates from "../components/exchangeRates.svelte";
    import Loader from "../components/loader.svelte";

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
    });

    let showLoader = true;
    onMount(() => {
        setTimeout(() => {
            calculateRates();
            fetchRates();
            showLoader = false;
        }, 1000);
    });

    export let rates;
    async function fetchRates() {
        const lastFetchDate = localStorage.getItem("lastFetchDate");
        const storedRatesStr = localStorage.getItem("exchangeRates");
        const storedRates = JSON.parse(storedRatesStr);
        console.log(storedRates.currency, currency);
        if (
            lastFetchDate &&
            storedRates &&
            storedRates.currency == currency &&
            new Date() - new Date(lastFetchDate) < 1000 * 60 * 60 * 5
        ) {
            rates = storedRates.exchangeRates;
            return;
        }

        if (!currency) return;
        const resp = await fetch("/api/test", {
            method: "POST",
            body: JSON.stringify({ currency }),
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await resp.json();
        rates = data.data;
        const ratesForCurrency = {
            currency,
            exchangeRates: rates,
        };

        localStorage.setItem("exchangeRates", JSON.stringify(ratesForCurrency));
        localStorage.setItem("lastFetchDate", new Date());
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
        >In {currentYear} with {rate}
        {currency} per {rateFrequency}, you earn:</span
    >

    <Loader show={showLoader} />

    {#if !showLoader}
        <div class="flex flex-col my-4">
            <div class="w-full flex justify-center items-end">
                <span class="my-2 text-5xl">{toHumanReadable(yearRate)}</span>
                <div class="mx-4 text-xl">
                    <span class="font-bold">{currency}</span>
                    <span class="italic">per year</span>
                </div>
            </div>

            <ExchangeRates data={rates} value={yearRate} />
        </div>

        <div class="flex flex-col my-4">
            <div class="w-full flex justify-center items-end">
                <span class="my-2 text-5xl">{toHumanReadable(monthRate)}</span>
                <div class="mx-4 text-xl">
                    <span class="font-bold">{currency}</span>
                    <span class="italic">per month</span>
                </div>
            </div>

            <ExchangeRates data={rates} value={monthRate} />
        </div>

        <div class="flex flex-col my-4">
            <div class="w-full flex justify-center items-end">
                <span class="my-2 text-5xl">{toHumanReadable(dayRate)}</span>
                <div class="mx-4 text-xl">
                    <span class="font-bold">{currency}</span>
                    <span class="italic">per day</span>
                </div>
            </div>

            <ExchangeRates data={rates} value={dayRate} />
        </div>

        <div class="flex flex-col my-4">
            <div class="w-full flex justify-center items-end">
                <span class="my-2 text-5xl">{toHumanReadable(hourRate)}</span>
                <div class="mx-4 text-xl">
                    <span class="font-bold">{currency}</span>
                    <span class="italic">per hour</span>
                </div>
            </div>

            <ExchangeRates data={rates} value={hourRate} />
        </div>

        <div class="flex flex-col my-4">
            <div class="w-full flex justify-center items-end">
                <span class="my-2 text-5xl">{toHumanReadable(minuteRate)}</span>
                <div class="mx-4 text-xl">
                    <span class="font-bold">{currency}</span>
                    <span class="italic">per minute</span>
                </div>
            </div>

            <ExchangeRates data={rates} value={minuteRate} />
        </div>
    {/if}
</div>
