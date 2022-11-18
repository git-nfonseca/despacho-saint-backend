import {Transporte} from "../../../clases/transporte"

//********************** */
const allowCors = fn => async (req, res) => {
   
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Origin,  Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  ) 
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
        const id_transporte = req.query.id
        const TheTransp  = new Transporte()   
        const transp = await TheTransp.getTransporteById(id_transporte)
        return res.status(200).json(transp)        
    } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })               
    }
}
//******************************************************** */
async function deleteHandler(req,res) {
    try {
        const id_transporte = req.query.id
        const TheTransp  = new Transporte()   
        const v = await TheTransp.deleteTransporteById(id_transporte)
        let el_mensage = 'Se elimino : [' + v + '] Transporte correctamente'
        return res.status(200).json({ message: el_mensage});          
    } catch (e) {
      console.log(e)
      return res.status(501).json({ error: e.message })          
    }
}
//********************************************************** */
async function updateHandler(req,res) {
    try {
        const { id, codigo,descripcion,placa, propietario, telefonos, 
                capacidad } = req.body

                const id_chofer = 0    
                const tipo = 0
                const unidad_capacidad = ''
                const gps = 0
                const notas = ''                
        const elTransporte = {
            id,
            codigo,
            descripcion,
            placa,
            id_chofer,
            tipo,
            propietario,
            telefonos_propietario : telefonos,
            capacidad_carga : capacidad,
            unidad_capacidad,
            gps          ,
            notas
        }
        const TheTransp  = new Transporte()   
        const v = parseInt('0' + await TheTransp.updateTransporte(elTransporte))
        let el_mensage = ''
        if (v > 0 ) { 
            el_mensage = 'Transporte Actualizado Exitosamente'
        }{
            el_mensage = 'Transporte NO Actualizado'
        }

        return res.status(200).json({ message: el_mensage})          
          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message });              
      }

}
//********************************************************** */


module.exports = allowCors(handler)  