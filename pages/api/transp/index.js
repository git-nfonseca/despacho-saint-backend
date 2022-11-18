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
           const TheTransp = new Transporte()
           const lista_transp = await TheTransp.getAllTransportes()
           return res.status(200).json(lista_transp)
       } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })                   
       }
   }
  //*********************************** */

  async function createHandler(req,res) {
      try {
        const { codigo,descripcion,placa, propietario, telefonos, 
            capacidad } = req.body
        const id_chofer = 0    
        const tipo = 0
        const unidad_capacidad = ''
        const gps = 0
        const notas = ''

        const elTransporte = {
                codigo,
                descripcion,
                placa,
                id_chofer,
                tipo,
                propietario,
                telefonos_propietario : telefonos,
                capacidad_carga : capacidad,
                unidad_capacidad ,
                gps          ,
                notas
            }
        //console.log(JSON.stringify(elTransporte))
        const TheTransp = new Transporte()
        const v = await TheTransp.createTransporte(elTransporte)
        let el_mensage = 'Transporte Registrado Exitosamente'
        return res.status(200).json({ message: el_mensage , ultimo_id : v})  
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })          
      }
  }

  module.exports = allowCors(handler)  