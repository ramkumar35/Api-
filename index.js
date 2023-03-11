const { Client } = require('pg');

(async () => {
  const fetch = await import('node-fetch').then(m => m.default);

  const body = {
    "PolicyNumber": "0239418686 00",

    "AuthId": "/I5f51Pzmmf4Lf5im5yRXGJXab9hvK5xAgSFadxi6W0="
  };

  // Make API call
  const response = await fetch('https://software.healthindiatpa.com/HiWebApi/IIBPL/GetEnrollmentDataDetails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  const dataArray = Object.values(data);

  // Connect to PostgreSQL database
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'EnrollmentDataDetail',
    password: 'root',
    port: 5432,
  });
  await client.connect();

  // Insert data into PostgreSQL database
  for (const item of dataArray) {
    const query = `INSERT INTO enrollmentdatadeatil(policynumber, employeename, employeecode ,suminsured,familycode,healthindiaid,insuredname,gender,dateofbirth,age,mobileno,emailid,policyjoiningdate,endorsementdate,addeddate,relation,status) 
                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`;
    const values = [
       item.PolicyNumber,
       item.EmployeeName, 
       item.EmployeeCode , 
       item.SumInsured,
       item.FamilyCode,
       item.HealthIndiaID,
       item.InsuredName,
       item.Gender,
       item.DateofBirth,
       item.Age,
       item.MobileNo,
       item.EmailId,
       item.PolicyJoiningDate,
       item.EndorsementDate,
       item.AddedDate,
       item.Relation,
       item.Status
    ];

    try {
      await client.query(query, values);
      console.log('Data inserted successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  console.log("Project is running");

  // Close connection
  await client.end(); 
  console.log("Project ended");
})();
