<template>
  <NuxtPage />
  <div>
    <div class="bg-[pink]">
      {{ counter.n }}
    </div>
    <div class="bg-[red]" @click="add">click me</div>
    <div>
      <h1>Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </div>
    <Icon name="TestIcon" class="text-[red]" />
  </div>
</template>

<script lang="ts" setup>
// import "~/assets/styles/main.less";
import { ref } from "#imports";
import { useCounter } from "~/stores/user";
import { Icon } from "#components";

const counter = useCounter();
const colorMode = useColorMode();
console.log(colorMode.preference);
const name = ref("layouwen");

const add = () => {
  counter.n++;
};
</script>
