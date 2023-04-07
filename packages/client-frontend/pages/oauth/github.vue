<template>
  <NButton @click="onGithubOauthLogin">github登录</NButton>
</template>

<script lang="ts" setup>
import { NButton } from "naive-ui";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const { code } = route.query;
  if (code) {
    router.replace({ path: "/oauth/github" });
    // TODO: any
    const res: any = await $fetch("/api/oauth/github", {
      baseURL: "",
      method: "POST",
      body: {
        code,
      },
    });

    localStorage.setItem("token", res.token);
  }
});

const onGithubOauthLogin = () => {
  window.location.href =
    "https://github.com/login/oauth/authorize?client_id=a644d75524601839ea7a&redirect_uri=http://localhost:3001/oauth/github&scope=user&response_type=token";
};
</script>
