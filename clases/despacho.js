import  {sql_query } from "../db/sqlserver"
import {validarnull,validar_decimal,validar_entero} from "../helpers/helpers"

class Despacho {
    //Constructor de la clase
    constructor ( ) {
      this._id = -1
    }   

//===============================================/
#documentosByDespacho = async(id) =>{
 try {
    const sql = `SELECT * FROM SUDESPACHOS_01 
                  WHERE
                  id_despacho=${id}`
    const results = await sql_query(sql)                  
    return results.recordset
 } catch (e) {
   console.log(e.message)
   return { message: e.message }   
 }
}
//===============================================/
 getDespachoById = async (id) => {
  try {
      let Adespachos = new Array()
      const sql = `SELECT  id_despacho, FORMAT (FechaE, 'yyyy-MM-dd ') as FechaE,
                           FORMAT (FechaR, 'yyyy-MM-dd ') as FechaR, id_ruta , id_chofer,
                           cedula_chofer, nombre_chofer, telefono_chofer, 
                           id_transporte, placa_transporte , descripcion_transporte ,
                           autorizado_por, responsable,  estatus , notas 
                    FROM SUDESPACHOS
                    Where
                    id = ${validar_entero(id)}`
      const results = await sql_query(sql)
      if ( results.recordset.length > 0 ) {
          for (let i = 0; i< results.recordset.length; i++) {
              let despacho = {
                "id_despacho" : results.recordset[i].id,
                "FechaE" : results.recordset[i].FechaE,
                "FechaR": results.recordset[i].FechaR,
                "id_ruta" : results.recordset[i].id_ruta,
                "id_chofer": results.recordset[i].id_chofer,
                "cedula_chofer": results.recordset[i].cedula_chofer,
                "nombre_chofer": results.recordset[i].nombre_chofer,
                "telefono_chofer": results.recordset[i].telefono_chofer,
                "id_transporte": results.recordset[i].id_transporte,
                "placa_transporte" : results.recordset[i].placa_transporte,
                "descripcion_transporte" : results.recordset[i].descripcion_transporte,
                "autorizado_por": results.recordset[i].autorizado_por,
                "responsable": results.recordset[i].responsable,
                "estatus" : results.recordset[i].estatus,
                "notas": results.recordset[i].notas,
                "documentos" : this.#documentosByDespacho(results.recordset[i].id)
              }
              Adespachos.push(despacho)           
          }
      }
      return await Adespachos
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
  }
}
 
