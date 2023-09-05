<script lang="ts" setup>
// eslint-disable-next-line import/no-duplicates
import { shallowRef, onBeforeUnmount, defineProps, defineEmits, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: 'default',
  },
  style: {
    type: String,
    default: '',
  },
  isShowToolbar: {
    type: Boolean,
    default: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits({
  'update:modelValue': (v: string) => true,
});

const handleCreated = (editor: any) => {
  editor.setHtml(props.modelValue);
  editorRef.value = editor;
};

const demo = `<h3 style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong>Why Dogs Bury Their Favorite Bones</strong></span><span style="color: rgb(0, 0, 0);"> </span></h3><p style="text-align: left;"><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;You may find it crazy that your dog buries his favorite bone or chew toy, only to dig it up a day or two later, but there is actually a reason behind it- -it is simply in their nature. For thousands of years, dogs have buried their bones. The practice itself started long before dogs were even pets when they had to bury bones to survive. </span></p><p><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;When dogs lived in the wild, sometimes food was scarce. If they were able to find food, dogs became very protective of it. Sometimes they would have more bones than they could eat for one meal. To keep other dogs and animals from stealing their bones, dogs would bury them in the ground. When it was time for the next meal, they would dig up their bones and enjoy them again. This would continue until the bones were gone. </span></p><p><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;Even though most dogs have plenty of food to eat today, their instincts still tell them to bury their bones and favorite toys. They do this to keep other dogs and animals from stealing them, just like their ancestors did. Some dogs keep at least two bones buried at once. When they want to dig up one, they will bury one more. This may leave a backyard full of holes and bones. </span></p><p><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;How do dogs decide where to bury their bones? A dog cannot bury a bone just anywhere. He must first find the perfect spot. This involves using his nose to find a spot that is free from other dogs and animals. Often it is near a tree or a large rock, but it could be anywhere in the yard. Once the dog finds the perfect spot, he uses his front paws to dig a hole, drops the bone in and covers up the hole to protect his treasure. </span></p>`;
console.log(demo, 'layouwen demo');

const onUpdateValue = (edit: any) => {
  if (props.readOnly) return;
  emits('update:modelValue', edit.getHtml());
};

watch(
  () => props.modelValue,
  (nv) => {
    editorRef.value.setHtml(nv);
  },
);

const editorRef = shallowRef();

const editorConfig = { placeholder: props.readOnly ? '' : '请输入内容...', readOnly: props.readOnly };

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <toolbar v-if="isShowToolbar" style="border-bottom: 1px solid #ccc" :editor="editorRef" :mode="'default'" />
  <editor
    :style="style"
    @onChange="onUpdateValue"
    :default-config="editorConfig"
    :mode="'default'"
    @onCreated="handleCreated"
  />
</template>

<script lang="ts">
// eslint-disable-next-line import/no-duplicates
import { defineComponent } from 'vue';

export default defineComponent({ name: 'RichEdit' });
</script>
