<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/http-common';
import { useI18n } from 'vue-i18n'
import router from "@/router";

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref([]);

const { t } = useI18n()

const handleSubmit = async () => {
    error.value = [];
    await axios.post('/auth/register', {
        name: name.value,
        email: email.value,
        password: password.value
    }).then(() => {
        router.push({ name: 'login' });
    }).catch(httpError => {
        console.log(httpError.response.status)
        if (httpError.response.status === 400) {
            error.value = httpError.response.data.message.map(err => t(`errors.${err}`));
            return;
        }
        error.value.push(t(`errors.${httpError.response.data.message}`));
    });
};
</script>

<template>
    <div class="register-container">
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Nome:</label>
                <input id="name" type="text" v-model="name">
            </div>
            <div>
                <label for="email">E-mail:</label>
                <input id="email" type="text" v-model="email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password">
            </div>
            <div v-if="error.length" class="error">
                <div v-for="(err, index) in error" :key="index">
                    {{ err.toUpperCase() }}
                </div>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<style scoped>

</style>