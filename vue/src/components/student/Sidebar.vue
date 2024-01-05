<template>
  <el-row class="tac" style="width:300px">
    <el-col :span="12">
      <el-menu
          default-active="/student/message"
          router="router"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="overflow: hidden"
      >

        <el-menu-item index="/student/message">
          <el-icon><UserFilled /></el-icon>
          <span>基本信息</span>
        </el-menu-item>

        <el-menu-item index="/student/violation">
          <el-icon><WarningFilled /></el-icon>
          <span>违纪记录</span>
        </el-menu-item>

        <el-menu-item index="/student/expense">
        <el-icon><WalletFilled /></el-icon>
        <span>缴费记录</span>
        </el-menu-item>

        <el-menu-item index="/student/audit">
          <el-icon><Checked /></el-icon>
          <span>审核进度</span>
        </el-menu-item>

        <el-menu-item index="/student/announcement">
          <el-icon><BellFilled /></el-icon>
          <span>公告</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  LocationFilled,
  Tools,
  WalletFilled,
  BellFilled,
  UserFilled,
  WarningFilled,
  RemoveFilled,
  Checked
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


<style scoped>
  .el-menu-item{
    height:calc((100vh - 60px) / 10);
  }
</style>