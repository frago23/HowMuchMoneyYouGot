<script>
    import { onMount } from "svelte";
    import { toShortForm } from "$lib/numberFormatHelper";
    import { dayRateStore, currencyStore } from "$lib/stores";
    import { get } from "svelte/store";

    let yearRate = 0;
    let monthRate = 0;
    let hourRate = 0;
    let minuteRate = 0;
    let currency = '';

    onMount(async () => {
        const dayRate = get(dayRateStore);
        currency = get(currencyStore);
        yearRate = dayRate * 240;
        monthRate = dayRate * 20;
        hourRate = dayRate / 8;
        minuteRate = hourRate / 60;
    });

    // export let data;
    // async function test() {
    //     const resp = await fetch("/api/test", {
    //         method: "POST",
    //         body: JSON.stringify({ t }),
    //         headers: {
    //             "content-type": "application/json",
    //         }
    //     });

    //     val = await resp.json();
    //     console.log(val);
    // }
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
        >With {get(dayRateStore)} {currency} day rate, you earn:</span
    >
    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(yearRate)}</span>
        <div class='mx-4 text-xl'>
            <span class='font-bold'>{currency}</span>
            <span class="italic ">per year</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(monthRate)}</span>
        <div class='mx-4 text-xl'>
            <span class='font-bold'>{currency}</span>
            <span class="italic">per month</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl"
            >{toShortForm(get(dayRateStore))}</span
        >
        <div class='mx-4 text-xl'>
            <span class='font-bold'>{currency}</span>        
            <span class="italic">per day</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(hourRate)}</span>
        <div class='mx-4 text-xl'>
            <span class='font-bold'>{currency}</span>        
            <span class="italic">per hour</span>
        </div>
    </div>

    <div class="w-full flex justify-center items-end my-8">
        <span class="my-2 text-5xl">{toShortForm(minuteRate)}</span>
        <div class='mx-4 text-xl'>
            <span class='font-bold'>{currency}</span>        
            <span class="italic">per minute</span>
        </div>
    </div>
</div>
