 import express from 'express'
import {getTenant,createTenant,upadteTenant} from '../controllers/tenantControllers'

 const router = express.Router()


 router.get('/:cognitoId',getTenant)
 router.put('/:cognitoId',upadteTenant)
 router.post('/',createTenant)


 export default router
