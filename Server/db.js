const mongoose = require ('mongoose')

const dbUrl='mongodb+srv://athiramarvacs:athira@cluster0.pzdu6.mongodb.net/'

module.exports = ()=>
    mongoose.connect(dbUrl)
