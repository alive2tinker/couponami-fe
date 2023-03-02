<template>
    <ion-page>
        <ion-header translucent="true">
            <ion-toolbar>
                <ion-title>{{ $t('Account') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button :icon="chevronForwardOutline" default-href="/" text=""
                            v-show="this.$i18n.locale === 'ar'"></ion-back-button>
                        <ion-back-button :icon="chevronBackOutline" default-href="/" text=""
                            v-show="this.$i18n.locale === 'en'"></ion-back-button>
                    </ion-buttons>
                    <div class="flex">
                        <img class="w-16 h-16" src="@/assets/images/nuIcon.png" alt="">
                        <h1 class="text-2xl font-bold my-4">{{ $t('Account') }}</h1>
                    </div>
                </ion-toolbar>
            </ion-header>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ $t('Information') }}</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-list lines="none">
                        <ion-item>
                            <ion-label>{{ $t('Name')}}</ion-label>
                            <ion-input :placeholder="$t('Name')" v-model="form.name"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{ $t('Email')}}</ion-label>
                            <ion-input :placeholder="$t('Email')" v-model="form.email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{ $t('Phone')}}</ion-label>
                            <ion-input :placeholder="$t('Phone')" v-model="form.phone"></ion-input>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonList, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'; 
import { defineComponent } from 'vue';
import { mapGetters, mapActions} from 'vuex';
export default defineComponent({
    components:{
        IonPage, IonContent, IonList, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons
    },
    computed:{
        ...mapGetters({
            user: 'auth/user'
        })
    },
    data(){
        return {
            form:{
                name:'',
                email: '',
                phone: '',
            }
        }
    },
    mounted(){
        this.form.name = this.user.name;
        this.form.email = this.user.email;
        this.form.phone = this.user.phone;
    },
    methods:{
        ...mapActions({

        })
    },
    setup(){
        return {
            chevronBackOutline, chevronForwardOutline
        }
    }
})
</script>