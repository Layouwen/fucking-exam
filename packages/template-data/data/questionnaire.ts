export const questionnaire = {
  paperName: "测试试卷",
  config: {
    isQuestionRandom: true,
    isQuestionOptionRandom: true,
  },
  questions: [
    {
      id: "111",
      type: "multipleChoice",
      subject: "vue的作者是谁？",
      options: [
        {
          label: "尤雨溪",
          value: "A",
        },
        {
          label: "Avan",
          value: "B",
        },
        {
          label: "Yqq",
          value: "C",
        },
        {
          label: "VanYu",
          value: "D",
        },
      ],
      answers: ["A", "B"],
    },
    {
      id: "222",
      type: "singleChoice",
      subject: "谁是世界上最美的人？",
      options: [
        {
          label: "尤雨溪",
          value: "A",
        },
        {
          label: "Avan",
          value: "B",
        },
        {
          label: "Yqq",
          value: "C",
        },
        {
          label: "VanYu",
          value: "D",
        },
      ],
      answer: "C",
    },
  ],
};
