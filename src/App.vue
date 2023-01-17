<template>
  <ion-app @localeChanged="handleNuLocale">
    <ion-router-outlet :key="router.path"/>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted, onUpdated } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();

onUpdated(() => {
  document.body.setAttribute('dir', this.$i18n.locale === 'ar' ? 'rtl' : 'ltr')
});

const router = useRouter();

onMounted(async () => {
  console.log(this.$i18n.locale);
  const user = await Preferences.get({ key: 'user' });
  let userObject = JSON.parse(user.value);
  store.commit('auth/SET_USER', userObject);
})
</script>
