import  {sql_query } from "../db/sqlserver"

class Chofer {
    //Constructor de la clase
    constructor ( ) {
      this._cedula = ''
      this._nombre =''
      this._telefonos = ''
      this._direccion = ''
      this._id = -1      
    }   
//===============================================/
get cedula () {
   return this._cedula
}

get nombre () {
   return this._nombre
}

get telefonos () {
  return this._telefonos
}

get chofer_id () {
  return this._id
}

get direccion () {
  return this._direccion
}
//===============================================/
 getChoferBycedula = async (cedula) => {
    try {
        const sql = `SELECT TOP (1) CodMeca as id_chofer, ID3 as cedula , Descrip As nombre ,Telef As telefonos, Direc1 AS direccion
                      FROM SAMECA
                      Where
                      ID3 = '${cedula}'`
        const results = await sql_query(sql)
        this.#setDatos(results.recordset)
        return await JSON.stringify (results.recordset)
    } catch (e) {
      console.log(e.message)
      return { message: e.message }
    }
 }
 //===============================================/
 #getLastIdChofer = async () => {
   try {
      let ultimo = 0
      const sql = `Select IDENT_CURRENT('SUCHOFERES') as ultimo_Id`
      const results = await sql_query(sql)
      ultimo = results.recordset[0].ultimo_Id
      return await results.recordset      
   } catch (e) {
     console.log(e.message)
     return { message: e.message }
   
   }
 }
 //===============================================/
 getChoferById = async (codigo) => {
  try {
      const sql = `SELECT TOP (1) CodMeca as id_chofer, ID3 as cedula , Descrip As nombre ,Telef As telefonos, Direc1 AS direccion
                    FROM SAMECA
                    Where
                    CodMeca = '${codigo}'`
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
          this._cedula = data[0].cedula
          this._nombre = data[0].nombre
          this._telefonos = data[0].telefonos
          this._id = data[0].id_chofer
          this._direccion = data[0].direccion
         }        
 }
//===============================================/
deleteChoferById = async (id) => {
  try {
    const sql = `DELETE FROM SUCHOFERES Where id_chofer =${id}`;      
    const results = await sql_query(sql);       
    return results.rowsAffected
} catch (e) {
   console.log(e.message)
   return { message: e.message }
} 
}
//===============================================/
getAllChoferes = async () => {
    try {
        const sql = `SELECT CodMeca as id_chofer, ID3 as cedula , Descrip As nombre ,Telef As telefonos, Direc1 AS direccion
                       FROM SAMECA` 
        const results = await sql_query(sql)
        return results.recordset        
    } catch (e) {
        console.log(e.message)
        return { message: e.message }        
    }
}
//===============================================/
updateChofer = async (chofer,id) => {
  try {
      const sql = `UPDATE SUCHOFERES SET nombre='${chofer.nombre}', cedula= '${chofer.cedula}', 
                   telefonos = '${chofer.telefonos}', direccion = '${chofer.direccion}'
                   WHERE
                     id_chofer =${id}` 

   // console.log('la consulta es : ' + sql)                 
    const results = await sql_query(sql)       
    return results.rowsAffected               
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
 }       
}
//===============================================/
createNewChofer = async (chofer) => {
 try {
   let ultimoId = 0
   const  sql = `INSERT INTO SUCHOFERES ( cedula ,nombre ,telefonos, direccion) 
                 VALUES ('${chofer.cedula}','${chofer.nombre}','${chofer.telefonos}','${chofer.direccion}')`
   const results = await sql_query(sql)  
   ultimoId = await this.#getLastIdChofer()      
   return ultimoId                      
 } catch (e) {
  console.log(e.message)
  return { message: e.message }
}          
}
//===============================================/
 } // fin de la clase 

 export {Chofer}