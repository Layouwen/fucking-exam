import { Router } from 'express'
import { questionnaireClientController } from '../../controllers'

const questionnaire = Router()

questionnaire.get('/response/:id', questionnaireClientController.getQuestionnaireResponseById)
questionnaire.post('/submit/:id', questionnaireClientController.submitQuestionnaireById)
questionnaire.get('/:id', questionnaireClientController.getQuestionnaireById)
questionnaire.get('/', questionnaireClientController.getQuestionnaireList)

export default questionnaire
