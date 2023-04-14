<template>
  <h1>index</h1>
</template>

<script lang="ts" setup>
import { request } from "@/utils";

onMounted(() => {
  request("/api/user").then((res) => {
    console.log(res, "layouwen res data");
  });
});
</script>
