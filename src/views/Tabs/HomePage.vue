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
          <div class="flex">
            <img class="w-16 h-16" src="@/assets/images/nuIcon.png" alt="">
            <h1 class="text-2xl font-bold my-4">{{ $t('Couponami')}}</h1>
          </div>
          <ion-buttons slot="end">
            <ion-button id="start-search">
              <ion-icon :icon="search" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="flex overflow-x-scroll py-4">
        <div>
          <ion-chip class="" @click="filterCategory = ''" v-show="filterCategory === ''">{{ $t('All')}}</ion-chip>
        </div>
        <div v-for="category in categories" :key="category.id">
          <ion-chip :class="{ 'bg-sky-500': filterCategory === category.name }" @click="toggleCategory(category.name)" v-show="filterCategory === category.name || filterCategory === ''">{{ category.name }}<ion-icon :icon="closeCircle" v-show="filterCategory === category.name" @click="removeFilterCategory"></ion-icon></ion-chip>
        </div>
      </div>
      <div v-if="filtreredCoupons.length > 0">
        <ion-card v-for="coupon in filtreredCoupons" :key="coupon.id" @click="showCouponDetails(coupon)">
        <ion-card-header>
          <div class="flex justify-between">
            <ion-card-title>{{ coupon.store.name ?? '' }}</ion-card-title>
            <img :src="coupon.store.icon ?? ''" alt="" class="rounded-full w-16 h-16" />
          </div>
        </ion-card-header>

        <ion-card-content>
          {{ coupon.offer }}
        </ion-card-content>
      </ion-card>
      <ion-infinite-scroll @ionInfinite="nextPage($event)">
      <ion-infinite-scroll-content
        loading-text="Please wait..."
        loading-spinner="bubbles"
      ></ion-infinite-scroll-content>
    </ion-infinite-scroll>
      </div>
      <EmptyScreen v-else />

      <ion-modal ref="couponModal" :initial-breakpoint="0.75" :breakpoints="[0, 0.25, 0.5, 0.75, 1]"
        handle-behavior="cycle">
        <ion-content class="ion-padding flex space-y-6">
          <!-- <div class="flex justify-between">
            <div>
              <ion-text color="primary">
                <h1 class="font-bold text-3xl">{{ currentCoupon.store.name ?? '' }}</h1>
              </ion-text>
              <ion-text class="flex text-base">
                {{ currentCoupon.store.description ?? '' }}
              </ion-text>
            </div>
            <div>
              <img :src="currentCoupon.store.icon ?? ''" alt="" class="rounded-full w-16 h-16">
            </div>
          </div> -->
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-9">
              <ion-text color="primary">
                <h1 class="font-bold text-3xl">{{ currentCoupon.store.name ?? '' }}</h1>
              </ion-text>
              <ion-text class="flex text-base">
                {{ currentCoupon.store.description ?? '' }}
              </ion-text>
            </div>
            <div class="col-span-3">
              <div class="flex justify-center">
                <img :src="currentCoupon.store.icon ?? ''" alt="" class="rounded-full w-16 h-16" />
              </div>
            </div>
          </div>
          <div>
            <ion-text color="primary">
              <h1>{{ $t('Offer') }}</h1>
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
            <ion-button shape="round" @click="favorCoupon(currentCoupon.id)">
              <ion-icon :icon="star"></ion-icon>
            </ion-button>
            <!-- copy button -->
            <ion-button shape="round" @click="copyCode(currentCoupon.code)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            </ion-button>
            <!-- share button -->
            <ion-button shape="round" @click="shareCode(currentCoupon)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </ion-button>
          </div>
          <ion-button fill="clear" color="danger">{{ $t('Not working?') }}</ion-button>
        </ion-content>
      </ion-modal>

      <!-- Search Modal-->
      <ion-modal class="search-modal" :initial-breakpoint="1" ref="searchModal" trigger="start-search">
        <div class="px-2 py-6">
          <ion-icon :icon="close" class="w-6 h-6 text-white" @click="$refs.searchModal.$el.dismiss()" />
          <ion-card>
            <ion-card-content>
              <ion-input class="indent-2" :placeholder="$t('search')" v-model="keyword"></ion-input>
            </ion-card-content>
          </ion-card>
          <div v-show="searchedCoupons.length > 0">
            <ion-card v-for="coupon in searchedCoupons" :key="coupon.id" @click="showCouponDetails(coupon)">
              <ion-card-header>
                <div class="flex justify-between">
                  <ion-card-title>{{ coupon.store.name ?? '' }}</ion-card-title>
                  <img :src="coupon.store.icon ?? ''" alt="" class="rounded-full w-16 h-16" />
                </div>
              </ion-card-header>
            
              <ion-card-content>
                {{ coupon.offer }}
              </ion-card-content>
            </ion-card>
          </div>
          <ion-card v-show="searchedCoupons.length === 0 && keyword !== ''">
            <ion-card-content>
              <ion-text>{{ $t('No Data')}}</ion-text>
            </ion-card-content>
          </ion-card>
          <ion-card v-show="keyword === ''">
            <ion-card-content class="animate-pulse">
              <div class="flex justify-between">
                <div class="rounded-full bg-gray-400 w-16 h-16"></div>
                <div class="bg-gray-400 rounded-md mt-5 w-52 h-6"></div>
              </div>
              <div class="py-4 space-y-2">
                <div class="bg-gray-400 rounded-md w-full h-2"></div>
                <div class="bg-gray-400 rounded-md w-full h-2"></div>
                <div class="bg-gray-400 rounded-md w-full h-2"></div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-modal>
      <div class="w-screen h-24"></div>
    </ion-content>
  </ion-page>
