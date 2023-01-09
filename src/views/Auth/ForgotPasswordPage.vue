<template>
    <ion-page>
        <ion-header>
               <ion-toolbar>
                <ion-title>{{ $t('Forgot Password')}}</ion-title>
               </ion-toolbar>
            </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons>
                        <ion-back-button defaultHref="/" text=""></ion-back-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
        </ion-content>
    </ion-page>
</template>
<script setup>
    import { IonButtons, IonBackButton, IonPage, IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/vue';
</script>