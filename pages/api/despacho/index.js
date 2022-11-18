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
      case "GET"    :
        return await listarHandler(req,res)
      case "POST"   : 
        return await createHandler(req,res)
      default:
        return res.status(400).send("Method not allowed");
    }
  }
  //**************************************************** */
   async function listarHandler(req,res) {
       try {
           const TheDespacho = new Despacho()
           const lista_despacho = await TheDespacho.getAllDespachos_abiertos()
           return res.status(200).json(lista_despacho)
       } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })                   
       }
   }
  //*********************************** */

  async function createHandler(req,res) {
      try {
        const { FechaE, FechaR,id_ruta , id_chofer, cedula_chofer, nombre_chofer, telefono_chofer, 
                id_transporte, placa_transporte , descripcion_transporte , autorizado_por,
                responsable,  estatus , notas, document } = req.body
        const elDespacho = {
            FechaE, 
            FechaR,
            id_ruta ,
            id_chofer : 0,
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
            documentos : document            
        }

        const TheDespacho = new Despacho()
        const v = await TheDespacho.createDespacho(elDespacho)
        let el_mensage = 'Despacho Registrado Exitosamente'
        return res.status(200).json({ message: el_mensage})          
          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })          
      }
  }

  module.exports = allowCors(handler)