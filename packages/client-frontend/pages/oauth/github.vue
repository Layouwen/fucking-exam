<template>
  <NButton @click="onGithubOauthLogin">github登录</NButton>
</template>

<script lang="ts" setup>
import axios from "axios";
import { NButton } from "naive-ui";

const route = useRoute();

onMounted(() => {
  const { code } = route.query;
  if (code) {
    console.log(code);
    axios
      .get("http://localhost:3000/oauth/github", {
        params: {
          code,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
});

const onGithubOauthLogin = () => {
  window.location.href =
    "https://github.com/login/oauth/authorize?client_id=a644d75524601839ea7a&redirect_uri=http://localhost:3001/oauth/github&scope=user&response_type=token";
};
</script>
