import {Ruta} from "../../../clases/ruta"
import Cookies from 'cookies'
import {verify} from 'jsonwebtoken'


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
           const TheRuta = new Ruta()
           const lista_rutas = await TheRuta.getAllRutas()
           return res.status(200).json(lista_rutas)
       } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })                   
       }
   }
  //*********************************** */

  async function createHandler(req,res) {
      try {
        const {  descripcion } = req.body
        const laRuta = {
            descripcion
        }
        const TheRuta = new Ruta()
        const v = await TheRuta.createRuta(laRuta)
        let el_mensage = 'Ruta Registrada Exitosamente' 
        return res.status(200).json({ message: el_mensage , ultimo_id : v})                 
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })          
      }
  }


  module.exports = allowCors(handler)