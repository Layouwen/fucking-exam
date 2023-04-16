import { Router } from 'express';
import { questionnaireClientController } from '../../controllers';
import authenticate from '../../middlewares/authenticate';

const questionnaire = Router();

questionnaire.get('/response/:id', questionnaireClientController.getQuestionnaireResponseById);
questionnaire.post('/submit/:id', authenticate, questionnaireClientController.submitQuestionnaireById);
questionnaire.get('/:id', questionnaireClientController.getQuestionnaireById);

export default questionnaire;
