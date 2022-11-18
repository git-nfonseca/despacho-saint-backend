import  {sql_query } from "../db/sqlserver"

class Usuario {
    //Constructor de la clase
    constructor ( ) {
      this._username = ''
      this._firstName =''
      this._lastName = ''
      this._id = -1
      this._rol = -1
    }   
//===============================================/
get firstName () {
   return this._firstName
}

get lastName () {
   return this._lastName
}

get username () {
  return this._username
}

get userid () {
  return this._id
}

get userrol () {
  return this._rol
}
//===============================================/
 getUserByUsername = async (username) => {
    try {
        const sql = `SELECT  TOP 1 id, firstName,lastName, username, hash, dateCreated, dateUpdated, rol
                     FROM SUUSERS
                     Where
                     username = '${username}'`
        const results = await sql_query(sql)
        this.#setDatos(results.recordset)
        return await JSON.stringify (results.recordset)
    } catch (e) {
      console.log(e.message)
      return { message: e.message }
    }
 }
 //===============================================/
 getUserById = async(id) => {
  try {
    const sql = `SELECT  TOP 1 id, firstName,lastName, username,  dateCreated, dateUpdated, rol
                 FROM SUUSERS
                 Where
                 id = ${id}`
    const results = await sql_query(sql)
    return await results.recordset
  } catch (e) {
  console.log(e.message)
  return { message: e.message }
  }
 }
 //===============================================/
getAllUsers = async () => {
  try {
    const sql = `SELECT   id, firstName,lastName, username,  dateCreated, dateUpdated, rol
                 FROM SUUSERS`
    const results = await sql_query(sql)
    return await results.recordset
  } catch (e) {
  console.log(e.message)
  return { message: e.message }
  }  
}
 //===============================================/

 #setDatos = (data) => {
         if (data.length> 0) {
          this._firstName = data[0].firstName
          this._lastName = data[0].lastName
          this._username = data[0].username
          this._id = data[0].id
          this._rol = data[0].rol
         }        
 }
//===============================================/
deleteUserById = async (id) => {
  try {
    const sql = `DELETE FROM SUUSERS Where id=${id}`;      
    const results = await sql_query(sql);       
    return results.rowsAffected
} catch (e) {
   console.log(e.message)
   return { message: e.message }
} 
}
//===============================================/
updateUser = async (user) => {
  try {
    let sql = ''
    if (user.nuevohash.trim().length > 0 ) {
      sql = `UPDATE SUUSERS SET firstName='${user.firstName}', lastName= '${user.lastName}', 
      rol = ${user.rol}, hash = '${user.nuevohash}' 
      WHERE
      id =${user.id}` 

    }else {
      sql = `UPDATE SUUSERS SET firstName='${user.firstName}', lastName= '${user.lastName}', 
            rol = ${user.rol}
            WHERE
            id =${user.id}`       
    }
    const results = await sql_query(sql);       
    return results.rowsAffected               
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
 }       
}
//===============================================/
createNewUser = async (user) => {
 try {
   const  sql = `INSERT INTO SUUSERS (firstName,lastName,username,hash,rol) 
                 VALUES ('${user.firstName}','${user.lastName}','${user.username}','${user.hash}', ${user.rol})`
   const results = await sql_query(sql)          
   return results.rowsAffected                      
 } catch (e) {
  console.log(e.message)
  return { message: e.message }
}          
}
//===============================================/
 } // fin de la clase 

 export {Usuario}