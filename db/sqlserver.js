const sql_server = require('mssql');


const dbSettings = {
    user: process.env.SQL_SERVER_USER,
    password: process.env.SQL_SERVER_PASSWORD,
    server :  process.env.SERVIDOR2.trim().length > 0 ? process.env.SERVIDOR1 + "\\" + process.env.SERVIDOR2 :  process.env.SERVIDOR1 ,
    database: process.env.SQL_SERVER_DATABASE,
    requestTimeout: 180000, // for timeout setting
    connectionTimeout: 180000, // for timeout setting  
    "options": {
  
      "encrypt": false, // need to stop ssl checking in case of local db
  
      "enableArithAbort": true,
  
      "trustServerCertificate" : true
  
      }
  };
//********************** */
export async function sql_query(query_string) {
    try {
        const conn = await sql_server.connect(dbSettings);   
        const result = await conn.query(query_string);
        return result
    } catch (e) {
      console.log(e.message)  ;
      throw Error(e.message)
    }
  }
//************************* */
