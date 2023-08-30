<template>
  <t-form
    ref="form"
    :class="['item-container']"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <t-form-item name="email">
      <t-input v-model="formData.email" type="text" size="large" placeholder="请输入您的邮箱">
        <template #prefix-icon>
          <t-icon name="mail" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item class="verification-code" name="code">
      <t-input v-model="formData.code" size="large" placeholder="请输入验证码" />
      <t-button variant="outline" :disabled="countDown > 0" @click="onSendEmailCode">
        {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
      </t-button>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin, FormRule } from 'tdesign-vue-next';
import { useCounter } from '@/hooks';
import { emailSendApi } from '@/api';
import { useAuthStore } from '@/store';

const INITIAL_DATA = {
  email: '',
  password: '',
  code: '',
};

const FORM_RULES: Record<string, FormRule[]> = {
  email: [
    { required: true, message: '邮箱必填', type: 'error' },
    { email: true, message: '请输入正确的邮箱', type: 'warning' },
  ],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  code: [{ required: true, message: '验证码必填', type: 'error' }],
};

const authStore = useAuthStore();

const form = ref();
const formData = ref({ ...INITIAL_DATA });

const showPsw = ref(false);

const [countDown, handleCounter] = useCounter();

const emit = defineEmits(['registerSuccess']);

const onSendEmailCode = async () => {
  const formValidateResult = await form.value.validate();

  if (formValidateResult.email) {
    MessagePlugin.warning('请检查邮箱是否正确');
    return;
  }

  const res = await emailSendApi({ email: formData.value.email });

  if (res.code === 200) {
    handleCounter();
  }
};

const onSubmit = async ({ validateResult }) => {
  if (validateResult !== true) return;

  const res = await authStore.register(formData.value);

  if (res.code === 200) {
    emit('registerSuccess', formData.value);
  }
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
