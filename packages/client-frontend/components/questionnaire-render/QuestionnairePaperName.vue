<template>
  <div class="text-[20px] pt-9 pb-4 font-bold text-center">
    {{ paperName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionnairePaperName",
});
</script>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  paperName: {
    type: String,
    required: false,
  },
});
</script>
