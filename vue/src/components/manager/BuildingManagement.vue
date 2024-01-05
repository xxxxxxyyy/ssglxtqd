<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <Component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
.fade-enter-active{
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>