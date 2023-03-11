const {Pool ,Client } =require('pg')



/* postgres.connect("http://127.0.0.1:5050/?key=a30ce045-2441-4ecc-a498-45fc6cfbc29b"); */
const client = new Client('postgresql://postgres:root@127.0.0.1:5050/EnrollmentDetails'
);
client.connect();

client.query(`select * from EnrollmentDetails`,
(err , res)=>{if(!err){
    console.log(res.rows);
}else{
    console.log(err.message);
}
 
 client.end;
})