//===============================================/
deleteDespachoById = async (id) => {
  try {
    const sql = `
                   DELETE FROM SUDESPACHOS_01 WHERE id_despacho = ${validar_entero(id)} ; 
                   DELETE FROM SUDESPACHOS Where id =${validar_entero(id)}
                `    

      const results = await sql_query(sql)
    return results.rowsAffected
} catch (e) {
   console.log(e.message)
   return { message: e.message }
} 
}
//===============================================/
getAllDespachos_abiertos = async () => {

  try {
    let Adespachos = new Array()
    const sql = `SELECT  SUDESPACHOS.id, FORMAT (SUDESPACHOS.FechaE, 'dd-MM-yyyy ') as FechaE,
                      FORMAT (SUDESPACHOS.FechaR, 'dd-MM-yyyy ') as FechaR, SUDESPACHOS.id_ruta ,
                      SUDESPACHOS.id_chofer,SUDESPACHOS.cedula_chofer, SUDESPACHOS.nombre_chofer, 
                      SUDESPACHOS.telefono_chofer,SUDESPACHOS.id_transporte, SUDESPACHOS.placa_transporte , 
                      SUDESPACHOS.descripcion_transporte , SAZONA.Descrip As la_ruta,
                      SUDESPACHOS.autorizado_por, SUDESPACHOS.responsable,  SUDESPACHOS.estatus , 
                      SUDESPACHOS.notas, 
                      (Select count(id_despacho) From SUDESPACHOS_01 
                        Where SUDESPACHOS_01.id_despacho = SUDESPACHOS.id ) as cant_documentos
                  FROM SUDESPACHOS,SAZONA
                  Where
                  SUDESPACHOS.id_ruta = SAZONA.CodZona AND
                  SUDESPACHOS.estatus = 0 `
    const results = await sql_query(sql)
    if ( results.recordset.length > 0 ) {
        for (let i = 0; i< results.recordset.length; i++) {
            let despacho = {
              "id_despacho" : results.recordset[i].id,
              "FechaE" : results.recordset[i].FechaE,
              "FechaR": results.recordset[i].FechaR,
              "id_ruta" : results.recordset[i].id_ruta,
              "id_chofer": results.recordset[i].id_chofer,
              "cedula_chofer": results.recordset[i].cedula_chofer,
              "nombre_chofer": results.recordset[i].nombre_chofer,
              "telefono_chofer": results.recordset[i].telefono_chofer,
              "id_transporte": results.recordset[i].id_transporte,
              "placa_transporte" : results.recordset[i].placa_transporte,
              "descripcion_transporte" : results.recordset[i].descripcion_transporte,
              "autorizado_por": results.recordset[i].autorizado_por,
              "responsable": results.recordset[i].responsable,
              "estatus" : results.recordset[i].estatus,
              "notas": results.recordset[i].notas,
              "ruta" : results.recordset[i].la_ruta,
              "cant_documentos" : results.recordset[i].cant_documentos,
              "documentos" : this.#documentosByDespacho(results.recordset[i].id)
            }
            //console.log(JSON.stringify(despacho))
            Adespachos.push(despacho)           
        }
    }
    return await Adespachos
} catch (e) {
  console.log(e.message)
  return { message: e.message }
}


}
//===============================================/
getAllDespachos = async () => {

  try {
    let Adespachos = new Array()
    const sql = `SELECT  id_despacho, FORMAT (FechaE, 'yyyy-MM-dd ') as FechaE,
                         FORMAT (FechaR, 'yyyy-MM-dd ') as FechaR, id_ruta , id_chofer,
                         cedula_chofer, nombre_chofer, telefono_chofer, 
                         id_transporte, placa_transporte , descripcion_transporte ,
                         autorizado_por, responsable,  estatus , notas 
                  FROM SUDESPACHOS
                  `
    const results = await sql_query(sql)
    if ( results.recordset.length > 0 ) {
        for (let i = 0; i< results.recordset.length; i++) {
            let despacho = {
              "id_despacho" : results.recordset[i].id,
              "FechaE" : results.recordset[i].FechaE,
              "FechaR": results.recordset[i].FechaR,
              "id_ruta" : results.recordset[i].id_ruta,
              "id_chofer": results.recordset[i].id_chofer,
              "cedula_chofer": results.recordset[i].cedula_chofer,
              "nombre_chofer": results.recordset[i].nombre_chofer,
              "telefono_chofer": results.recordset[i].telefono_chofer,
              "id_transporte": results.recordset[i].id_transporte,
              "placa_transporte" : results.recordset[i].placa_transporte,
              "descripcion_transporte" : results.recordset[i].descripcion_transporte,
              "autorizado_por": results.recordset[i].autorizado_por,
              "responsable": results.recordset[i].responsable,
              "estatus" : results.recordset[i].estatus,
              "notas": results.recordset[i].notas,
              "documentos" : this.#documentosByDespacho(results.recordset[i].id)
            }
            Adespachos.push(despacho)           
        }
    }
    return await Adespachos
} catch (e) {
  console.log(e.message)
  return { message: e.message }
}
}

//=================================================
#eliminarDocumentosByDEspacho = async (doc_eliminados) => {
  try {
    let elim = 0
    for (let i = 0; i< doc_eliminados.length; i++) {
         const sql = `DELETE FROM SUDESPACHOS_01
                      WHERE 
                       id_despacho = ${validar_entero(doc_eliminados[i].id_despacho)} AND 
                       tipoFac = '${validarnull(doc_eliminados[i].tipoFac)}' AND 
                       numeroD = '${validarnull(doc_eliminados[i].numeroD)}'    `
         const results = await sql_query(sql)  
         elim++            
    }
    return elim
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
  }    
  }
