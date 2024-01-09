<script setup lang="ts">
import { ref } from 'vue';

// Crie variáveis reativas para o nome de usuário e a senha
const username = ref('');
const password = ref('');

// Crie um método para lidar com o envio do formulário
const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para autenticar o usuário
    console.log(`Username: ${username.value}, Password: ${password.value}`);
};
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="username">Username:</label>
                <input id="username" type="text" v-model="username">
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