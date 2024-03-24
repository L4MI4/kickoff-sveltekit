<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import type { PageData } from "./$types.js";
    import CompanyForm from "./company-form.svelte";

	export let data;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Admin-Company</h3>
		<p class="text-sm text-muted-foreground">
			Edit company details.
		</p>
	</div>
	<Separator />
	<CompanyForm data={data} />
</div>