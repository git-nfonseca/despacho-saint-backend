import {Chofer} from "../../../clases/chofer"




//********************** */
const allowCors = fn => async (req, res) => {
  // console.log('setiando encabezados....')
  
   res.setHeader('Access-Control-Allow-Origin', '*')
  //res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
  console.log('estoy entrando al put')

    switch (req.method) {
      case "GET" :
        return await getHandler(req,res) 
      case "DELETE"    :
        return await deleteHandler(req,res)
      case "PUT"   : 
      
        return await updateHandler(req,res)
      case "OPTIONS"  :
        return  res.status(200).send("ok")        
      default:
        return res.status(400).send("Method not allowed");
    }
  }
//******************************************************** */
async function getHandler(req,res) {
    try {
        const id_chofer = req.query.id
        const TheChofer  = new Chofer()   
        const el_chofer = await TheChofer.getChoferById(id_chofer)
        return res.status(200).json(el_chofer)        
    } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })               
    }
}
//******************************************************** */
async function deleteHandler(req,res) {
    try {
        const id_chofer = req.query.id
        const TheChofer  = new Chofer()
        const v = await TheChofer.deleteChoferById(id_chofer)
        let el_mensage = 'Se eliminaron : [' + v + '] Choferes correctamente'
        return res.status(200).json({ message: el_mensage});          
    } catch (e) {
      console.log(e)
      return res.status(501).json({ error: e.message })          
    }
}
//********************************************************** */
async function updateHandler(req,res) {
    try {
        const { id_chofer, cedula, nombre, telefonos, direccion } = req.body
        const elChofer = {
            cedula,
            nombre,
            telefonos,
            direccion
        }
        const id_chofer1 = req.query.id
        const TheChofer = new Chofer()
        const v = parseInt('0' + await TheChofer.updateChofer(elChofer,id_chofer1))
        let el_mensage = ''
        if (v > 0 ) { 
            el_mensage = 'Chofer Actualizado Exitosamente'
        }{
            el_mensage = 'Chofer NO Actualizado'
        }
        console.log (el_mensage )
        return res.status(200).json({ message: el_mensage})          
          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message });              
      }

}
//********************************************************** */

module.exports = allowCors(handler)