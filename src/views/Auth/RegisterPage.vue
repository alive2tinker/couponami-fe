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
                        <ion-back-button :icon="chevronForwardOutline" default-href="/" text="" v-show="this.$i18n.locale === 'ar'"></ion-back-button>
                        <ion-back-button :icon="chevronBackOutline" default-href="/" text="" v-show="this.$i18n.locale === 'en'"></ion-back-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <!-- registration form -->
            <div class="max-w-7xl mx-auto p-4" v-show="!smsSent">
                <ion-text>
                    <h1 class="font-bold text-3xl dark:text-white">{{ $t("Let's Register you in") }}</h1>
                </ion-text>
                <ion-text>
                    <p class="py-4 text-2xl font-thin dark:text-zinc-200">{{ $t('Welcome to your Couponami!') }}</p>
                </ion-text>
                <div class="flex h-72">
                    <div class="m-auto flex-1 space-y-3">
                        <ion-input class="border border-zinc-200 rounded-xl indent-2" :placeholder="$t('username')"
                            v-model="form.name"></ion-input>
                            <ion-input class="border border-zinc-200 rounded-xl indent-2" :placeholder="$t('Email')"
                                v-model="form.email"></ion-input>
                                <div class="flex border border-zinc-200 rounded-xl indent-2">
                                    <ion-label class="pt-2.5">+966</ion-label>
                                    <ion-input class="" :placeholder="$t('phone number')"
                            v-model="form.phone"></ion-input>
                                </div>
                        <ion-input type="password" class="border border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('Password')" v-model="form.password"></ion-input>
                        <ion-input type="password" class="border border-zinc-200 rounded-xl indent-2"
                            :placeholder="$t('Password Confirmation')" v-model="form.passwordConfirmation"></ion-input>
                    </div>
                </div>
                <div class="flex justify-between">
                    <ion-text>
                        <p class="font-medium subpixel-antialiased">{{ $t('have an account already?') }}</p>
                    </ion-text>
                    <ion-button fill="clear" class="-mt-3" id="registerButton"
                        @click="router.push({ name: 'Login' })">{{
                            $t('Login')
                        }}</ion-button>
                </div>
            </div>
            <!-- otp confirmation -->
            <div class="max-w-7xl mx-auto p-4" v-show="smsSent">
                <ion-text>
                    <h1 class="font-bold text-3xl">{{ $t("Enter the code") }}</h1>
                </ion-text>
                <ion-text>
                    <p class="text-sm text-zinc-600">{{ $t('Enter the four-digit code that was sent to you at {phone}', {phone:this.form.phone})}}</p>
                </ion-text>
                <div class="py-7">
                    <v-otp-input ref="otpInput" input-classes="otp-input" separator="" :num-inputs="6"
                    :should-auto-focus="true" :is-input-num="true" :conditionalClass="['one', 'two', 'three', 'four','five','six']"
                    @on-change="handleOnChange" @on-complete="confirmOTP" />
                </div>
            </div>
            <div id="sign-in-button" style="display:none"></div>
        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border ion-padding">
            <ion-button color="primary" expand="block" :disabled="!registrationDisabled" @click="signIn"
                v-show="!smsSent">{{
                    $t('Register')
                }}</ion-button>
        </ion-footer>
    </ion-page>
</template>
<script >
import { IonInput, IonFooter, IonButton, IonText, IonToolbar, IonTitle, IonPage, IonHeader, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { mapActions, mapGetters } from 'vuex';
import { useRouter } from 'vue-router';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import VOtpInput from 'vue3-otp-input';
import { Device } from '@capacitor/device';

export default defineComponent({
    components: {
        IonInput, VOtpInput, IonFooter, IonButton, IonText, IonToolbar, IonTitle, IonPage, IonHeader, IonContent, IonButtons, IonBackButton
    },
    computed: {
        registrationDisabled() {
            return this.form.username !== '' && this.form.phone !== '' && this.form.password !== '' && this.form.passwordConfirmation !== '';
        },
        ...mapGetters({

        })
    },
    data() {
        return {
            form: {
                name: '',
                email:'',
                phone: '',
                password: '',
                passwordConfirmation: '',
                device_name: ''
            },
            smsSent: false,
            appVerifier: '',
            otp: '',
            confirmationResult: ''
        }
    },
    mounted() {
        this.initRecaptcha();
        const getDeviceId = async () => {
            this.form.device_name = await Device.getId();
        }
        getDeviceId().then(() => {
            this.form.device_name = this.form.device_name.uuid;
        });
    },
    methods: {
        ...mapActions({
            registerUser: 'auth/registerUser'
        }),
        signIn() {
            const auth = getAuth();
            signInWithPhoneNumber(auth, this.cleanNumber(this.form.phone), this.appVerifier)
                .then((confirmationResult) => {
                    this.confirmationResult = confirmationResult;
                    // console.log(JSON.stringify(confirmationResult))
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).

                    // window.confirmationResult = confirmationResult;
                    this.smsSent = true;
                    // ..
                }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                    alert(error);
                });
        },
        confirmOTP(value) {
            this.confirmationResult.confirm(value).then(() => {
                this.form.phone = this.cleanNumber(this.form.phone)
                this.registerUser(this.form).then(() => {
                    this.$router.push({ name: 'home' })
                }).catch((err) => {
                    alert(err);
                })
            }).catch((err) => {
                alert(JSON.stringify(err))
            });
        },
        initRecaptcha() {
            const auth = getAuth();
            this.appVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
            }, auth);
        },
        cleanNumber(phoneNumber){
            if(phoneNumber.startsWith('966')){
                return '+' + phoneNumber;
            }else if(phoneNumber.startsWith('+')){
                return phoneNumber;
            }else if(phoneNumber.startsWith('0')){
                return '+966' + phoneNumber.replace('0','')
            }else{
                return '+966' + phoneNumber;
            }
        }
    },
    setup() {
        const router = useRouter();
        return {
            router,
            chevronForwardOutline,
            chevronBackOutline
        }
    }
})
</script>
<style>
#forgotPasswordButton {
    --padding-start: 0
}

#registerButton {
    --padding-start: 0;
    --padding-end: 0;
}

.otp-input{
    border: 2px solid #7e7e7e;
    width: 75% !important;
    height: 5rem;
    border-radius: 1rem;
    text-align: center;
    margin-left: 0.5rem;
    background-color: white;
}
.otp-input:focus{
    outline: none !important;
    border: 2px solid var(--ion-color-primary);
}
</style>