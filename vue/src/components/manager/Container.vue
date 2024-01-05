<template>
  <el-container>
    <el-header style="font-size: 12px;background-color: #409eff">
      <Top />
    </el-header>

    <el-container>
      <el-aside width="150px">
          <Sidebar />
      </el-aside>
      <el-main>
<!--        <el-scrollbar>-->
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <Component :is="Component"/>
            </transition>
          </router-view>
<!--        </el-scrollbar>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Sidebar from "./Sidebar.vue";
import Top from "./Top.vue"

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.fade-enter-active{
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