//=================================================
#insertDocumentosByIdinUpdate = async (documentos,pos) => {
  try {
        const sql = `
             INSERT INTO SUDESPACHOS_01 (id_despacho,tipoFac,numeroD,
             cod_clie,descrip_clie,monto_documento, cantidad_empaques)
             VALUES ( ${validar_entero(documentos[pos].id_despacho)}, '${validarnull(documentos[pos].tipoFac)}', '${validarnull(documentos[pos].numeroD)}',
            '${validarnull(documentos[pos].cod_clie)}', '${validarnull(documentos[pos].descrip_clie)}', ${validar_decimal(documentos[pos].monto_documento)},
            ${validar_decimal(documentos[pos].cantidad_empaques)})`        
        const results = await sql_query(sql)    
        return results.rowsAffected           
  } catch (e) {
     console.log(e.message)
     return { message: e.message }
    
  }
}
//=================================================
#updateDocumentosByDespacho = async (documentos) => {
   try {
     
    let update = 0
    for (let i = 0; i< documentos.length; i++) {
         const sql = `UPDATE SUDESPACHOS_01 SET cantidad_empaques = ${validar_decimal(documentos[i].cantidad_empaques)} 
                      WHERE
                      id_despacho = ${validar_entero(documentos[i].id_despacho)} AND 
                      tipoFac = '${validarnull(documentos[i].tipoFac)}' AND 
                      numeroD = '${validarnull(documentos[i].numeroD)}'    `               
         const results = await sql_query(sql)  
         if (results.rowsAffected <= 0) {
             const x = await this.insertDocumentosByIdinUpdate(documentos,i) 
         }
         update++            
    }

   } catch (e) {
     console.log(e.message)
     return { message: e.message }     
   }
}
//=================================================
updateDespacho = async (despacho) => {
  try {
      const sql = `UPDATE SUDESPACHOS SET id_ruta = '${validarnull(despacho.id_ruta)}' , 
                   id_chofer = ${validar_entero(despacho.id_chofer)}, cedula_chofer ='${validarnull(despacho.cedula_chofer)}',
                   nombre_chofer = '${validarnull(despacho.nombre_chofer)}', telefono_chofer ='${validarnull(despacho.telefono_chofer)}',
                   id_transporte = ${validar_entero(despacho.id_transporte)}, placa_transporte ='${validarnull(despacho.placa_transporte)}',
                   descripcion_transporte ='${despacho.descripcion_transporte}', autorizado_por = '${validarnull(despacho.autorizado_por)}',
                   responsable = '${validarnull(despacho.responsable)}', estatus = ${validar_entero(despacho.estatus)},
                   notas = '${validarnull(despacho.notas)}'
      
      ` 
    const results = await sql_query(sql)       
    const x= await this.#eliminarDocumentosByDEspacho(despacho.doc_eliminados)
    const y = await this.#updateDocumentosByDespacho(despacho.documentos)
    return results.rowsAffected               
  } catch (e) {
    console.log(e.message)
    return { message: e.message }
 }       
}
//===============================================/
#insertDocumentosInDespacho = async (documentos) => {
  try {
    let insertados = 0 
    for (let i = 0; i< documentos.length; i++) {
         const sql = `INSERT INTO SUDESPACHOS_01 (id_despacho,tipoFac,numeroD,
                                                  codclie,descripclie,monto_documento,
                                                  cantidad_empaques)
                      VALUES ( IDENT_CURRENT('SUDESPACHOS'), '${validarnull(documentos[i].tipoFac)}', '${validarnull(documentos[i].numeroD)}',
                              '${validarnull(documentos[i].cod_clie)}', '${validarnull(documentos[i].descripclie)}', ${validar_decimal(documentos[i].monto_documento)},
                              ${validar_decimal(documentos[i].cantidad_empaques)})`  
                              
         const results = await sql_query(sql)                      
         insertados++
    }
                   
    return await insertados
  } catch (e) {
    console.log(e.message)
    return { message: e.message }    
  }
}
//===============================================/
createDespacho = async (despacho) => {
 try { 
   const  sql = `INSERT INTO SUDESPACHOS (FechaE, FechaR, id_ruta , id_chofer,
                                          cedula_chofer, nombre_chofer, telefono_chofer, 
                                          id_transporte, placa_transporte , descripcion_transporte ,
                                          autorizado_por, responsable,  estatus , notas)
                VALUES ('${validarnull(despacho.FechaE)}', '${validarnull(despacho.FechaR)}' ,'${validarnull(despacho.id_ruta)}', ${despacho.id_chofer},
                        '${validarnull(despacho.cedula_chofer)}', '${validarnull(despacho.nombre_chofer)}', '${validarnull(despacho.telefono_chofer)}',
                         ${validar_entero(despacho.id_transporte)}, '${validarnull(despacho.placa_transporte)}', '${validarnull(despacho.descripcion_transporte)}',
                         '${validarnull(despacho.autorizado_por)}','${validarnull(despacho.responsable)}', ${validar_entero(despacho.estatus)}, '${validarnull(despacho.notas)}')`

    const results = await sql_query(sql)       
   const v = await this.#insertDocumentosInDespacho(despacho.documentos)   
   return 1                      
 } catch (e) {
  console.log(e.message)
  return { message: e.message }
}          
}


