<template >
    <header class="sticky top-0 bg-weather-primary shadow-lg z-50">
        <nav class=" container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class=" flex items-center gap-3">
                    <i class=" fa-solid fa-sun text-2xl"></i>
                    <p class=" text-2xl">The Local Weather</p>
                </div>
            </RouterLink>

            <div class=" flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
                    @click="toggleModel"></i>

                <!-- menambahakanya ke local storage -->
                <i class="fa-solid fa-plus hover:text-weather-secondary text-xl" @click="addCity"
                    v-if="route.query.preview"></i>
                <!-- vi-if diatas ngecek bagian router nya ada prefiew gak, kalau gak ada berarti ilang -->
            </div>
            <!-- contoh penggunaan emit dan props secara bersamaan -->
            <BaseModel :modalActive="modalActive" @close-modal="toggleModel">
                <div class=" text-black">
                    <h1 class=" text-2xl mb-1"> About</h1>
                    <p class=" mb-4">
                        The Local Weather allows you to track the current and future weather of cities of your choosing
                    </p>
                    <h2 class=" text-2xl"> How It works: </h2>
                    <ol class=" list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into search bar
                        </li>
                        <li>
                            Select a citywithin the result, this will take you to the current weather for your selection
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the top right. This will save the city to view at
                            a letter time on the home page
                        </li>
                    </ol>
                    <h2 class="text-2xl">
                        Removing a city
                    </h2>
                    <p>
                        If ypu no longer wish to track a city, simply select thr city within the home page, at the bottom of
                        the page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModel>
        </nav>
    </header>
</template>
<script setup>
import { uid } from "uid";
import { ref } from "vue";
import BaseModel from "../components/BaseModal.vue"
//route link buat ngelink langsung ke html nya, kalau useroute buat ambil data di parameternya, kalau useRouter cocok melakaukan navigasi script setup nya
import { RouterLink, useRoute, useRouter } from "vue-router"

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
//method buat nambah kelocalStorage
const addCity = () => {
    // Mengecek apakah ada data "savedCities" di localStorage
    // Jika ada, mengambil data tersebut dan menyimpannya di variabel savedCities
    //Dengan cara ini, jika ada data "savedCities" yang sudah tersimpan sebelumnya di localStorage, kita akan mengisinya kembali ke variabel savedCities sehingga kita bisa melanjutkan manipulasi data tersebut.
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    }

    // Membuat objek locationObj yang berisi informasi kota yang akan ditambahkan
    // mengambil data dari params nya
    const locationObj = {
        id: uid(), // Membuat ID unik untuk lokasi menggunakan fungsi uid()
        state: route.params.state, // Mengambil state dari parameter rute
        city: route.params.city, // Mengambil city dari parameter rute
        coords: {
            lat: route.query.lat, // Mengambil latitude dari query parameter rute
            lng: route.query.lng  // Mengambil longitude dari query parameter rute
        }
    };

    // Menambahkan locationObj ke dalam daftar lokasi (savedCities)
    savedCities.value.push(locationObj);

    // Menyimpan ulang daftar lokasi (savedCities) ke dalam localStorage sebagai string JSON
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

    // Membuat salinan query parameter saat ini dan menghapus query parameter "preview"
    // Kemudian menggunakan router.replace untuk mengganti URL tanpa query parameter "preview"
    let query = Object.assign({}, route.query);
    delete query.preview;
    //menambhakan id di query supaya bisa menggunakan fitur remove
    query.id = locationObj.id;
    router.replace({ query });
}


const modalActive = ref(null);
const toggleModel = () => {
    modalActive.value = !modalActive.value;
}
</script>


