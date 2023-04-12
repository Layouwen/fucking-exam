import { Question, QuestionType } from '@fucking-exam/types';

// @deprecated No longer in use
export const showSubjectAndAnswer = (question: Question) => {
  const answerTemplate = '$ANSWER';
  switch (question.type) {
    case QuestionType.SINGLE_CHOICE:
      return question.subject.replace(answerTemplate, question.answer);
    case QuestionType.MULTIPLE_CHOICE:
      return question.subject.replace(answerTemplate, question.answers.join(''));
  }
};
