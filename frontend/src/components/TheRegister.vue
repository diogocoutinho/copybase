<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');

const handleSubmit = () => {
    console.log(`Username: ${email.value}, Password: ${password.value}`);
    axios.post('/register', {
        name: name.value,
        email: email.value,
        password: password.value
    }).then((response: any) => {
        console.log(response);
    }).catch((error: any) => {
        console.log(error);
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
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<style scoped>

</style>