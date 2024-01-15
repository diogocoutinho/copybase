<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from '@/http-common'
import TheGrafics from "@/components/TheGrafics.vue";

const file = ref(null);
const fileName = ref('');
const mrrByMonth = ref({});

const onFileChange = (e) => {
    file.value = e.target.files[0];
    fileName.value = e.target.files[0].name;
};

const onFileDrop = (e) => {
    file.value = e.dataTransfer.files[0];
    fileName.value = e.dataTransfer.files[0].name;
};

const onSubmit = () => {
    if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value);
        axios.post('/subscribers/upload', formData).then(() => {
            getSubscribers();
        });
    } else {
        console.log('Nenhum arquivo selecionado');
    }
};

const getSubscribers = () => {
    axios.get('/subscribers').then((response) => {
        mrrByMonth.value = response.data.metricsByMonth;
    });
};

onMounted(() => {
    getSubscribers();
});
</script>

<template>
    <div class="dashboard-container">
        <h1>Gráficos</h1>

        <form v-if="Object.keys(mrrByMonth).length === 0"
              @submit.prevent="onSubmit"
              @dragover.prevent
              @drop.prevent="onFileDrop"
        >
            <label
                for="fileInput"
                class="drag-drop-area"
            >

                <input type="file"
                       @change="onFileChange"
                       accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                       id="fileInput">
                <span v-if="fileName">Arquivo selecionado: {{ fileName }}</span>
                <span v-else>Arraste e solte um arquivo aqui ou clique para selecionar</span>
            </label>
        </form>
        <button
            v-if="Object.keys(mrrByMonth).length === 0"
            type="submit" @click="onSubmit"
        >
            Enviar
        </button>
        <div v-else>
            <TheGrafics :metricsByMonth="mrrByMonth" />
        </div>
    </div>
</template>

<style scoped>
.drag-drop-area {
    border: 2px dashed #aaa;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    color: #aaa;
    margin-bottom: 1rem;
    width: 100vh;
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.drag-drop-area:hover {
    background: #f7f7f7;
}

.drag-drop-area input[type="file"] {
    display: none;
}

button[type="submit"] {
    display: inline-block;
}

.drag-drop-area span {
    font-size: 1.2rem;
}


.dashboard-container button {
    height: 55px;
    border: 1px solid #41167f;
    color: #41167f;
    text-transform: capitalize;
    background-color: transparent;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    padding: 10px 20px;
    font-family: Inter,sans-serif;
    font-size: 20px;
    font-weight: 700;
    transition: all .2s;
    display: flex;
    cursor: pointer;
}

.dashboard-container button:hover {
    background-color: #41167f;
    color: white;
}
</style>