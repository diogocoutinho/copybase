<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/http-common'
import router from "@/router";
import { useAuthStore } from '@/stores/authStore';
import { useI18n } from 'vue-i18n'

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const error = ref([]);

const { t } = useI18n()

const handleSubmit = async () => {
    error.value = [];
    await axios.post('/auth/login', {
        email: email.value,
        password: password.value
    }).then(response => {
        authStore.setToken(response.data.access_token);
        router.push({ name: 'dashboard' });
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
            <div v-if="error.length" class="error">
                <div v-for="(err, index) in error" :key="index">
                    {{ err.toUpperCase() }}
                </div>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>

</style>