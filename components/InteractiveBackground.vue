<script>
export default {
  data() {
    return {
      flashlightX: '0px',
      flashlightY: '0px',
      lightOn: false,
    };
  },
  mounted() {
    // Set the initial background color to black when the component is mounted
    document.body.style.backgroundColor = 'black';
  },
  methods: {
    moveFlashlight(event) {
      this.flashlightX = event.clientX - 60 + 'px'; // Adjust for the flashlight center
      this.flashlightY = event.clientY - 110 + 'px'; // Adjust for the flashlight center
    },
    turnOnLight() {
      this.lightOn = true;
      document.body.style.backgroundColor = 'white';
    },
    turnOffLight() {
      this.lightOn = false;
      document.body.style.backgroundColor = 'black';
    },
  },
  watch: {
    lightOn(newVal) {
      if (!newVal) {
        // When turning off the light, restore the page background color to black
        document.body.style.backgroundColor = 'black';
      }
    },
  },
};
</script>

<template>
    <div class="relative min-h-fit bg-black" @mousemove="moveFlashlight">
        <!-- Flashlight effect -->
        
        <div class="absolute" :style="{ top: flashlightY, left: flashlightX }" >
            <div
                class="w-32 h-32 rounded-full bg-white"
                :class="{ 'ring-8 ring-white': lightOn }"
            ></div>
        </div>
  
    <!-- Light switch button -->
        <div  class="flex flex-col bg-white">
            <button v-if="!lightOn"
                class="absolute top-10 right-10 p-2 text-black rounded-full border border-black p-2"
                @click="turnOnLight"
            > Turn On Light </button>

            <button
                v-else class="absolute top-10 right-10 p-2 text-black rounded-full border border-black p-2"
                @click="turnOffLight"
            > Turn Off Light </button>


            <div v-if="lightOn" class="flex justify-center mt-64 bg-white">
                <h1 class="text-3xl font-bold">Here you go Rock. I built this environment just for you ☺</h1>
            </div>
        </div>
    </div>
  </template>

  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  