import { Question, QuestionModel, questionType } from '@fucking-exam/shared';
import { QuestionnaireData } from '@/pages/questionnaire/types';

// @deprecated No longer in use
export const showSubjectAndAnswer = (question: Question | QuestionModel) => {
  const answerTemplate = '$ANSWER';

  switch (question.type) {
    case questionType.SINGLE_CHOICE:
      return question.subject.replace(answerTemplate, question.answers.join(''));
    case questionType.multipleChoice:
      return question.subject.replace(answerTemplate, question.answers.join(''));
    default:
      return question.subject;
  }
};

export function checkQuestionnaireData(questionnaireData: QuestionnaireData): {
  status: boolean;
  msg: string;
} {
  const result = {
    status: true,
    msg: '',
  };

  questionLoop: for (const question of questionnaireData.questions) {
    switch (question.type) {
      case questionType.SINGLE_CHOICE:
      case questionType.multipleChoice:
        if (question.answers.length === 0) {
          result.status = false;
          result.msg = `题目: "${question.subject}" 至少选择一个正确答案`;
          break questionLoop;
        }
        break;
      default:
    }
  }

  return result;
}

export function formatQuestionnaireData(questionnaireData: QuestionnaireData) {
  const questions = questionnaireData.questions.map((question) => {
    const _question = { ...question };

    switch (_question.type) {
      case questionType.RICH_TEXT:
        delete _question.analyze;
        delete _question.answers;
        delete _question.options;
        break;
      case questionType.SINGLE_CHOICE:
      case questionType.multipleChoice:
        delete _question.richText;
        break;
      default:
        break;
    }

    if (_question.answers) {
      _question.type = _question.answers.length > 1 ? questionType.multipleChoice : questionType.SINGLE_CHOICE;
    }

    return _question;
  });

  return {
    ...questionnaireData,
    questions,
  };
}
