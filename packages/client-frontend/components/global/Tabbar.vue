<template>
  <van-tabbar v-model="matchPath" @change="onChange">
    <van-tabbar-item name="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="/list" icon="notes-o">列表</van-tabbar-item>
    <van-tabbar-item name="/mine" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
const route = useRoute()

const matchPath = ref('')

const onChange = (path: string) => {
  navigateTo(path)
}

watchEffect(() => {
  const path = route.path

  if (path === '/') {
    matchPath.value = '/'
  } else if (path.startsWith('/list')) {
    matchPath.value = '/list'
  } else if (path.startsWith('/mine')) {
    matchPath.value = '/mine'
  }
})
</script>
