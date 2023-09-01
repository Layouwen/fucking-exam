<template>
  <div class="px-6">
    <questionnaire-paper-name :paper-name="data.paperName" />
    <button @click="onGetContent">获取数据</button>
    <!--    <Toolbar-->
    <!--      style="border-bottom: 1px solid #ccc"-->
    <!--      :editor="editorRef"-->
    <!--      :defaultConfig="toolbarConfig"-->
    <!--      :mode="'default'"-->
    <!--    />-->
    <!--    <Editor-->
    <!--      style="height: 500px; overflow-y: hidden"-->
    <!--      v-model="valueHtml"-->
    <!--      :defaultConfig="editorConfig"-->
    <!--      :mode="'default'"-->
    <!--      @onCreated="handleCreated"-->
    <!--    />-->
    <Editor
      v-model="valueHtmlShow"
      :defaultConfig="editorConfigShow"
      :mode="'default'"
      @onCreated="handleCreatedShow"
    />
    <questionnaire-question-item
      v-for="(question, index) in data.questions"
      :index="+index"
      :key="question.subject"
      :data="data"
      :question="question"
      :result="result"
      :type="type"
      :answers="answers"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionnaireRender",
});
</script>

<script lang="ts" setup>
import { QuestionnairePaperName, QuestionnaireQuestionItem } from "./index";
import { QuestionnaireRenderType } from "./type";
import "@wangeditor/editor/dist/css/style.css";

let Editor;
let Toolbar;
if (process.client) {
  !(async () => {
    const a = await import("@wangeditor/editor-for-vue");
    Editor = a.Editor;
    Toolbar = a.Toolbar;
  })();
}

const props = withDefaults(
  defineProps<{
    data: any;
    result?: Record<string, string[]>;
    type?: QuestionnaireRenderType;
    answers?: Record<string, string[]>;
  }>(),
  {
    data: "",
    type: QuestionnaireRenderType.QUESTIONNAIRE,
    result: {},
    answers: {},
  }
);

const editorRef = shallowRef();
const editorRefShow = shallowRef();

// 内容 HTML
const valueHtml = ref(`hello`);
const valueHtmlShow = ref("");

const demo = `<h3 style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong>Why Dogs Bury Their Favorite Bones</strong></span><span style="color: rgb(0, 0, 0);"> </span></h3><p style="text-align: left;"><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;You may find it crazy that your dog buries his favorite bone or chew toy, only to dig it up a day or two later, but there is actually a reason behind it- -it is simply in their nature. For thousands of years, dogs have buried their bones. The practice itself started long before dogs were even pets when they had to bury bones to survive. </span></p><p><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;When dogs lived in the wild, sometimes food was scarce. If they were able to find food, dogs became very protective of it. Sometimes they would have more bones than they could eat for one meal. To keep other dogs and animals from stealing their bones, dogs would bury them in the ground. When it was time for the next meal, they would dig up their bones and enjoy them again. This would continue until the bones were gone. </span></p><p><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;Even though most dogs have plenty of food to eat today, their instincts still tell them to bury their bones and favorite toys. They do this to keep other dogs and animals from stealing them, just like their ancestors did. Some dogs keep at least two bones buried at once. When they want to dig up one, they will bury one more. This may leave a backyard full of holes and bones. </span></p><p><span style="color: rgb(0, 0, 0);"> &nbsp; &nbsp;How do dogs decide where to bury their bones? A dog cannot bury a bone just anywhere. He must first find the perfect spot. This involves using his nose to find a spot that is free from other dogs and animals. Often it is near a tree or a large rock, but it could be anywhere in the yard. Once the dog finds the perfect spot, he uses his front paws to dig a hole, drops the bone in and covers up the hole to protect his treasure. </span></p>`;

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = demo;
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
const editorConfigShow = { placeholder: "请输入内容...", readOnly: true };

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleCreatedShow = (editor: any) => {
  editorRefShow.value = editor; // 记录 editor 实例，重要！
};

const onGetContent = () => {
  if (editorRef.value?.getHtml()) {
    console.log(editorRef.value.getHtml(), "layouwen");
    valueHtmlShow.value = editorRef.value.getHtml();
  } else {
    valueHtmlShow.value = demo;
  }
};
</script>
