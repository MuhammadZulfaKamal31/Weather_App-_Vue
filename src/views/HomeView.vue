

<template>
  <main class=" container text-white">
    <div class=" pt-4 mb-8 relative">
      <input @input="getSearchResult" type="text" placeholder="Search for a city or state" v-model="searchQuery"
        class=" py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
      <ul class=" absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResult">
        <p v-if="searchError">
          Sorry, Something went Wrong, please try again</p>
        <p v-if="!searchError && mapboxSearchResult.length === 0">
          No result match your query, try a different term.
        </p>
        <template v-else>
          <!-- ambil data dari looping nya di parameater -->
          <li @click="previewCity(searchResult)" v-for="searchResult in mapboxSearchResult" :key="searchResult.id"
            class=" py-2 cursor-pointer">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class=" pt-4 mb-8 relative">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from '../components/CityList.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';

// untuk ambil data secara specifik
const router = useRouter();
const previewCity = (searchResult) => {
  // console.log(searchResult);
  //intinya ini methode untuk menghilankan , dan arraynya itu cuman variabel
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    //param nya data di atas
    params: { state: state.replaceAll(" ", ""), city: city },
    //langsung otomatis langsung masuk keparams query
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    }
  })
}

const mapBoxApiKey = "pk.eyJ1Ijoibmlja2FtYTk4IiwiYSI6ImNsa3hhZGYzdDE3NDQzdG12eDdoODV5ZnkifQ.KTc6-_PG1Yg4vcIIyNWC4Q";
const searchQuery = ref("");
const queryTimeOut = ref(null);
const mapboxSearchResult = ref(null);
const searchError = ref(null)


const getSearchResult = () => {
  clearTimeout(queryTimeOut.value);
  //segala hal yang berhubungan dengan api usahkan selalu gunakan async untuk konsumsinya
  //setTimeout digunakan untuk menjalankan kode tertentu (fungsi) setelah periode waktu tertentu telah berlalu.
  queryTimeOut.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxApiKey}`
        )
        mapboxSearchResult.value = result.data.features;
        //melihat datanya
        // console.log(mapboxSearchResult.value)
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResult.value = null;
  }, 300);
}


</script>
