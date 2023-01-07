<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="coupon in coupons" :key="coupon.id" @click="showCouponDetails(coupon)">
        <ion-card-header>
          <ion-card-title>{{ coupon.store.name ?? '' }}</ion-card-title>
          <ion-card-subtitle>{{  coupon.offer }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>

      <ion-modal ref="couponModal" :initial-breakpoint="0.75" :breakpoints="[0, 0.25, 0.5, 0.75, 1]" handle-behavior="cycle">
        <ion-content class="ion-padding flex space-y-6">
          <div class="flex justify-between">
            <div>
              <ion-text color="primary">
                <h1 class="font-bold text-3xl">{{ currentCoupon.store.name ?? '' }}</h1>
              </ion-text>
              <ion-text>
                <p class="text-base">{{ currentCoupon.store.description ?? '' }}</p>
              </ion-text>
            </div>
            <div>
              <img :src="currentCoupon.store.icon ?? ''" alt="" class="rounded-full w-16 h-16">
            </div>
          </div>
          <div>
            <ion-text color="primary">
              <h1>{{ $t('Offer')}}</h1>
            </ion-text>
            <ion-text>
              <p class="text-base">{{ currentCoupon.offer ?? '' }}</p>
            </ion-text>
          </div>
          <div>
            <ion-text color="primary">
              <h1>{{ $t('Details') }}</h1>
            </ion-text>
            <ion-text>
              <p class="text-base">{{ currentCoupon.details ?? '' }}</p>
            </ion-text>
          </div>
          <div class="flex">
            <ion-button shape="round" class="flex-1">
              <h1 class="text-2xl font-bold">{{ currentCoupon.code ?? '' }}</h1>
            </ion-button>
            <!-- copy button -->
            <ion-button shape="round" @click="copyCode(currentCoupon.code)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            </ion-button>
            <!-- share button -->
            <ion-button shape="round" @click="shareCode(currentCoupon)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </ion-button>
          </div>
          <ion-button fill="clear" color="danger">{{ $t('Not working?')}}</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonModal, IonButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  components: {
    IonCard, IonModal, IonButton, IonText, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonPage, IonHeader, IonToolbar, IonTitle, IonContent
  },
  computed:{
    ...mapGetters({
      coupons: 'coupons/all'
    })
  },
  data() {
    return {
      currentCoupon:''
    }
  },
  mounted() {
    this.fetchCoupons();
  },
  methods: {
    ...mapActions({
      fetchCoupons: 'coupons/fetchCoupons'
    }),
    showCouponDetails(coupon){
      this.currentCoupon = coupon;
      this.$refs.couponModal.$el.present();
    }
  },
})
</script>
