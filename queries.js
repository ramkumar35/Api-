const Pool = require('pg').Pool
const pool = new Pool({
  
  /* #the port number and datbase name can be changed accordind to pc # */
    user: 'postgres',
  host: 'localhost',
  database: 'Testdb',
  password: 'root',
  port: 5432,
  connectlimit: 10
})
//const getUsers = (request, response) => {
    pool.query('select * from public.userdetail', (err, res) => {
      return console.log (res)
    })
        /*throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    getUsers,
}*/

