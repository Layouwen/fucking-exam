export const OPTIONS_LETTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const QUESTION_OPTION_ITEM_BUTTONS = [
  { emitName: "edit" as const, text: "编辑" },
  { emitName: "copy" as const, text: "复制" },
  { emitName: "delete" as const, text: "删除" },
  { emitName: "move-up" as const, text: "上移", topUnShow: true },
  { emitName: "move-down" as const, text: "下移", bottomUnShow: true },
  { emitName: "move-top" as const, text: "最前", topUnShow: true },
  { emitName: "move-bottom" as const, text: "最后", bottomUnShow: true },
];

export const QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES =
  QUESTION_OPTION_ITEM_BUTTONS.map((b) => b.emitName);
