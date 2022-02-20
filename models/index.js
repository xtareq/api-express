
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL)

const db = {}

db.con = sequelize
db.user = require('./user')(db.con,Sequelize)
db.todo = require('./todo')(db.con,Sequelize)


//let create these table automatically 
// now lets check in our database are they really created or not
// its not update the column yet if we check the database well'll see
// the username field isn't unique yet
// we can achieve this by forcing the sync it'll
// recreate our tables


// force should be false once we satisfied with our table
// structure otherwise it'll wipe our old data and create
// new tables again and again 
db.con.sync({force:false})


module.exports = db 