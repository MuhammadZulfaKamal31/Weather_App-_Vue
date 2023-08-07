<template >
    <div v-for=" city in savedCities" :key="city.id">
        <CityCard :city="city" @click="gotoCityView(city)" />
    </div>
    <p v-if="savedCities.length === 0">
        No location added.Typo start tracking a location, search in the field above</p>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { useRoute, useRouter } from 'vue-router';
const savedCities = ref([]);

const getCities = async () => {
    // Cek apakah ada data "savedCities" di localStorage
    if (localStorage.getItem('savedCities')) {
        // Jika ada, ambil data "savedCities" dari localStorage dan parse menjadi objek JavaScript
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

        // Buat array untuk menyimpan semua permintaan axios
        const request = [];

        // Loop melalui setiap kota dalam "savedCities"
        savedCities.value.forEach((city) => {
            // Buat permintaan axios untuk mengambil data cuaca dari API OpenWeatherMap berdasarkan koordinat kota
            const axiosRequest = axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
            );
            // Tambahkan permintaan axios ke dalam array "request"
            request.push(axiosRequest);
        });

        // Jalankan semua permintaan axios secara paralel menggunakan Promise.all
        // Promise.all akan menunggu sampai semua permintaan selesai
        const weatherData = await Promise.all(request);

        //flicker data
        await new Promise((res) => setTimeout(res, 1000));
        // Loop melalui hasil data cuaca yang diterima dari API
        weatherData.forEach((value, index) => {
            // Set data cuaca ke dalam objek "weather" untuk kota yang sesuai dalam "savedCities"
            savedCities.value[index].weather = value.data;
        });
    }
}
await getCities();

// Mengimpor hook useRouter dari vue-router
const router = useRouter();
// Fungsi gotoCityView digunakan untuk berpindah ke halaman "cityView" dengan menyediakan parameter rute dan query parameter
const gotoCityView = (city) => {
    // Menggunakan router.push untuk melakukan navigasi ke halaman "cityView"
    router.push({
        // name: "cityView" adalah nama dari rute yang ingin dituju
        name: "cityView",

        // params: { state: city.state, city: city.city } berisi parameter rute untuk nama negara dan nama kota
        // city.state dan city.city diambil dari objek "city" yang diberikan sebagai argumen ke fungsi gotoCityView
        params: { state: city.state, city: city.city },

        // query: { lat: city.coords.lat, lng: city.coords.lng } berisi query parameter untuk latitude dan longitude
        // city.coords.lat dan city.coords.lng diambil dari objek "city" yang diberikan sebagai argumen ke fungsi gotoCityView
        query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng }
    });
}


</script>
