<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    // $lib
    import { dayRateStore, currencyStore } from "$lib/stores";
    import { showNotification } from "$lib/notifications";
    import Currencies from "../../components/currencies.svelte";

    let currency = '';
    let currentSetCurrency = '';

    let currentSetRate = 0;
    let currentRate = 0;

    currencyStore.subscribe(x => {
        currency = x;
    })

    onMount(() => {
        const rate = get(dayRateStore);
        currentSetCurrency = get(currencyStore);
        currentRate = rate == null ? 0 : rate;
        currentSetRate = currentRate;
    });

    const onModifyRate = () => {
        if (currentRate < 1) return;

        persistRate();
        dayRateStore.update((_) => currentRate);
        currencyStore.update((_) => currency);
        showNotification();
        goto("/");
    };

    const persistRate = () => {
        localStorage.setItem("rate", currentRate.toString());
    };
</script>

<div class="p-8 w-full flex justify-center">
    <div class='w-[300px] flex flex- items-center'>
        <a
            class="cursor-pointer fixed top-5 right-5 text-3xl"
            href="/"
            title="Home"
        >
            <i class="mi mi-home"></i>
        </a>

        <div class="mt-8">
            <span>Your current day rate is set to {currentSetRate} {currentSetCurrency}</span>

            <Currencies />

            <div class="my-4">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="number"
                    type="number"
                    placeholder="Day rate"
                    bind:value={currentRate}
                    min="1"
                />
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
