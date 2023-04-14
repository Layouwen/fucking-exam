import { Question, QuestionType } from '@fucking-exam/shared';

// @deprecated No longer in use
export const showSubjectAndAnswer = (question: Question) => {
  const answerTemplate = '$ANSWER';
  switch (question.type) {
    case QuestionType.singleChoice:
      return question.subject.replace(answerTemplate, question.answer);
    case QuestionType.multipleChoice:
      return question.subject.replace(answerTemplate, question.answers.join(''));
  }
};
