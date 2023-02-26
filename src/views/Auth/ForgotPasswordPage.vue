<template>
    <ion-page>
        <ion-header translucent="true">
            <ion-toolbar>
                <ion-title>{{ $t('Forgot Password') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar v-if="currentStep < 4">
                    <ion-buttons>
                        <ion-back-button defaultHref="/" text=""></ion-back-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <div class="max-w-7xl mx-auto p-4">
                <div v-if="currentStep === 1">
                    <ion-text>
                        <h1 class="font-bold text-3xl text-zinc-800 dark:text-zinc-300">{{ $t("Let's Reset your password")
                        }}
                        </h1>
                    </ion-text>
                    <div class="m-auto flex-1 space-y-3">
                        <p class="text-red-500 text-center" v-show="invalidLogin">{{ $t('Invalid information') }}</p>
                        <p class="text-red-500 text-center" v-show="userDoesNotExist">{{ $t('Invalid information') }}</p>
                        <ion-input
                            :class="{ 'border-2 dark:border-zinc-600 rounded-xl indent-2': true, 'border-red-300': this.errors.length > 0, 'border-zinc-200': this.errors.length == 0 }"
                            :placeholder="$t('phone number')" v-model="form.email"></ion-input>
                    </div>
                </div>
                <div v-if="currentStep === 2">
                    <ion-text>
                        <h1 class="font-bold text-3xl">{{ $t("Enter the code") }}</h1>
                    </ion-text>
                    <ion-text>
                        <p class="text-sm text-zinc-600">{{ $t('Enter the four-digit code that was sent to you at {phone}',
                            { phone: this.form.phone }) }}</p>
                    </ion-text>
                    <div class="py-7">
                        <v-otp-input ref="otpInput" input-classes="otp-input" separator="" :num-inputs="6"
                            :should-auto-focus="true" :is-input-num="true"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" @on-change="handleOnChange"
                            @on-complete="verifyOTP" />
                    </div>
                </div>
                <div v-show="currentStep == 3">
                    <ion-text>
                        <h1 class="font-bold text-3xl">{{ $t("Enter the new password") }}</h1>
                    </ion-text>
                    <ion-text>
                        <p class="text-sm text-zinc-600">{{ $t('Enter your new password with confirmation for reset') }}</p>
                    </ion-text>
                    <div class="py-7 space-y-4">
                        <ion-input
                            type="password"
                            :class="{ 'border-2 dark:border-zinc-600 rounded-xl indent-2': true, 'border-red-300': this.errors.length > 0, 'border-zinc-200': this.errors.length == 0 }"
                            :placeholder="$t('Password')" v-model="form.newPassword"></ion-input>
                        <ion-input type="password"
                            :class="{ 'border-2 dark:border-zinc-600 rounded-xl indent-2': true, 'border-red-300': this.errors.length > 0, 'border-zinc-200': this.errors.length == 0 }"
                            :placeholder="$t('Password Confirmation')" v-model="form.newPasswordConfirmation"></ion-input>
                    </div>
                </div>
                <div v-show="currentStep == 4">
                    <div class="flex h-screen">
                        <div class="m-auto">
                            <div class="my-12">
                                <Vue3Lottie :animationData="successCheckmark" :height="200" :width="200" />
                            </div>
                            <h1 class="text-center text-2xl font-bold">{{ $t('All right!')}}</h1>
                            <p class="text-sm">{{ $t('your password has been reset successfully') }}</p>
                            <div class="max-w-7xl mx-auto text-center py-4">
                                <ion-button @click="router.push({ name: 'Login' })"> {{ $t('Login') }}</ion-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="currentStep == 5">
                <div class="flex h-screen">
                            <div class="m-auto">
                                <div class="my-12">
                                    <Vue3Lottie :animationData="failedMark" :height="200" :width="200" />
                                </div>
                                <h1 class="text-center text-2xl font-bold">{{ $t('!Oops') }}</h1>
                                <p class="text-sm text-center">{{ $t('we encountered an error. please try again') }}</p>
                                <div class="max-w-7xl mx-auto text-center py-4">
                                    <ion-button @click="currentStep = 1"> {{ $t('Try again') }}</ion-button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div id="sign-in-button" style="display:none"></div>
        </ion-content>
        <ion-footer :translucent="true" class="ion-no-border ion-padding">
            <ion-button v-if="currentStep === 1" color="primary" expand="block" :disabled="signInDisabled"
                @click="verifyUser">{{ $t('Send OTP')
                }}</ion-button>
            <ion-button v-if="currentStep === 2" color="primary" expand="block" :disabled="signInDisabled"
                @click="verifyOTP">{{ $t('Verify OTP')
                }}</ion-button>
            <ion-button v-if="currentStep === 3" color="primary" expand="block" :disabled="signInDisabled"
                @click="changePassword">{{ $t('Change Password')
                }}</ion-button>
        </ion-footer>
    </ion-page>
</template>
<script>
import { IonButtons, IonBackButton, IonPage, IonFooter, IonButton, IonInput, IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import VOtpInput from 'vue3-otp-input';
import { Device } from '@capacitor/device';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import successCheckmark from '../../assets/images/129505-checkmark.json';
import failedMark from '../../assets/images/1167-failed.json';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        IonButtons, IonBackButton, VOtpInput, IonPage, IonToolbar, IonHeader, IonInput, IonTitle, IonContent, IonFooter, IonButton,
    },
    computed: {
        invalidLogin() {
            return this.errors.filter(e => e.response.status === 400).length > 0;
        },
        userDoesNotExist() {
            return this.errors.filter(e => e.response.status === 404).length > 0;
        },
        ...mapGetters({

        })
    },
    data() {
        return {
            form: {
                email: '',
                device_name: '',
                newPassword: "",
                newPasswordConfirmation: "",
            },
            errors: [],
            currentStep: 1,
            confirmationResult:'',
            appVerifier: '',
            otp: ''
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
        verifyUser() {
            const auth = getAuth();
            this.checkUser(this.form.email).then(() => {
                signInWithPhoneNumber(auth, this.form.email, this.appVerifier)
                    .then((confirmationResult) => {
                        this.confirmationResult = confirmationResult;
                        
                        // console.log(JSON.stringify(confirmationResult))
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).

                        // window.confirmationResult = confirmationResult;
                        this.currentStep = 2;
                        // ..
                    }).catch((error) => {
                        // Error; SMS not sent
                        // ...
                        alert(error);
                    });
                //TODO: send otp via firebase
            }).catch((err) => {
                this.errors.push(err);
            })
        },
        verifyOTP(value) {
            this.confirmationResult.confirm(value).then(() => {
                this.currentStep = 3;
            }).catch((err) => {
                alert(JSON.stringify(err))
            });
        },
        changePassword(){
            this.updatePassword(this.form).then(() => {
                this.currentStep = 4;
            }).catch((err) => {
                this.errors.push(err);
                this.currentStep = 5;
            })
        },
        initRecaptcha() {
            const auth = getAuth();
            this.appVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
            }, auth);
        },
        ...mapActions({
            checkUser: 'auth/checkUser',
            updatePassword: 'auth/updatePassowrd'
        })
    },
    setup(){
        const router = useRouter();
        return {
            router,
            successCheckmark,
            failedMark
        }
    }
})

</script>
<style></style>