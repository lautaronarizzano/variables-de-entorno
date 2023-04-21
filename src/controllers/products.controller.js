import Products from '../dao/dbManagers/products.js'
import { productModel } from '../dao/models/productModel.js'

const productManager = new Products()

const getProducts = async (req, res) => {
    const { limit = 10, page = 1, query , sort } = req.query
    try {        

        if (query == undefined) {
            const productsPaginates = await productModel.paginate({ }, {limit: limit, page: page, sort:{ price: sort}}, (err, result) => {
                    const nextPage = result.hasNextPage && `localhost:8080/api/products?limit=${limit}&page=${result.nextPage}`
                    const prevPage = result.hasPrevPage && `localhost:8080/api/products?limit=${limit}&page=${result.prevPage}`
                const response = {
                    ...result,
                    nextLink: nextPage,
                    prevLink: prevPage 
                }
                res.send({status: 'success', payload: response})
            })
            
        } else {
            if(query == "comida" || query == "bebida" || query == "complemento") {
                const productsPaginates = await productModel.paginate({ category: query }, {limit: limit, page: page, sort:{ price: sort}}, (err, result) => {
                    const nextPage = result.hasNextPage ? `localhost:8080/api/products?query=${query}&limit=${limit}&page=${result.nextPage}`: null
                    const prevPage = result.hasPrevPage ? `localhost:8080/api/products?query=${query}limit=${limit}&page=${result.prevPage}`: null
                const response = {
                    ...result,
                    nextLink: nextPage,
                    prevLink: prevPage 
                }
                res.send({status: 'success', payload: response})
                })
            }
            else if(query == "true" || query == "false"){
                const productsPaginates = await productModel.paginate({ status: query }, {limit: limit, page: page, sort:{ price: sort}}, (err, result) => {
                    const nextPage = result.hasNextPage ? `localhost:8080/api/products?query=${query}&limit=${limit}&page=${result.nextPage}`: null
                    const prevPage = result.hasPrevPage ? `localhost:8080/api/products?query=${query}limit=${limit}&page=${result.prevPage}`: null
                const response = {
                    ...result,
                    nextLink: nextPage,
                    prevLink: prevPage 
                }
                res.send({status: 'success', payload: response})
                })
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

const getProductById = async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await productManager.getById(pid)
        res.send({status: 'success', payload: products})
    } catch (error) {
        res.status(500).send({ error })
    }
}

const createProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category, status} = req.body
    if(!title || !description || !price || !code || !stock || !category) return res.status(400).send({ status: 'error', error: 'Incomplete values'})

    try {
        const result = await productManager.save({
            title,
            description,
            price,
            thumbnail,
            code,
            status,
            stock,
            category
        })
        res.send({result: 'success', payload: result})
    } catch (error) {
        res.status(500).send({error: error})
        console.log(error)
    }
}

const updateProduct = async (req, res) => {
    const pid = req.params.pid
    const product = req.body
    try {
        const result = await productManager.update(pid, product)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const result = await productManager.delete(pid)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
}

export {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct
}