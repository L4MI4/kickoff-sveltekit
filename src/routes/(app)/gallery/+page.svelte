<script>
    import {Gallery} from "./images"
    import {AspectRatio} from "$lib/components/ui/aspect-ratio"
    </script>

<div class= "flex flex-row h-auto gap-5 pt-20 justify-center w-screen ">
    {#each Gallery as image}
    <!-- <AspectRatio class="bg-muted"> -->
        <img src={image.cover}
          alt={image.artist}
          class="rounded-md object-cover max-h-[700px] max-w-[250px]"
        />
      <!-- </AspectRatio>    -->
    
    {/each}
</div>
