<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('Settings') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <div class="flex">
                        <img class="w-16 h-16" src="@/assets/images/nuIcon.png" alt="">
                        <h1 class="text-2xl font-bold my-4">{{ $t('Settings') }}</h1>
                    </div>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-icon :icon="moon" slot="start" />
                    <ion-label>{{ $t('Dark Mode') }}</ion-label>
                    <ion-toggle slot="end" id="themeToggle" @ionChange="toggleDarkMode" :checked="darkmode"></ion-toggle>
                </ion-item>
                <ion-item @click="router.push({ name: 'languageSelection' })">
                    <ion-icon :icon="earth" slot="start" />
                    <ion-label>{{ $t('Language') }}</ion-label>
                    <ion-icon :icon="chevronBackOutline" slot="end" v-show="this.$i18n.locale === 'ar'" />
                    <ion-icon :icon="chevronForwardOutline" slot="end" v-show="this.$i18n.locale === 'en'" />
                </ion-item>
                <ion-item :href="rateLink">
                    <ion-icon :icon="star" slot="start" />
                    <ion-label>{{ $t('Rate Us') }}</ion-label>
                </ion-item>
                <ion-item @click="this.$refs.termsModal.$el.present();">
                    <ion-icon :icon="documentText" slot="start" />
                    <ion-label>{{ $t('Terms and Conditions') }}</ion-label>
                </ion-item>
                <ion-item @click="initLogout" v-show="user !== null">
                    <ion-icon class="text-red-500" :icon="logOutOutline" slot="start" />
                    <ion-label color="danger">{{ $t('Logout') }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-modal ref="termsModal" :initial-breakpoint="0.75" :breakpoints="[0, 0.25, 0.5, 0.75, 1]"
                handle-behavior="cycle">
                <ion-content class="ion-padding">
                        <ion-text>
                            <h1 class="text-2xl font-bold py-4">{{  $t('Terms and Conditions') }}</h1>
                        </ion-text>
                        <div v-html="terms.value">
                            
                        </div>
                </ion-content>
            </ion-modal>
            <div class="w-screen h-24"></div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonList, IonItem, IonLabel, IonPage, IonToggle, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, isPlatform } from '@ionic/vue';
import { logOutOutline, person, moon, documentText, star, earth, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import { mapGetters, mapActions } from 'vuex';
export default defineComponent({
    components: {
        IonList, IonItem, IonLabel, IonPage, IonToggle, IonModal, IonHeader, IonToolbar, IonTitle, IonIcon, IonContent
    },
    computed: {
        ...mapGetters({
            settings: 'settings/all'
        }),
        terms(){
            return this.settings.filter((e) => e.key === "terms")[0];
        },
        rateLink(){
            let rateLink = '';
            if(isPlatform('ios')){
                rateLink = this.settings.filter((e) => e.key === 'appstore_link')[0]
            }else{
                rateLink = this.settings.filter((e) => e.key === 'playstore_link')[0]
            }

            return rateLink ? rateLink.value : '';
        }
    },
    data() {
        return {
            darkmode: false,
            user: null
        }
    },
    ionViewWillEnter() {
        const syncDarkmode = async () => {
            const { value } = await Preferences.get({ key: 'dark-theme' })
            console.log(`log from viewWillEnter ${value}`)
            this.darkmode = value === 'true';

            const user = await Preferences.get({ key: 'user' });
            this.user = JSON.parse(user.value);
        }
        syncDarkmode();

        this.fetchSettings();
    },
    methods: {
        toggleDarkMode(e) {
            const setDarkMode = async () => {
                await Preferences.set({
                    key: 'dark-theme',
                    value: e.detail.checked ? "true" : "false"
                })
            }
            setDarkMode().then(() => {
                document.body.setAttribute('color-scheme', e.detail.checked ? "dark" : "light")
            })
        },
        initLogout() {
            this.logout().then(() => {
                this.router.push({ name: 'home' })
            })
        },
        ...mapActions({
            logout: 'auth/logout',
            fetchSettings: 'settings/fetch'
        })
    },
    setup() {
        const router = useRouter();
        return {
             logOutOutline, person, moon, star, earth, chevronBackOutline, chevronForwardOutline, router, documentText
        }
    }
})
</script>
