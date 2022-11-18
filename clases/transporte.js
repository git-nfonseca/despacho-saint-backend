import  {sql_query } from "../db/sqlserver"
import {validarnull,validar_decimal,validar_entero} from "../helpers/helpers"

class Transporte {
    //Constructor de la clase
    constructor ( ) {
      this._id = -1
    }   

//===============================================/
 getTransporteById = async (id) => {
  try {
      const sql = `SELECT  * 
                    FROM SUTRANSPORTE
                    Where
                    id = ${validar_entero(id)}`
      const results = await sql_query(sql)
      return await results.recordset
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
  }
}
 
//===============================================/
deleteTransporteById = async (id) => {
  try {
    const sql = `DELETE FROM SUTRANSPORTE Where id =${validar_entero(id)}`;      
    const results = await sql_query(sql);       
    return results.rowsAffected
} catch (e) {
   console.log(e.message)
   return { message: e.message }
} 
}
//===============================================/
getAllTransportes = async () => {
    try {
        const sql = `SELECT * FROM SUTRANSPORTE` 
        const results = await sql_query(sql)
        return results.recordset        
    } catch (e) {
        console.log(e.message)
        return { message: e.message }        
    }
}
//===============================================/
updateTransporte = async (transporte) => {
  try {
      const sql = `UPDATE SUTRANSPORTE SET descripcion='${validarnull(transporte.descripcion)}' , placa = '${validarnull(transporte.placa)}' , 
                   id_chofer = ${validar_entero(transporte.id_chofer)}, tipo = ${validar_entero(transporte.tipo)} , propietario = '${validarnull(transporte.propietario)}',
                   telefonos_propietario = '${validarnull(transporte.telefonos_propietario)}' , capacidad_carga = ${validar_decimal(transporte.capacidad_carga)} , 
                   unidad_capacidad = '${validarnull(transporte.unidad_capacidad)}' , gps = ${validar_entero(transporte.gps)} , 
                   notas = '${validarnull(transporte.notas)}' , codigo = '${validarnull(transporte.codigo)}'
                   WHERE
                     id =${validar_entero(transporte.id)}   ` 
    const results = await sql_query(sql)       
    return results.rowsAffected               
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
 }       
}
 //===============================================/
 #getLastIdTransporte = async () => {
  try {
     let ultimo = 0
     const sql = `Select IDENT_CURRENT('SUTRANSPORTE') as ultimo_Id`
     const results = await sql_query(sql)
     ultimo = results.recordset[0].ultimo_Id
     return await ultimo      
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
  
  }
}
//===============================================/
createTransporte = async (transporte) => {
 try {
   const  sql = `INSERT INTO SUTRANSPORTE (codigo, descripcion, placa, id_chofer,
                                      tipo, propietario, telefonos_propietario , capacidad_carga ,
                                      unidad_capacidad, gps, notas) VALUES 
                                      ('${validarnull(transporte.codigo)}', '${validarnull(transporte.descripcion)}', '${validarnull(transporte.placa)}', ${transporte.id_chofer},
                                      ${transporte.tipo}, '${validarnull(transporte.propietario)}', '${validarnull(transporte.telefonos_propietario)}',${validar_decimal(transporte.capacidad_carga)},
                                      '${validarnull(transporte.unidad_capacidad)}', ${transporte.gps}, '${validarnull(transporte.notas)}')`
                                  
   const results = await sql_query(sql)   
   const ult = await this.#getLastIdTransporte()
   return ult                               
 } catch (e) {
  console.log(e.message)
  return { message: e.message }
}          
}
//===============================================/
 } // fin de la clase 

 export {Transporte}