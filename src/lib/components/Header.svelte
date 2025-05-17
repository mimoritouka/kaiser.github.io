<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { slide, fade, scale } from "svelte/transition";

    let isMobile = $state(false);
    let menuOpen = $state(false);
    
    type path = {
        path: string,
        title: string,
        icon?: string
    };

    const pages: path[] = [
        {path: "/", title: "Ana Sayfa", icon: "fa-solid fa-home"},
        {path: "/#tech_stack", title: "Tech Stack", icon: "fa-solid fa-code"},
        {path: "/#goals", title: "Hedeflerim", icon: "fa-solid fa-bullseye"},
    ] 

    const mobileRange = 768; // Increased for better tablet support

    let innerWidth = $state(mobileRange);
    let scrollY = $state(0);
    let headerElevated = $state(false);

    function openMenu() {
        menuOpen = !menuOpen;
    }

    function checkIsMobile() {
        isMobile = innerWidth <= mobileRange;
    }

    function handleScroll() {
        headerElevated = scrollY > 10;
    }

    function navigateTo(path: string) {
        goto(path);
        if (menuOpen) menuOpen = false;
    }

    onMount(() => {
        checkIsMobile();
    });

    $effect(() => {
        checkIsMobile();
    });
</script>

<svelte:window 
    bind:innerWidth 
    bind:scrollY
    onscroll={handleScroll}
/>

<header class={`sticky top-0 z-50 transition-all duration-300 ${headerElevated ? 'shadow-md' : ''}`}>
    <div class={`flex justify-center mobile:justify-end items-center px-6 py-3 ${headerElevated ? 'bg-white/95 dark:bg-gray-900/95' : 'bg-white/80 dark:bg-gray-900/80'} backdrop-blur-md transition-all duration-300`}>

        <!-- Desktop Navigation -->
        {#if !isMobile}
            <nav class="flex items-center">
                <ul class="flex gap-1">
                    {#each pages as page}
                        <li>
                            <button 
                                class="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-black/10 dark:hover:bg-white/10 relative group"
                                onclick={() => navigateTo(page.path)}
                            >
                                {#if page.icon}
                                    <i class={`${page.icon} mr-2 text-gray-500 dark:text-gray-400`}></i>
                                {/if}
                                {page.title}
                            </button>
                        </li>
                    {/each}
                </ul>
            </nav>
        {:else}
            <!-- Mobile menu button -->
            <button 
                class="p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center"
                aria-label="menu" 
                aria-expanded={menuOpen}
                onclick={openMenu}
            >                                <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300"></span>
                <i class={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
        {/if}
    </div>

    <!-- Mobile Navigation Menu -->
    {#if menuOpen && isMobile}
        <button aria-label="menu" 
            transition:fade={{duration: 100}}
            class="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10"
            onclick={() => menuOpen = false}
        ></button>
        <nav 
            transition:scale={{duration: 200, start: 0.7}}
            class="absolute rounded-2xl top-full mt-3 right-4 w-50 p-2 bg-white dark:bg-gray-800 shadow-lg overflow-hidden z-50 origin-top-right"
        >
            <ul class="py-2">
                {#each pages as page}
                    <li>
                        <button 
                            class="w-full rounded-2xl text-left px-6 py-3 flex items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            onclick={() => navigateTo(page.path)}
                        >
                            {#if page.icon}
                                <i class={`${page.icon} mr-3 text-gray-500 dark:text-gray-400 w-5 text-center`}></i>
                            {/if}
                            <span class="text-sm font-medium">{page.title}</span>
                        </button>
                    </li>
                {/each}
            </ul>
        </nav>
    {/if}
</header>