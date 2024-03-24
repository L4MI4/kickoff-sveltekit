<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import type { PageData } from "./$types.js";
    import StockForm from "./stock-form.svelte";

	export let data;
	// console.log(data)
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Admin-Stock</h3>
		<p class="text-sm text-muted-foreground">
			Add a new Stock.
		</p>
	</div>
	<Separator />
	<StockForm data={data} />
</div>