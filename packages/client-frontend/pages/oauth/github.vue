<template></template>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { showLoadingToast, closeToast } from "vant";
import { postOauthGithubLoginApi } from "~/api";

const route = useRoute();
const router = useRouter();
const message = useMessage();

onMounted(async () => {
  const { code } = route.query;

  if (code) {
    router.replace({ path: "/oauth/github" });
    showLoadingToast({
      message: "github授权中...",
      duration: 0,
      forbidClick: true,
    });

    const res = await postOauthGithubLoginApi(code as string);

    if (res.code === 200) {
      localStorage.setItem("token", res.data.token);
      message.success("登录成功");
    } else {
      message.error("登录失败");
    }

    closeToast();

    setTimeout(() => {
      router.push("/");
    }, 1000);
  } else {
    router.push("/");
  }
});
</script>
