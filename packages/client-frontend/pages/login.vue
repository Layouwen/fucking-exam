<template>
  <div class="px-10 pt-32">
    <n-form
      ref="formRef"
      :model="formValue"
      label-width="60"
      labelPlacement="left"
    >
      <n-form-item label="邮箱:" path="email">
        <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
      </n-form-item>
      <n-form-item label="密码:" path="password">
        <n-input v-model:value="formValue.password" placeholder="输入密码" />
      </n-form-item>
      <n-form-item>
        <div class="space-y-2 w-full">
          <n-button block type="primary" @click="onSubmit">登录</n-button>
          <n-button block @click="onBack">返回</n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "~/api";

const message = useMessage();
const router = useRouter();

const formValue = reactive({
  email: "",
  password: "",
});

const onSubmit = async () => {
  if (!formValue.email) {
    return message.warning("请输入邮箱");
  }
  if (!formValue.password) {
    return message.warning("请输入密码");
  }

  Object.keys(formValue).forEach(
    (key) =>
      (formValue[key as keyof typeof formValue] =
        formValue[key as keyof typeof formValue].trim())
  );

  const res = await loginApi(formValue);

  if (res.code === 200) {
    localStorage.setItem("token", res.data.token);

    setTimeout(() => {
      router.push("/");
    }, 1000);

    message.success("登录成功");
  } else {
    message.error("登录失败");
  }
};

const onBack = () => {
  router.push("/");
};
</script>
