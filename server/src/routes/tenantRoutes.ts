import express from 'express'
import { getTenant, createTenant, upadteTenant, getCurrentResidences, addFavoriteProperty, removeFavoriteProperty } from '../controllers/tenantControllers'

const router = express.Router()


router.get('/:cognitoId', getTenant)
router.put('/:cognitoId', upadteTenant)
router.get('/:cognitoId/current-residences', getCurrentResidences)
router.post('/', createTenant)
router.post('/:cognitoId/favorites/:propertyId', addFavoriteProperty)
router.delete('/:cognitoId/favorites/:propertyId', removeFavoriteProperty)



export default router
