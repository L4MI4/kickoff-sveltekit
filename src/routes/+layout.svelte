<script lang="ts">
  // Stores
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { jsStatus } from '$lib/stores/js_status';

  // Utils
  import { onNavigate, disableScrollHandling } from '$app/navigation';
  import { getFlash } from 'sveltekit-flash-message/client';

  // Components
  import SEO from '$components/SEO.svelte';
  import Navbar from '$components/Navbar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import Flash from '$components/Flash.svelte';
  import ThemeSwitcher from '$components/ThemeSwitcher.svelte';

  // Styles
  import '../styles/app.css';

  export let data;

  const flash = getFlash(page, {
    clearOnNavigate: true,
    clearAfterMs: 3000,
    clearArray: true
  });

  if (browser) {
    $jsStatus = 'enabled';
  }

  // Disable scroll handling on same route navigation for theme switching
  onNavigate((navigation) => {
    const previousRoute = navigation.from?.url.pathname;
    const currentRoute = navigation.to?.url.pathname;

    if (previousRoute === currentRoute) {
      disableScrollHandling();
    }
  });
</script>

<SEO {...$page.data.metadata} url={$page.url.href} />

<Toaster position="bottom-center" closeButton />

<Navbar user={data.user} />

<main class="container mx-auto flex flex-1 flex-col p-4 md:px-0 md:py-2">
  <slot />

  <div class="fixed bottom-5 right-0">
    <ThemeSwitcher />
  </div>
</main>

{#if $flash}
  <div class="fixed bottom-0 w-full overflow-hidden">
    <Flash type={$flash.type} message={$flash?.message} />
  </div>
{/if}
