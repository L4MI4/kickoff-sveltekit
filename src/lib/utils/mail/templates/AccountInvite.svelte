<script lang="ts">
  import { Heading, Hr, Html, Button } from 'svelte-email';
  export let url: string;
</script>

<Html lang="en">
  <Heading as="h1">You are invited to join our Pharmacy account</Heading>
  <Button href={url}>Click here to join</Button>
  <Hr />
</Html>