cerrarDespachos = async (despachos) => { 
  try {
      const sql = ` UPDATE SUDESPACHOS SET estatus = 1 
                    WHERE
                     id in ${despachos}`  
      const results = await sql_query(sql) 
      const docClose = await this.#cerrarDocumentosEnDespachos(despachos)
      return results.rowsAffected                      
  } catch (e) {
    console.log(e.message)
    return { message: e.message }    
  }
}

#cerrarDocumentosEnDespachos = async (despachos) => {
   try {
        const sql = ` UPDATE SAFACT set Notas10 = '01' 
                      FROM SUDESPACHOS_01
                      where
                      SAFACT.TipoFac = SUDESPACHOS_01.tipoFac and 
                      SAFACT.NumeroD = SUDESPACHOS_01.numeroD and 
                      SUDESPACHOS_01.id_despacho in ${despachos}`  
        const results = await sql_query(sql)       
        return results.rowsAffected
   } catch (e) {
      console.log(e.message)
      return { message: e.message }    
     
   }
}

getItemsByDespacho = async (id) => {
  try {
    const sql = `Select  SAITEMFAC.CodItem,SAITEMFAC.Descrip1, SUM(SAITEMFAC.Cantidad) AS Cantidad,
                SACONF.Descrip As NombEmpresa , saconf.Direc1 , SACONF.Telef,
                SUDESPACHOS.id As numdespacho, FORMAT (SUDESPACHOS.FechaE, 'dd-MM-yyyy ') as FechaE , 
                (Select count(id_despacho) From SUDESPACHOS_01 
                                        Where SUDESPACHOS_01.id_despacho = SUDESPACHOS.id ) as cant_documentos
                From SUDESPACHOS_01,SAITEMFAC, SACONF, SUDESPACHOS
                WHERE
                            SUDESPACHOS.id = SUDESPACHOS_01.id_despacho AND
                            SUDESPACHOS_01.numeroD = SAITEMFAC.NumeroD AND 
                            SUDESPACHOS_01.tipoFac = SAITEMFAC.TipoFac AND 
                            SUDESPACHOS_01.id_despacho = ${id}
                            group by SAITEMFAC.CodItem,SAITEMFAC.Descrip1,
                            SACONF.Descrip , saconf.Direc1 , SACONF.Telef,
                            SUDESPACHOS.id, SUDESPACHOS.FechaE
                            ORDER BY SAITEMFAC.CodItem`
    const results = await sql_query(sql)                  
    return results.recordset    
  } catch (e) {
    console.log(e.message)
    return { message: e.message }    
  }
}
//===============================================/
 } // fin de la clase 

 export {Despacho}