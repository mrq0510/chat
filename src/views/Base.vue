<template>
    <div class="chart-gpt">
        <Slider ref="slider" v-if="!isMobile"></Slider>
        <div>
          <router-view @newGroup="newGroup"></router-view>
        </div>
    </div>
</template>

<script setup>
import Slider from "@/views/Slider.vue"
import { onBeforeMount , ref,toRefs} from "vue"
import home from "@/store/index"
import Tools from "@/utils/tools"
const store = home();

store.mineChartMenus();
const slider = ref()
const isMobile = ref(Tools.isMobile());

const newGroup=()=>{
  const {openAddModal} = toRefs(slider.value)
  openAddModal.value()
}
</script>

<style lang="scss" scoped>

.chart-gpt{
    display: flex;
    height: 100vh;
  }
</style>