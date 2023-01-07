<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('Settings')}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $t('Settings')}}</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-label>Pokémon Yellow</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Mega Man X</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="earth" slot="start" />
                    <ion-label>{{ $t('Language')}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="star" slot="start"/>
                    <ion-label>{{ $t('Rate Us')}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="settings" slot="start"/>
                    <ion-label>{{ $t('Settings') }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { settings, star, earth } from 'ionicons/icons';
</script>
