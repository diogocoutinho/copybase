<script setup lang="ts">
import {RouterLink} from "vue-router";
import axios from '@/http-common';
import router from "@/router";
import {onMounted, onUpdated, ref, watchEffect} from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

let token = ref(authStore.getToken());

defineProps<{
  msg: string
}>()
const handleLogout = async () => {
    await axios.post('/auth/logout')
        .then(() => {
            authStore.removeToken();
            router.push('/login');
            token.value = null;
        }).catch(error => {
            console.log(error);
        });

};

watchEffect(() => {
    token.value = authStore.getToken();
});

onMounted(() => {
    token.value = authStore.getToken();
});

onUpdated(() => {
    token.value = authStore.getToken();
});
</script>

<template>
  <div class="greetings">
      <img  alt="Vue logo" class="logo" src="@/assets/copybase_logo.png" width="125" height="125" />

    <h1 class="green">{{ msg }}</h1>
    <h4>
      Este é o teste técnico para a vaga de Desdenvolvedor Fullstack da CopyBase. <br>
    </h4>
      <p>What's next?</p>

      <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink v-if="!token" to="/login">Login</RouterLink>
          <RouterLink v-if="!token" to="/register">Register</RouterLink>
          <RouterLink v-if="token" to="/dashboard">Dashboard</RouterLink>
          <RouterLink v-if="token" to="/dashboard" @click="handleLogout">Logout</RouterLink>
      </nav>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
@media (min-width: 1024px) {
    .logo {
        margin: 0 2rem 0 0;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
