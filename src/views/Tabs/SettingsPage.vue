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
                    <ion-icon :icon="chevronBackOutline" slot="end" v-show="this.$i18n.locale === 'ar'" />
                    <ion-icon :icon="chevronForwardOutline" slot="end" v-show="this.$i18n.locale === 'en'" />
                </ion-item>
                <ion-item>
                    <ion-icon :icon="moon" slot="start" />
                    <ion-label>{{ $t('Dark Mode')}}</ion-label>
                </ion-item>
                <ion-item @click="router.push({ name: 'languageSelection'})">
                    <ion-icon :icon="earth" slot="start" />
                    <ion-label>{{ $t('Language')}}</ion-label>
                    <ion-icon :icon="chevronBackOutline" slot="end" v-show="this.$i18n.locale === 'ar'"/>
                    <ion-icon :icon="chevronForwardOutline" slot="end" v-show="this.$i18n.locale === 'en'"/>
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

<script>
import { IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { person, moon, star, earth, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    components:{
        IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent
    },
    setup(){
        const router = useRouter();
        return {
            person, moon, star, earth, chevronBackOutline, chevronForwardOutline, router
        }
    }
})
</script>
