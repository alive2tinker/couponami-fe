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
    document.body.setAttribute('dir', this.$root.$i18n.locale === 'ar' ? 'rtl' : 'ltr')
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
