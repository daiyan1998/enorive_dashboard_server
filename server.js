import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

// import routes
import authRoute from './routes/auth.route.js'
import categoryRoutes from './routes/category.route.js'
import productRoutes from './routes/product.route.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth",authRoute)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/products", productRoutes)

app.listen(port, (error) => {
    if(!error) {
        console.log(`Server is running on port ${port}`)
    } else {
        console.log("Error occured, Server can't start",error)
    }

})