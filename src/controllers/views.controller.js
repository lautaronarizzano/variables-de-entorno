import Products from '../dao/dbManagers/products.js'
import Carts from '../dao/dbManagers/carts.js'
import { productModel } from '../dao/models/productModel.js'

const productsManager = new Products()
const cartsManager = new Carts()

const register = async (req, res) => {
    res.render('register')
}

const login = async (req, res) => {
    res.render('login')
}

const products = async (req, res) => {
    const { limit = 10, page = 1, query , sort } = req.query
    
    try {        

        if (query == undefined) {
            const productsPaginates = await productModel.paginate({ }, {limit: limit, page: page, sort:{ price: sort}, lean:true})
            const products = productsPaginates.docs
            res.render('products', {products, user: req.session.user})
            
        } else {
            if(query == "comida" || query == "bebida" || query == "complemento") {
                const productsPaginates = await productModel.paginate({ category: query }, {limit: limit, page: page, sort:{ price: sort}, lean:true})
                const products = productsPaginates.docs
            res.render('products', {products, user: req.session.user})
            }
            else if(query == "true" || query == "false"){
                const productsPaginates = await productModel.paginate({ status: query }, {limit: limit, page: page, sort:{ price: sort}, lean:true})
                const products = productsPaginates.docs
            res.render('products', {products, user: req.session.user})
            }
            else{
                console.log('query is not valid')
                res.send({status: error, payload: 'query is not valid'})
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

const carts = async (req, res) => {
    const {cid} = req.params;
    try {
        let cartProm = await cartsManager.getCartById(cid); 
    const cartArray = cartProm.products; 
    const cartProducts = cartArray.map(function(productObj){
        // validarUrlIndividual(productObj.product);
        return productObj = {title:productObj.product.title, description:productObj.product.description,
            code:productObj.product.code, quantity:productObj.quantity, price:productObj.product.price, stock:productObj.product.stock,category:productObj.product.category,thumbnail:productObj.product.thumbnail}
    })
    res.render('carts',{cartProducts})
    } catch (error) {
        console.log(error)
    }

}

export{
    register,
    login,
    products,
    carts
}