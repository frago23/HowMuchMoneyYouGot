<script>
    import { rateFrequencyStore } from "$lib/stores";
    import { frequencies } from "$lib/constants";

    function handleChange(event) {
        rateFrequencyStore.set(event.target.value);
    }
</script>

<div class="relative inline-block text-left my-4">
    <select
        class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={$rateFrequencyStore}
        on:change={handleChange}
    >
        {#each frequencies as frequency}
            <option value={frequency}>{frequency}</option>
        {/each}
    </select>
    <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
        <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path d="M10 12l-6-6 1.5-1.5L10 9.8l4.5-4.5L16 6z" />
        </svg>
    </div>
</div>
