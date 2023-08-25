<template>
  <van-tabbar class="!fixed" :model-value="matchPath">
    <van-tabbar-item
      v-for="tabbar in tabbarList"
      :key="tabbar.text"
      :name="tabbar.path"
      :icon="tabbar.icon"
      @click="
        navigateTo({
          replace: true,
          path: tabbar.path,
        })
      "
    >
      {{ tabbar.text }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
const route = useRoute()

const tabbarList = [
  {
    path: '/',
    icon: 'home-o',
    text: '首页',
  },
  {
    path: '/list',
    icon: 'notes-o',
    text: '列表',
  },
  {
    path: '/mine',
    icon: 'user-o',
    text: '我的',
  },
]

const matchPath = ref('')

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
