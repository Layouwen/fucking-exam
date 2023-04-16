<template>
  <div>结果页</div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

onMounted(() => {
  console.log(route.params);
});
</script>
