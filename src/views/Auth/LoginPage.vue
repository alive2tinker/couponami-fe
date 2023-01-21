<template>
    <ion-page>
        <ion-header translucent="true">
            <ion-toolbar>
                <ion-title>{{ $t('Login') }}</ion-title>
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
            <div class="max-w-7xl mx-auto p-4">
                <ion-text>
                    <h1 class="font-bold text-3xl text-zinc-800">{{ $t("Let's Sign you in") }}</h1>
                </ion-text>
                <ion-text>
                    <p class="py-4 text-2xl font-thin text-zinc-600">{{  $t('Welcome back to your Couponami!') }}</p>
                </ion-text>
                <div class="flex h-64">
                    <div class="m-auto flex-1 space-y-3">
                        <ion-input class="border-2 border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('Username or phone number')" v-model="form.email"></ion-input>
                            <p class="text-red-500 text-sm" v-show="'email' in errors">{{ $t('invalid credentials')}}</p>
                        <ion-input type="password" class="border-2 border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('Password')" v-model="form.password"></ion-input>
                            <ion-button fill="clear" id="forgotPasswordButton">{{ $t('Forgot Password')}}</ion-button>
                    </div>
                </div>
                <div class="flex justify-between">
                    <ion-text>
                        <p class="font-medium subpixel-antialiased">{{ $t('Don’t have an account?')}}</p>
                    </ion-text>
                    <ion-button fill="clear" class="-mt-3" id="registerButton" @click="goToRegistration">{{ $t('Register')}}</ion-button>
                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border ion-padding">
                <ion-button color="primary" expand="block" :disabled="signInDisabled" @click="signIn">{{ $t('Sign In')}}</ion-button>
            </ion-footer>
    </ion-page>
</template>
<script>
import { IonInput, IonFooter, IonButton, IonText, IonToolbar, IonTitle, IonPage, IonHeader, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Device } from '@capacitor/device';

export default defineComponent({
    components:{
        IonInput, IonFooter, IonButton, IonText, IonToolbar, IonTitle, IonPage, IonHeader, IonContent, IonButtons, IonBackButton
    },
    computed:{
        signInDisabled(){
            return this.form.username == '' || this.form.password == ''
        },
        ...mapGetters({

        })
    },
    data(){
        return {
            form:{
                email: '',
                password: '',
                device_name:''
            },
            errors:[]
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login',
            
        }),
        async signIn(){

            let tDeviceName = await Device.getId();
            this.form.device_name = tDeviceName.uuid;
            console.log(JSON.stringify(this.form));
            this.login(this.form).then(() => {
                this.$router.push({name: 'home'})
            }).catch((err) => {
                // this.errors = err;
                alert(err);
            })
        }
    },
    setup(){
        const router = useRouter();
        return {
            router
        }
    }
})
</script>
<style scoped>
#forgotPasswordButton{
    --padding-start: 0
}

#registerButton{
    --padding-start: 0;
    --padding-end: 0;
}
</style>