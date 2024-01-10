<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from '@/http-common'
import TheGrafics from "@/components/TheGrafics.vue";

const file = ref(null);
const subscribers = ref([]);
const mmr = ref(0);

const onFileChange = (e) => {
    file.value = e.target.files[0];
};

const onSubmit = () => {
    const formData = new FormData();
    formData.append('file', file.value);
    axios.post('/subscribers/upload', formData).then((response) => {
        console.log(response.data);
        getSubscribers();
    });
};

const getSubscribers = () => {
    axios.get('/subscribers').then((response) => {
        console.log(response.data);
        subscribers.value = response.data.subscribers;
        mmr.value = response.data.mmr;
    });
};

onMounted(() => {
    getSubscribers();
});
</script>

<template>
    <div>
        <h1>Logged</h1>

        <form v-if="subscribers.length === 0" @submit.prevent="onSubmit">
            <input type="file" @change="onFileChange" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
            <button type="submit">Upload</button>
        </form>
        <div v-else>
            <TheGrafics :subscribers="subscribers" />
        </div>
    </div>
</template>

<style scoped>

</style>