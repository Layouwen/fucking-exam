import { Question, questionType } from '@fucking-exam/shared';

// @deprecated No longer in use
export const showSubjectAndAnswer = (question: Question) => {
  const answerTemplate = '$ANSWER';
  switch (question.type) {
    case questionType.singleChoice:
      return question.subject.replace(answerTemplate, question.answer);
    case questionType.multipleChoice:
      return question.subject.replace(answerTemplate, question.answers.join(''));
  }
};
