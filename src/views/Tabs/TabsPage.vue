<template>
  <ion-page>
    <ion-tabs :translucent="true">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/tabs/favorites">
          <ion-icon :icon="starOutline"/>
        </ion-tab-button>

        <ion-tab-button tab="createCoupon" href="/tabs/createCoupon">
          <ion-icon :icon="addCircleOutline" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon :icon="menuOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { starOutline, addCircleOutline, homeOutline, menuOutline } from 'ionicons/icons';
</script>
<style scoped>
  ion-tab-bar{
    box-shadow: 0px 0px 3px rgb(94, 81, 81);
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 1rem;
    z-index: 1000;
    position: relative;
    top: 0 !important;
    left: 0 !important;
  }

  .tab-selected > ion-icon {
    background: var(--ion-color-primary);
    border-radius: 15px;
    padding: 0.3rem;
    color: white;
  }
</style>
