<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type === 'password'">
      <t-form-item name="email">
        <t-input v-model="formData.email" size="large" placeholder="请输入邮箱">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入密码"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>
    </template>
    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录</t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();

const INITIAL_DATA = {
  email: '',
  password: '',
};

const FORM_RULES: Record<string, FormRule[]> = {
  email: [{ required: true, message: '邮箱必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

const type = ref('password');

const form = ref<FormInstanceFunctions>();
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);

const router = useRouter();
const route = useRoute();

const onSubmit = async ({ validateResult }) => {
  if (validateResult !== true) return;

  const res = await authStore.login(formData.value);

  if (res.code === 200) {
    const redirect = route.query.redirect as string;
    const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard';

    router.push(redirectUrl);
  }
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
