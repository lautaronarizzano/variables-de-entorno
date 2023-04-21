import {
    Router
} from 'express'
import {
    getCarts,
    createCart,
    getCartById,
    addProductInCart,
    deleteProductInCart,
    deleteCart,
    updateQuantity,
    updateCart
} from '../../controllers/carts.controller.js'

const router = Router()

router.get('/', getCarts)

router.post('/', createCart)

router.get('/:cid', getCartById)

router.post('/:cid/products/:pid', addProductInCart)

router.delete('/:cid/products/:pid', deleteProductInCart);

router.delete('/:cid', deleteCart)

router.put('/:cid/products/:pid', updateQuantity)

router.put('/:cid', updateCart);


export default router