<template>
    <Teleport to="body">
        <Transition name=" modal-outer">
            <div v-show="modalActive"
                class=" absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class='p-4 bg-white self-start mt-32 max-w-screen-md'>
                        <!-- slot untuk menampilkan konten di paren elementnya -->
                        <slot />
                        <button class="text-white mt-8 bg-weather-primary py-2 px-6" @click="$emit('close-modal')">
                            close
                        </button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
<!-- harus ada setupnya -->
<script setup>
//mendefinisikan emit yang ingin di pancarkan, gak di tulis juga gak apa apa 
defineEmits(["close-modal"])
//mendefinisikan props
defineProps({
    modalActive: {
        type: Boolean,
        default: false
    }
})

</script>
<!-- harus di kasih scoped -->
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}


.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-form {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>