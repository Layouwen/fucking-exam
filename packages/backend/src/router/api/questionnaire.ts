import { Router } from 'express'
import { questionnaireClientController } from '../../controllers'
import { clientAuthenticate } from '../../middlewares'

const questionnaire = Router()

questionnaire.get('/response/:id', questionnaireClientController.getQuestionnaireResponseById)
questionnaire.post('/submit/:id', questionnaireClientController.submitQuestionnaireById)
questionnaire.get('/mine', clientAuthenticate, questionnaireClientController.getQuestionnaireMineList)
questionnaire.get('/:id', questionnaireClientController.getQuestionnaireById)
questionnaire.get('/', questionnaireClientController.getQuestionnaireList)

export default questionnaire
