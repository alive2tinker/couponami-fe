<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('New Coupon')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('New Coupon') }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{  $t('Store Details') }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="-mt-7 px-1">
          <ion-item>
            <ion-label position="floating">{{ $t('Store Name')}}</ion-label>
            <ion-input :placeholder="$t('Enter Store Name')"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">{{ $t('Store Link')}}</ion-label>
            <ion-input :placeholder="$t('Enter Store Link')"></ion-input>
          </ion-item>
          <input type="file"  id="logoFileUpload" hidden/>
          <ion-button @click="openFileUpload" fill="outline" expand="block">
            <ion-icon slot="start" :icon="cloudUploadOutline"></ion-icon>
            {{ $t('Upload Logo (Optional)') }}
          </ion-button>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{ $t('Coupon Details') }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="-mt-7 px-1">
          <ion-item>
            <ion-label position="floating">{{ $t('Offer')}}</ion-label>
            <ion-input :placeholder="$t('Enter Offer')"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">{{ $t('Code')}}</ion-label>
            <ion-input :placeholder="$t('Enter Code')"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">{{ $t('Details')}}</ion-label>
            <ion-textarea :placeholder="$t('enter all the notes you need')"></ion-textarea>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-item lines="none">
        <ion-checkbox slot="start"></ion-checkbox>
        <ion-label>{{ $t('I agree to the terms and conditions')  }}</ion-label>
      </ion-item>
      <div class="ion-padding">
        <ion-button expand="block" @click="submitCouponForm">{{ $t('Submit')}}</ion-button>
      </div>
      <div class="w-screen h-28"></div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonCheckbox, IonItem, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle,IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { cloudUploadOutline } from 'ionicons/icons';
import { useStore } from 'vuex';

function openFileUpload(){
  document.getElementById('logoFileUpload').click();
}

const store = useStore();

function submitCouponForm()
{
  store.dispatch('')
}
</script>
<style scoped>
ion-item{
--background: none;
--padding:0
}
</style>