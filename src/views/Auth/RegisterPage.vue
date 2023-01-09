<template>
    <ion-page>
        <ion-header translucent="true">
            <ion-toolbar>
                <ion-title>{{ $t('Register') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons>
                        <ion-back-button default-href="/" text=""></ion-back-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <div class="max-w-7xl mx-auto p-4">
                <ion-text>
                    <h1 class="font-bold text-3xl text-zinc-800">{{ $t("Let's Register you in") }}</h1>
                </ion-text>
                <ion-text>
                    <p class="py-4 text-2xl font-thin text-zinc-600">{{  $t('Welcome to your Couponami!') }}</p>
                </ion-text>
                <div class="flex h-72">
                    <div class="m-auto flex-1 space-y-3">
                        <ion-input class="border-2 border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('username')"></ion-input>
                            <ion-input class="border-2 border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('phone number')"></ion-input>
                        <ion-input class="border-2 border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('Password')"></ion-input>
                            <ion-input class="border-2 border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('Password Confirmation')"></ion-input>
                    </div>
                </div>
                <div class="flex justify-between">
                    <ion-text>
                        <p class="font-medium subpixel-antialiased">{{ $t('have an account already?')}}</p>
                    </ion-text>
                    <ion-button fill="clear" class="-mt-3" id="registerButton" @click="goToLogin">{{ $t('Login')}}</ion-button>
                </div>
            </div>
        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border ion-padding">
                <ion-button color="primary" expand="block" :disabled="registrationDisabled">{{ $t('Register')}}</ion-button>
            </ion-footer>
    </ion-page>
</template>
<script setup>
import { IonInput, IonFooter, IonButton, IonText, IonToolbar, IonTitle, IonPage, IonHeader, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

let registrationDisabled = ref(true);

const router = useRouter();

function goToLogin(){
    router.push({name: 'login'})
}
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