<template>
  <el-row class="tac" style="width:300px;height:calc(100vh - 70px);overflow: auto;">
    <el-col :span="12">
      <el-menu
          default-active="/manager/studentmanagement"
          router="router"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="overflow: hidden"
      >

        <el-menu-item index="/manager/studentmanagement">
          <el-icon><UserFilled /></el-icon>
          <span>学生管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/buildingmanagement">
          <el-icon><Histogram /></el-icon>
          <span>楼栋管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/dormitorymanagement">
          <el-icon><HomeFilled /></el-icon>
          <span>宿舍管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/expensemanagement">
          <el-icon><WalletFilled /></el-icon>
          <span>缴费管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/visitormanagement">
          <el-icon><Avatar /></el-icon>
          <span>访客管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/violationmanagement">
          <el-icon><WarningFilled /></el-icon>
          <span>违纪管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/assignmanagement">
          <el-icon><Promotion /></el-icon>
          <span>分配管理</span>
        </el-menu-item>

        <el-menu-item index="/manager/audit">
          <el-icon><Checked /></el-icon>
          <span>审核</span>
        </el-menu-item>

        <el-menu-item index="/manager/stats">
          <el-icon><TrendCharts /></el-icon>
          <span>统计</span>
        </el-menu-item>

        <el-menu-item index="/manager/announcement">
          <el-icon><BellFilled /></el-icon>
          <span>公告</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  TrendCharts,
  HomeFilled,
  WalletFilled,
  BellFilled,
  List,
  Avatar,
  UserFilled,
  Checked,
  WarningFilled,
  Promotion,
  Histogram
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
    height:calc((100vh - 60px) / 10)
  }
</style>