</template>

<script>
import {  IonInfiniteScroll, IonInfiniteScrollContent, IonChip, IonIcon, IonInput, IonButtons, IonModal, toastController, IonButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Clipboard } from '@awesome-cordova-plugins/clipboard';
import { Share } from '@capacitor/share';
import { search, close, closeCircle, star } from 'ionicons/icons'
import EmptyScreen from '@/components/EmptyScreen.vue'
import { Preferences } from '@capacitor/preferences';

export default defineComponent({
  components: {
    IonInfiniteScroll, IonInfiniteScrollContent, IonCard, EmptyScreen, IonChip, IonIcon, IonInput, IonButtons, IonModal, IonButton, IonText, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonHeader, IonToolbar, IonTitle, IonContent
  },
  computed: {
    ...mapGetters({
      coupons: 'coupons/all',
      categories: 'categories/all',
      searchedCoupons: 'coupons/searched',
      user: 'auth/user'
    }),
    filtreredCoupons(){
      if(this.filterCategory !== '')
        return this.coupons.data.filter((s) => s.category.name === this.filterCategory);

      return this.coupons.data ?? [];
    }
  },
  data() {
    return {
      currentCoupon: '',
      keyword: '',
      filterCategory: ''
    }
  },
  ionViewWillEnter() {
    this.fetchCoupons();
    this.fetchCategories();
    const syncDarkmode = async () => {
      const { value } = await Preferences.get({ key: 'dark-theme' });
      console.log(value);
      document.body.setAttribute('color-scheme', value === 'true' ? "dark":"")
    }
    syncDarkmode();
  },
  async mounted() {
    const locale = await Preferences.get({key: 'locale'});
    this.updateLanguage(locale.value);
    console.log(`locale before request categories ${locale.value}`)
  },
  watch:{
    keyword(newKeyword){
      this.searchCoupons(newKeyword);
    }
  },
  methods: {
    ...mapActions({
      fetchCoupons: 'coupons/fetchCoupons',
      fetchNextPage: 'coupons/fetchNextPage',
      fetchCategories: 'categories/fetchCategories',
      searchCoupons: 'coupons/searchCoupons',
      registerFavorite: 'favorites/registerFavorite'
    }),
    ...mapMutations({
      updateLanguage: 'auth/SET_LANG'
    }),
    showCouponDetails(coupon) {
      this.currentCoupon = coupon;
      this.$refs.couponModal.$el.present();
    },
    copyCode(code) {
        navigator.clipboard.writeText(code);
        this.$refs.couponModal.$el.dismiss();
        Clipboard.copy(code);
        this.presentToast('Copied successfully', 'bottom')
    },
    async presentToast(message, position) {
      const toast = await toastController.create({
        message: message,
        duration: 1500,
        position: position
      });

      await toast.present();
    },
    async shareCode(coupon) {
      await Share.share({
        title: 'See cool stuff' + coupon.offer,
        text: `use ${coupon.code} in ${coupon.store.name} to get ${coupon.offer}`,
        url: coupon.store.link,
        dialogTitle: 'Share with your friends',
      });
    },

    nextPage(e){
      this.fetchNextPage().then(() => {
        e.target.complete();
      }).catch((err) => {
        this.presentToast(err, 'bottom')
        e.target.complete();
      })
    },

    toggleCategory(category){
      if(this.filterCategory === ''){
        this.filterCategory = category;
      }else{
        this.filterCategory = '';
      }
    },
    favorCoupon(coupon){
      console.log(JSON.stringify(this.user));
      this.registerFavorite({userID: this.user.id, couponID: coupon}).then(() => {
        this.presentToast('favorited successfully', 'bottom')
      }).catch((err) => {
        this.presentToast(err.response.data.message, 'bottom')
      });
    }
  },
  setup() {
    return {
      search,
      close,
      closeCircle,
      star
    }
  }
})
</script>