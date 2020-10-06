const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {Restaurant, sequelize} = require('./models')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll()
    console.log(restaurants)
    res.render('restaurants', {restaurants})
})

app.listen(3000, async () => {
    await sequelize.sync()
    console.log("Web server is running")
})