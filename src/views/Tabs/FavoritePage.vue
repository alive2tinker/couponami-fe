<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('Favorites')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('Favorites')}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="favorites.length > 0">
      
      </div>
      <EmptyScreen v-else />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import EmptyScreen from '@/components/EmptyScreen.vue';

const store = useStore();
let favorites = computed(() => { return store.getters.favorites.all})
</script>
