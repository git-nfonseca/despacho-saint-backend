import {Despacho} from "../../../clases/despacho"

//********************** */
const allowCors = fn => async (req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");

  /*res.setHeader(
     'X-CSRF-Token, X-Requested-With, Accept, Origin,  Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  ) */ 

  if (req.method === 'OPTIONS') {
    res.status(200).send("ok")
    return
  }
  return await fn(req, res)
}

///************************* */


export default async function handler(req, res) {
    switch (req.method) {
      case "GET" :
        return await getHandler(req,res) 
      case "DELETE"    :
        return await deleteHandler(req,res)
      case "PUT"   : 
        return await updateHandler(req,res)
      default:
        return res.status(400).send("Method not allowed");
    }
  }
//******************************************************** */
async function getHandler(req,res) {
    try {
        const id_despacho = req.query.id
        const TheDespacho  = new Despacho()   
        const el_despacho = await TheDespacho.getDespachoById(id_despacho)
        return res.status(200).json(el_despacho)        
    } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })               
    }
}
//******************************************************** */
async function deleteHandler(req,res) {
    try {
        const id_despacho = req.query.id
        const TheDespacho  = new Despacho() 
        const v = await TheDespacho.deleteDespachoById(id_despacho)
        let el_mensage = 'Se eliminaron : [' + v + '] despachos correctamente'
        return res.status(200).json({ message: el_mensage});          
    } catch (e) {
      console.log(e)
      return res.status(501).json({ error: e.message })          
    }
}
//********************************************************** */
async function updateHandler(req,res) {
    try {

      const { id_despacho, FechaE, id_ruta , id_chofer, cedula_chofer, nombre_chofer, telefono_chofer, 
        id_transporte, placa_transporte , descripcion_transporte , autorizado_por,
        responsable,  estatus , notas, document, eliminados } = req.body
        const elDespacho = {
            id_despacho,
            FechaE, 
            id_ruta ,
            id_chofer,
            cedula_chofer,
            nombre_chofer,
            telefono_chofer, 
            id_transporte,
            placa_transporte ,
            descripcion_transporte ,
            autorizado_por,
            responsable,
            estatus ,
            notas,
            documentos : document,
            doc_eliminados : eliminados          
        }
       const TheDespacho = new Despacho()       
       const v = TheDespacho.updateDespacho(elDespacho)
       
        let el_mensage = ''
        if (v > 0 ) { 
            el_mensage = 'Despacho Actualizada Exitosamente'
        }{
            el_mensage = 'Despacho NO Actualizado'
        }

        return res.status(200).json({ message: el_mensage})          
          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message });              
      }

}
//********************************************************** */

module.exports = allowCors(handler)