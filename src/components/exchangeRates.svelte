<script>
    import { toHumanReadable } from "$lib/numberFormatHelper";

    export let data = {};
    export let value = 0;
</script>

{#if data}
    <div class="flex flex-col items-center text-sm">
        {#each Object.entries(data) as [currency, rate]}
            <div class='flex justify-evenly w-full'>
                <span>{toHumanReadable(rate * value)}</span>
                <span>{currency}</span>
            </div>
        {/each}
    </div>
{/if}
