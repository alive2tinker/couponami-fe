<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { mapMutations, mapActions } from 'vuex';
import { PushNotifications } from '@capacitor/push-notifications';
import axios from 'axios';

export default defineComponent({
  components: {
    IonApp, IonRouterOutlet
  },
  ionViewWillEnter() {
    const syncDarkmode = async () => {
      const { value } = await Preferences.get({ key: 'dark-theme' });
      console.log(value);
      document.body.setAttribute('color-scheme', value)
    }
    syncDarkmode();
  },
  async mounted() {
    ScreenOrientation.lock()
    this.getCSRF();
    const locale = await Preferences.get({ key: 'locale' });
    if (!locale) {
      await Preferences.set({
        key: 'locale',
        value: this.$i18n.locale
      })
    } else {
      this.$i18n.locale = locale.value
    }
    document.body.setAttribute('dir', locale.value === 'ar' ? 'rtl' : 'ltr')
    const user = await Preferences.get({ key: 'user' });
    let userObject = JSON.parse(user.value);
    this.updateUser(userObject);
  },
  methods: {
    ...mapMutations({
      updateUser: 'auth/SET_USER'
    }),
    ...mapActions({
      getCSRF: 'auth/getCSRF',
    })
  },
  setup() {
    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        axios.post(`${process.env.VUE_APP_PRODUCTION_URL}/api/registerToken`, {
          notifyToken: token.value
        }).then(() => {
          alert('push notification registration successful');
        }).catch((err) => {
          alert(err);
        })
      });

      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });

      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', JSON.stringify(notification));
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }

    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    }

    const getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }

    addListeners()
    registerNotifications()
    getDeliveredNotifications()
  }
})
</script>
