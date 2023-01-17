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
                    <ion-icon :icon="person" slot="start" />
                    <ion-label>{{ $t('Account') }}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="moon" slot="start" />
                    <ion-label>{{ $t('Dark Mode')}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="earth" slot="start" />
                    <ion-label>{{ $t('Language')}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="star" slot="start"/>
                    <ion-label>{{ $t('Rate Us')}}</ion-label>
                </ion-item>
            </ion-list>
            <div class="w-screen h-24"></div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { person, moon, star, earth } from 'ionicons/icons';
</script>
