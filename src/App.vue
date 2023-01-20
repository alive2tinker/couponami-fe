<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { mapMutations } from 'vuex';

export default defineComponent({
  components: {
    IonApp, IonRouterOutlet
  },
  async mounted() {
    const locale = await Preferences.get({key: 'locale'});
    if(!locale){
      await Preferences.set({
        key: 'locale',
        value: this.$i18n.locale
      })
    }else{
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
  }
})
</script>
