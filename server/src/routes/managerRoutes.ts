import express from 'express'
import { getManager, createManager, upadteManager } from '../controllers/managerControllers'

const router = express.Router()


router.get('/:cognitoId', getManager)
router.put('/:cognitoId', upadteManager)
router.post('/', createManager)


export default router
