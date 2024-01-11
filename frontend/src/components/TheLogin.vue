<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/http-common'
import router from "@/router";
import { useAuthStore } from '@/stores/authStore';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleSubmit = async () => {
    await axios.post('/auth/login', {
        email: email.value,
        password: password.value
    }).then(response => {
        authStore.setToken(response.data.access_token);
        router.push({ name: 'dashboard' });
    }).catch(error => {
        console.log(error);
    });
};
</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="email">Username:</label>
                <input id="email" type="text" v-model="email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password">
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
/* Aqui você pode adicionar estilos para o seu formulário de login */
</style>