<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  let w;
  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  .modal-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);

    .modal {
      background-color: white;
      border-radius: 15px;
      padding: 20px;
      width: 50%;
    }
  }
</style>

<div class="modal-bg" transition:fade bind:clientWidth={w}>
  <div class="modal" transition:fly={{ y: -100 }}>
    <button
      on:click={() => {
        dispatch('close');
      }}>Close</button>
    <!-- <slot>optional fallback</slot> -->
    <!-- <slot name="modal" /> -->
    <div>Browser Width: {w}</div>
    <slot />
  </div>
</div>
