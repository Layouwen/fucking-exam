<script lang="ts" setup>
// eslint-disable-next-line import/no-duplicates
import {
  ref,
  shallowRef,
  onBeforeUnmount,
  defineProps,
  defineEmits,
  watch,
} from "vue";
import "@wangeditor/editor/dist/css/style.css";

let Editor, Toolbar;
const displayEdit = ref(false);

if (typeof window !== "undefined") {
  !(async () => {
    const wangeditor = await import("@wangeditor/editor-for-vue");
    Editor = wangeditor.Editor;
    Toolbar = wangeditor.Toolbar;
    displayEdit.value = true
  })();
}

const props = defineProps({
  modelValue: {
    type: String,
    default: "default",
  },
  style: {
    type: String,
    default: "",
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
  "update:modelValue": (v: string) => true,
});

const num = ref(0);

const handleCreated = (editor: any) => {
  editor.setHtml(props.modelValue);
  editorRef.value = editor;
};

const onUpdateValue = (edit: any) => {
  if (props.readOnly) return;
  emits("update:modelValue", edit.getHtml());
};

const add = () => num.value++;

watch(
  () => props.modelValue,
  (nv) => {
    editorRef.value.setHtml(nv);
  }
);

const editorRef = shallowRef();

const editorConfig = {
  placeholder: props.readOnly ? "" : "请输入内容...",
  readOnly: props.readOnly,
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <template v-if="displayEdit">
    <toolbar
        v-if="isShowToolbar"
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :mode="'default'"
    />
    <editor
        :style="style"
        @onChange="onUpdateValue"
        :default-config="editorConfig"
        :mode="'default'"
        @onCreated="handleCreated"
    />
  </template>
</template>

<script lang="ts">
// eslint-disable-next-line import/no-duplicates
import { defineComponent } from "vue";

export default defineComponent({ name: "RichEdit" });
</script>

Towns like Blackpool and Brighton are popular for their beaches and amusement arcades（游 乐 场 ）. People go there to swim, sunbathe and eat fish and chips. The water can be quite cold, though, and that’s why quite a lot of people prefer to go abroad for their summer holiday instead. Popular destinations include Spain, Germany and France: all countries that promise a lot of sunshine.
