<script setup>
import InteractiveBackground from '~/components/InteractiveBackground.vue';
</script>

<template>
    <div class="min-h-screen grid grid-rows-[auto,1fr,auto]">
    <!-- Header -->
    <header class="bg-cyan-800 py-3">
      <div class="container mx-auto">
        <h1 class="text-3xl text-white font-semibold text-center">A Beautiful Place For Football Stats</h1>
      </div>
    </header>

    <!-- Main Body -->
    <main class="">
        <div class="">
            <InteractiveBackground />
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-cyan-800 py-4">
      <div class="container mx-auto">
        <!-- Footer content goes here -->
        <p class="text-white text-center">© Football Stats Are Super Cool 2023</p>
      </div>
    </footer>
  </div>
</template>

<style>

</style>