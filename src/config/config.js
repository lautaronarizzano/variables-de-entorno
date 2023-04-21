import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.PORT)

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
}