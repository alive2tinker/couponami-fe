<!-- <template>
    <div class="flex h-2/3">
        <div class="m-auto">
            <img class="grayscale" src="@/assets/images/no_data.png" alt="">
            <h1 class="font-bold text-center text-zinc-700 text-2xl">{{  $t('Oops!') }}</h1>
            <p class="text-center text-zinc-500">{{ $t('No data found')}}</p>
        </div>
    </div>
</template> -->

<template>
    <div>
        <Vue3Lottie :animationData="EmptyState" :height="400" :width="400" />
        <h1 class="font-bold text-center text-zinc-700 text-2xl">{{  $t('Oops!') }}</h1>
        <p class="text-center text-zinc-500">{{ $t('No data found')}}</p>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import EmptyState from '@/assets/images/empty-state.json';
export default defineComponent({
    setup(){
        return {
            EmptyState
        }
    }
})
</script>