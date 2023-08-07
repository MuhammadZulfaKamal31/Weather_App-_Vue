<template>
  <div class="flex flex-col min-h-screen font-roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <!-- Menggunakan transisi saat berpindah halaman (dengan mode out-in) -->
      <transition name="page" mode="out-in">
        <!-- Menampilkan komponen yang sesuai dengan rute saat ini -->
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";

</script>
<style >
/* Animasi transisi saat halaman masuk atau keluar */
.page-enter-active,
.page-leave-to {
  transition: 600ms ease all;
}

/* Animasi saat halaman masuk */
.page-enter-from {
  opacity: 0;
}

/* Animasi saat halaman keluar */
.page-leave-from {
  opacity: 1;
}

.page-leave-to {
  opacity: 0;
}
</style>