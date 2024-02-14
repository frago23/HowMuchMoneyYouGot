<script>
    import "../app.css";
    import { notificationStore, dayRateStore } from "$lib/stores";
    import { onMount } from "svelte";

    let show = false;
    notificationStore.subscribe(x => {
        show = x;
    })
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
        class="fixed top-3 right-3 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md opacity-85"
        role="alert"
    >
        <div class="flex justify-start items-center">
            <i class="mi mi-check mx-2"></i>
            <p class="font-bold">Day rate updated</p>
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
