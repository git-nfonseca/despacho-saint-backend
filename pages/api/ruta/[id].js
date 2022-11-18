import {Ruta} from "../../../clases/ruta"

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
        const id_ruta = req.query.id
        const TheRuta  = new Ruta()   
        const la_ruta = await TheRuta.getRutaById(id_ruta)
        return res.status(200).json(la_ruta)        
    } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })               
    }
}
//******************************************************** */
async function deleteHandler(req,res) {
    try {
        const id_ruta = req.query.id
        const TheRuta  = new Ruta()
        const v = await TheRuta.deleteRutaById(id_ruta)
        let el_mensage = 'Se eliminaron : [' + v + '] rutas correctamente'
        return res.status(200).json({ message: el_mensage});          
    } catch (e) {
      console.log(e)
      return res.status(501).json({ error: e.message })          
    }
}
//********************************************************** */
async function updateHandler(req,res) {
    try {
        const { descripcion, id } = req.body
        const laRuta = {
            id,
            descripcion            
        }
        const TheRuta = new Ruta()
        const v = parseInt('0' + await TheRuta.updateRuta(laRuta))
        let el_mensage = ''
        if (v > 0 ) { 
            el_mensage = 'Ruta Actualizada Exitosamente'
        }{
            el_mensage = 'Ruta NO Actualizado'
        }

        return res.status(200).json({ message: el_mensage})          
          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message });              
      }

}
//********************************************************** */

module.exports = allowCors(handler)