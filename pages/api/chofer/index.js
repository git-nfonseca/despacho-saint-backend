import {Chofer} from "../../../clases/chofer"


//********************** */
const allowCors = fn => async (req, res) => {
  //console.log('estoy setiando el headersssssssss_585745')
  
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
      case "OPTIONS"  :
         return  res.status(200).send("ok")
      default:
        return res.status(400).send("Method not allowed");
    }
  }
  //**************************************************** */
   async function listarHandler(req,res) {
       try {
        
           const TheChofer = new Chofer()
           const lista_choferes = await TheChofer.getAllChoferes()
           return res.status(200).json(lista_choferes)
       } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })                   
       }
   }
  //*********************************** */

  async function createHandler(req,res) {
      try {
        const { cedula, nombre, telefonos, direccion } = req.body
        const elChofer = {
            cedula,
            nombre,
            telefonos,
            direccion
        }
        const TheChofer = new Chofer()
        let chofer_exist =  JSON.parse(await TheChofer.getChoferBycedula(cedula))
        if (chofer_exist.length > 0 ) {
            console.log('Otro Chofer ya tiene asignada la cedula  : ' + cedula)
            return res.status(500).json({ error: "cedula invalida" })
        }        
        const v = await TheChofer.createNewChofer(elChofer)
        let el_mensage = 'Chofer Registrado Exitosamente'
        return res.status(200).json({ message: el_mensage , ultimo_id : v})          
          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })          
      }
  }


  module.exports = allowCors(handler)