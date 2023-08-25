<script lang="ts" setup>
import { isMobile } from '@fucking-exam/shared/src/utils'
import { useAuthStore } from '~/stores'

type CellGroup = {
  isLogin?: boolean
  data: { title: string; isLogin?: boolean; isLink?: boolean; onClick?: () => void }[]
}

const authStore = useAuthStore()

const cellList = [
  {
    data: [
      {
        title: '手机号码',
        isLogin: true,
      },
      {
        title: '消息通知',
        isLogin: true,
      },
      {
        title: '问题反馈',
        onClick: () => {
          if (isMobile()) {
            showNotify({ type: 'primary', message: '打开QQ' })
            window.location.href = 'mqq://im/chat?chat_type=wpa&uin=794234293&version=1&src_type=web'
          }
        },
      },
    ],
  },
  {
    isLogin: true,
    data: [
      {
        title: '退出账号',
        onClick: () => {
          authStore.logout()
        },
      },
    ],
  },
] as CellGroup[]

const onGoLogin = () => {
  navigateTo('/login')
}

const isDisplayCellGroup = (isLogin?: boolean) => {
  if (isLogin === undefined) {
    return true
  } else {
    return isLogin && authStore.isLogin
  }
}
</script>

<template>
  <Wrapper>
    <div class="space-y-3 py-[var(--van-padding-md)]">
      <Card v-if="authStore.isLogin" class="cvant-mx flex flex-col items-center space-y-3" ghost>
        <!-- TODO: user.avatar -->
        <van-image
          round
          class="h-[90px] w-[90px] border-[#cfcfcf] border-[1px] border-solid"
          fit="cover"
          :src="authStore.user?.id"
        />
        <span class="text-[24px] font-[500]">{{ authStore.user?.nickname }}</span>
        <span class="text-[16px]">@{{ authStore.user?.username }}</span>
      </Card>
      <Card v-else ghost class="cvant-mx flex items-center text-[14px]">
        <div class="flex-grow space-y-1">
          <div class="text-[24px] font-[500]">Hello!</div>
          <div class="">立刻登录, 解锁刷题新姿势</div>
        </div>
        <van-button type="primary" size="small" round @click="onGoLogin">登录/注册</van-button>
      </Card>
      <template v-for="(cellGroup, i) in cellList" :key="i">
        <van-cell-group inset v-if="isDisplayCellGroup(cellGroup.isLogin)">
          <template v-for="cell in cellGroup.data" :key="cell.title">
            <van-cell v-if="isDisplayCellGroup(cell.isLogin)" :title="cell.title" is-link @click="cell?.onClick" />
          </template>
        </van-cell-group>
      </template>
    </div>
  </Wrapper>
  <Tabbar />
</template>
