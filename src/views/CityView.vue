<template>
    <div>
        <!-- buat bisa gunaian follback/tampilan sementara -->
        <Suspense>
            <AsynCityView />
            <template #fallback>
                <CityViewSkeleton />
            </template>
        </Suspense>
    </div>
</template>
<script setup>
import AsynCityView from "../components/AsyncCityView.vue"
import CityViewSkeleton from "../components/CityViewSkeletonn.vue";
</script >
<style ></style>