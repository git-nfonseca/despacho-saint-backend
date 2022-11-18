import  {sql_query } from "../db/sqlserver"

class Ruta {
    //Constructor de la clase
    constructor ( ) {
      this._id = -1
      this._descripcion =''
    }   

//===============================================/
 getRutaById = async (codigo) => {
  try {
      const sql = `SELECT TOP (1) CodZona As id, Descrip As descripcion
                    FROM SAZONA
                    Where
                    CodZona = '${codigo}'`
      const results = await sql_query(sql)
      return await results.recordset
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
  }
}
 
//===============================================/
deleteRutaById = async (id) => {
  try {
    const sql = `DELETE FROM SURUTAS Where id =${id}`;      
    const results = await sql_query(sql);       
    return results.rowsAffected
} catch (e) {
   console.log(e.message)
   return { message: e.message }
} 
}
//===============================================/
getAllRutas = async () => {
    try {
        const sql = `SELECT CodZona as id, Descrip As descripcion , '' AS fecha_registro 
                     FROM SAZONA 
                     Order by CodZona` 
        const results = await sql_query(sql)
        return results.recordset        
    } catch (e) {
        console.log(e.message)
        return { message: e.message }        
    }
}
//===============================================/
updateRuta = async (ruta) => {
  try {
      const sql = `UPDATE SURUTAS SET descripcion='${ruta.descripcion}'
                   WHERE
                     id =${ruta.id}` 
    const results = await sql_query(sql)       
    return results.rowsAffected               
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
 }       
}
 //===============================================/
 #getLastIdRuta = async () => {
  try {
     let ultimo = 0
     const sql = `Select IDENT_CURRENT('SURUTAS') as ultimo_Id`
     const results = await sql_query(sql)
     ultimo = results.recordset[0].ultimo_Id
     return await ultimo      
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
  
  }
}
//===============================================/

createRuta = async (ruta) => {
 try {
   const  sql = `INSERT INTO SURUTAS ( descripcion ) VALUES ('${ruta.descripcion}')`
   const results = await sql_query(sql)       
   const ult = await this. #getLastIdRuta()   
   return ult                      
 } catch (e) {
  console.log(e.message)
  return { message: e.message }
}          
}
//===============================================/
 } // fin de la clase 

 export {Ruta}