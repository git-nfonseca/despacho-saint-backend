import getConfig from 'next/config'
import {Usuario} from "../../../clases/user"
import {hashSync} from  "bcryptjs"

const { serverRuntimeConfig } = getConfig()

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
  //************************************************************** */
   async function getHandler(req,res) {
     try {
         const id_user = req.query.id
         const TheUser  = new Usuario()   
         const el_usuario = await TheUser.getUserById(id_user)
         return res.status(200).json(el_usuario)
     } catch (e) {
      console.log(e)
      return res.status(501).json({ error: e.message })          
     }
   }
  //************************************************************** */

  async function deleteHandler(req,res) {
      try {
          const id_user = req.query.id
          const TheUser  = new Usuario()
          const v = await TheUser.deleteUserById(id_user)
          let el_mensage = 'Se eliminaron : [' + v + '] usuarios correctamente'
          return res.status(200).json({ message: el_mensage});          
      } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })          
      }
  }

  //***************************************************************** */

  async function updateHandler(req,res) {
    try {
      const { firstName, lastName, rol,  password } = req.body    
      const id_user = req.query.id
      let nuevohash = ''
      if (password)  nuevohash = hashSync(password, 10) 
      const user = {
        id : id_user,
        firstName,
        lastName,        
        rol,
        nuevohash
      }
      let TheUser  = new Usuario()
      const v = await TheUser.updateUser(user) 
      let el_mensage = 'Se actualizaron : [' + v + '] usuarios correctamente'
      return res.status(200).json({ message: el_mensage})
    } catch (e) {
      console.log(e)
      return res.status(501).json({ error: e.message });          
    }
}
  //***************************************************************** */
