<template>
  <el-menu
    mode="vertical"
    class="el-menu-vertical"
    unique-opened
    @open="handleOpen"
    @close="handleClose"
    background-color=""
    :collapse="isCollapse">
        <el-submenu index="1" class="menu_yy">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">票据管理</span>
          </template>
          <el-submenu index="1-1" >
            <template slot="title" >
              <span slot="title" class="text_center">列车数据</span>
            </template>
            <router-link to="/Train">
              <el-menu-item index="1-1-2" class="text_right">直达系列</el-menu-item>
            </router-link>
            <router-link to="/Train_Transfer">
              <el-menu-item index="1-1-3" class="text_right">中转系列</el-menu-item>
            </router-link>
          </el-submenu>
          <router-link to="/Aircraft" class="text_center">
            <el-menu-item index="1-2" class="text_center">航班数据</el-menu-item>
          </router-link>
          <router-link to="/Automobile" class="text_center">
            <el-menu-item index="1-3" class="text_center">巴车数据</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/">
        <el-menu-item index="2">
          <i class="el-icon-location"></i>
          <span slot="title">路线类型</span>
        </el-menu-item>
        </router-link>
        <router-link to="/app_user">
          <el-menu-item index="3">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </router-link>
  </el-menu>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    computed: {
      ...mapGetters([
        'routers'
      ])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log('handleOpen', key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log('handleClose', key, keyPath)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .el-menu-vertical:not(.el-menu--collapse)
    position fixed
    top 61px
    width 200px
    height 100%
    min-height 500px

  
  .menu_yy:hover{
    box-shadow:0px 1px 0px rgba(0,0,0,0.1)
  }
</style>