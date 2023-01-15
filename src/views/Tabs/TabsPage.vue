<template>
  <ion-page>
    <ion-tabs :translucent="true">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar style="padding:0; margin-top:-4.5rem !important;">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/tabs/favorites">
          <ion-icon :icon="starOutline" />
        </ion-tab-button>

        <ion-tab-button tab="createCoupon" href="/tabs/createCoupon">
          <ion-icon :icon="addCircleOutline" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon :icon="menuOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <ion-modal ref="modal" :isOpen="authModalOpen" @didDismiss="authModalOpen = false" :initial-breakpoint="0.25"
      :breakpoints="[0, 0.25, 0.5, 0.75]">
      <ion-content class="ion-padding">
        <h1 class="text-center font-bold text-xl py-4">{{ $t('Sorry') }}</h1>
        <p class="text-center text-zinc-500 py-4">{{ $t(message) }}</p>
        <div class="flex justify-between">
          <div class="flex-1">
            <ion-button @click="navigateToAuthentication('Login')" fill="outline" expand="block">{{ $t('Login') }}</ion-button>
          </div>
          <div class="flex-1">
            <ion-button @click="navigateToAuthentication('registration')" expand="block">{{ $t('Register') }}</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { IonButton, IonModal, IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { starOutline, addCircleOutline, homeOutline, menuOutline } from 'ionicons/icons';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

let message = ref('');
let authModalOpen = ref(false);
const router = useRouter();
const store = useStore();
const token = computed(() => store.getters['auth/token'])
onBeforeRouteUpdate(async (to) => {
  if (to.meta.isGuarded && token.value !== '') {
    switch (to.name) {
      case 'favorites':
        message.value = 'You can favorite coupons when logged in'
        break;
      case 'createCoupon':
        message.value = 'You can favorite coupons when logged in'
        break;
    }
    authModalOpen.value = true;
    return false
  } else {
    return true;
  }
})

const navigateToAuthentication = (routeName) => {
  authModalOpen.value = false;
  router.push({ name: routeName })
}
</script>
<style scoped>
ion-tab-bar {
  box-shadow: 0px 0px 3px rgb(94, 81, 81);
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  z-index: 1000;
  position: relative;
  top: -2.5rem !important;
  left: 0 !important;
}

.tab-selected>ion-icon {
  background: var(--ion-color-primary);
  border-radius: 15px;
  padding: 0.3rem;
  color: white;
}
</style>
