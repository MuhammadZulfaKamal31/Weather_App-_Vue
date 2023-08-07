// Mengimport modul createRouter dan createWebHistory dari vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Mengimport komponen HomeView dan CityView dari folder views
import HomeView from '../views/HomeView.vue';
import CityView from "../views/CityView.vue"

// Membuat instance router dengan menggunakan createRouter
// dengan konfigurasi routes dan history
const router = createRouter({
  // Membuat instance history dengan menggunakan createWebHistory dan menggunakan BASE_URL dari environment variable
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Menentukan rute untuk halaman home
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // Meta data untuk rute, di sini digunakan untuk menentukan judul halaman
      meta: {
        title: "Home"
      }
    },
    // Menentukan rute untuk halaman city view
    {
      // Menentukan rute dengan path "/weather/:state/:city"
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
      // Meta data untuk rute, di sini digunakan untuk menentukan judul halaman
      meta: {
        title: "Weather"
      }
    }
  ]
})

//bagaian ini oposional dan gak wajib
// Mendaftarkan global navigation guard menggunakan beforeEach
// router.beforeEach((to, from, next) => {
//   // Menetapkan judul halaman berdasarkan parameter rute (city dan state) atau meta title
//   document.title = `${to.params.state ? `${to.params.city},${to.params.state}` : to.meta.title} | The Local Weather`
//   // Melanjutkan navigasi
//   next();
// })

// Ekspor instance router yang sudah dikonfigurasi
export default router
