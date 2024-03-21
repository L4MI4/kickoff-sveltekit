<script lang="ts">
  // Components
  import SettingsNavbar from '$components/SettingsNavbar.svelte';
  import { Separator } from '$components/ui/separator';

  const sidebarNavItems = [
    // {
    //   title: 'User Profile',
    //   href: '/dashboard/profile'
    // },
    {
      title: 'Accounts',
      href: '/dashboard/accounts'
    },
    {
      title: "Companies",
      href: '/dashboard/Companies'
    },
    {
      title: "Stocks",
      href: '/dashboard/Stocks'
    },

  ];
</script>

<div class="space-y-6 p-10 pb-16 md:block">
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
    <p class="text-muted-foreground">Manage all Pharmacies from here.</p>
  </div>
  <Separator class="my-6" />
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <SettingsNavbar items={sidebarNavItems} />
    </aside>
    <div class="flex-1 lg:max-w-4xl">
      <slot />
    </div>
  </div>
</div>
