<!-- <template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('Language Selection') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" text=""></ion-back-button>
                    </ion-buttons>
                    <ion-title size="large">{{ $t('Language Selection') }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-checkbox slot="start" :checked="this.$i18n.locale === 'ar'"
                        @click="changeLocale('ar')"></ion-checkbox>
                    <ion-label>العربية</ion-label>
                </ion-item>
                <ion-item>
                    <ion-checkbox slot="start" :checked="this.$i18n.locale === 'en'"
                        @click="changeLocale('en')"></ion-checkbox>
                    <ion-label>English</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
 -->
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('Language') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button :icon="chevronForwardOutline" default-href="/" text="" v-show="this.$i18n.locale === 'ar'"></ion-back-button>
                        <ion-back-button :icon="chevronBackOutline" default-href="/" text="" v-show="this.$i18n.locale === 'en'"></ion-back-button>
                    </ion-buttons>
                    <div class="flex">
                        <img class="w-16 h-16" src="@/assets/images/nuIcon.png" alt="">
                        <h1 class="text-2xl font-bold my-4">{{ $t('Language') }}</h1>
                    </div>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-checkbox slot="start" :checked="this.$i18n.locale === 'ar'"
                        @click="changeLocale('ar')"></ion-checkbox>
                    <ion-label>العربية</ion-label>
                </ion-item>
                <ion-item>
                    <ion-checkbox slot="start" :checked="this.$i18n.locale === 'en'"
                        @click="changeLocale('en')"></ion-checkbox>
                    <ion-label>English</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonCheckbox, IonContent, IonButtons, IonToolbar, IonBackButton, IonHeader, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
export default defineComponent({
    components: {
        IonPage, IonContent, IonButtons, IonToolbar, IonBackButton, IonHeader, IonTitle, IonCheckbox
    },
    methods: {
        changeLocale(nuLocale) {
            const localeChanged = async() => await Preferences.set({
                key: 'locale',
                value: nuLocale,
            });
            localeChanged();
            this.$i18n.locale = nuLocale;
            document.body.setAttribute('dir', this.$root.$i18n.locale === 'ar' ? 'rtl' : 'ltr')
        }
    },
    setup(){
        return {
            chevronForwardOutline,
            chevronBackOutline
        }
    }
})
</script>