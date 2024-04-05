<script lang="ts">
  // Utils
  import { crossfade, slide } from 'svelte/transition';

  // Components
  import { Button } from '$components/ui/button';

  // Icons
  import { HamburgerMenu, Exit, Cross1 } from 'svelte-radix';
    import { cubicInOut } from 'svelte/easing';
    import { cn } from '$lib/utils/utils';
    import { page } from '$app/stores';

    const navbarItems = [
    // {
    //   title: 'User Profile',
    //   href: '/dashboard/profile'
    // },
    {
      title: 'Home',
      href: '/'
    },
    {
      title: "About",
      href: '/about'
    },
    {
      title:"Gallery",
      href: '/gallery'
    },
    {
      title: "Dashboard",
      href: '/dashboard/profile'
    },
  ];

  export let user: object | null = null;
  let isMenuOpen = false;
  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });

  const toggleMenuState = (e: Event) => {
    if (e.type === 'focusout' && !isMenuOpen) return;
    isMenuOpen = !isMenuOpen;
  };
</script>

<nav>
  <div class="flex items-center justify-between p-4 shadow-sm">
    <div class="flex-1 px-2 space-x-2">
      
      <a href="/" class="btn-ghost btn text-xl  normal-case">
        <div class={cn(!($page.url.pathname==='/') && 'hover:underline', 'inline hover:bg-transparent',($page.url.pathname==='/') && ' font-bold')}>Home</div>
      </a>
      <!-- add about page -->
      <a href="/about" class="btn-ghost btn text-xl normal-case">
        <div class={cn(!($page.url.pathname==='/about') && 'hover:underline', 'inline hover:bg-transparent',($page.url.pathname==='/about') && ' font-bold')}>About</div>
      </a>
      <a href ="/gallery" class="btn-ghost btn text-xl normal-case">
        <div class={cn(!($page.url.pathname==='/gallery') && 'hover:underline', 'inline hover:bg-transparent',($page.url.pathname==='/gallery')&& ' font-bold')}>Gallery</div>
      </a>
      {#if user}
        <a href="/dashboard/profile" class="btn-ghost btn text-xl normal-case">
          <div class={cn(!($page.url.pathname==='/dashboard/profile') && 'hover:underline', 'inline hover:bg-transparent',($page.url.pathname==='/dashboard/profile')&& ' font-bold')}>Dashboard</div>
          </a>
      {/if}
      
    </div>

    <div class="hidden gap-2 lg:inline-flex">
      {#if !user}
        <Button href="/login" variant="outline" class="transition-none">Login</Button>
        <Button href="/register" variant="outline" class="transition-none">Register</Button>
      {:else}
        <Button href="/settings/profile" variant="outline" class="transition-none">Settings</Button>
        <Button form="logout" type="submit" variant="outline" class="transition-none">
          <Exit class="mr-1 h-4 w-4" />
          Log out
        </Button>
      {/if}
    </div>

    <!-- Mobile Menu Icon -->
    <div class="lg:hidden">
      <Button on:click={toggleMenuState} variant="ghost">
        {#if isMenuOpen}
          <Cross1 />
        {:else}
          <HamburgerMenu />
        {/if}
      </Button>
    </div>
  </div>

  <!-- Mobile Dropdown Menu -->
  {#if isMenuOpen}
    <div transition:slide class="fixed w-full rounded-lg bg-muted lg:hidden">
      <div class="flex w-full flex-col gap-2 p-4">
        {#if !user}
          <Button href="/login" variant="link" on:click={toggleMenuState} class="text-accent-foreground">Login</Button>
          <Button href="/register" variant="link" on:click={toggleMenuState} class="text-accent-foreground"
            >Register</Button
          >
        {:else}
          <Button href="/settings/profile" variant="link" on:click={toggleMenuState} class="text-accent-foreground"
            >Settings</Button
          >
          <Button form="logout" type="submit" variant="link" on:click={toggleMenuState} class="text-accent-foreground">
            <Exit class="mr-1 h-4 w-4" />
            Log out
          </Button>
        {/if}
      </div>
    </div>
  {/if}

  <form id="logout" method="POST" action="/logout" />
</nav>
