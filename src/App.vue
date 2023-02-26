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
import { Capacitor } from '@capacitor/core';
import axios from 'axios';

export default defineComponent({
  components: {
    IonApp, IonRouterOutlet
  },
  ionViewWillEnter() {
    const syncDarkmode = async () => {
      const { value } = await Preferences.get({ key: 'dark-theme' });
      document.body.setAttribute('color-scheme', value)
    }
    syncDarkmode();
  },
  async mounted() {
    this.getCSRF();
    const locale = await Preferences.get({ key: 'locale' });
    this.$i18n.locale = locale.value;
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
      const tokenHasBeenRegistered = await Preferences.get('tokenRegistered');
      await PushNotifications.addListener('registration', token => {
        if (!JSON.parse(tokenHasBeenRegistered).value) {
          axios.post(`${process.env.VUE_APP_PRODUCTION_URL}/api/registerToken`, {
            notifyToken: token.value
          }).then(() => {
            const setTokenRegistered = async () => {
              await Preferences.set({
                key: 'tokenRegistered',
                value: 'true'
              });
            }
            setTokenRegistered();
          }).catch((err) => {
            alert(err);
          })
        }
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

    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationsAvailable) {
      addListeners()
      registerNotifications()
      getDeliveredNotifications()
    }
  }
})
</script>
