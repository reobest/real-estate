import express from 'express'
import { getManager, createManager, upadteManager, getManagerProperties } from '../controllers/managerControllers'

const router = express.Router()


router.get('/:cognitoId', getManager)
router.put('/:cognitoId', upadteManager)
router.get('/:cognitoId/properties',getManagerProperties)
router.post('/', createManager)


export default router
