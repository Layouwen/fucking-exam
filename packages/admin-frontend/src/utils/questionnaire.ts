import { Question, QUESTION_TYPE } from '@fucking-exam/shared';

// @deprecated No longer in use
export const showSubjectAndAnswer = (question: Question) => {
  const answerTemplate = '$ANSWER';
  switch (question.type) {
    case QUESTION_TYPE.singleChoice:
      return question.subject.replace(answerTemplate, question.answer);
    case QUESTION_TYPE.multipleChoice:
      return question.subject.replace(answerTemplate, question.answers.join(''));
  }
};
