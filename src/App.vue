<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { useStore } from 'vuex';

const store = useStore();

onMounted(async () => {
  const user = await Preferences.get({ key: 'user' });
  let userObject = JSON.parse(user.value);
  store.commit('auth/SET_USER', userObject);
})
</script>
