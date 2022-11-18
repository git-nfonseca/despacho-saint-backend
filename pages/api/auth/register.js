import getConfig from 'next/config'
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"
import {Usuario} from "../../../clases/user"
import {hashSync} from  "bcryptjs"

const { serverRuntimeConfig } = getConfig()

export default async function handler(req, res) {
    switch (req.method) {
      case "POST"    :
        return await registerHandler(req,res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }
//******************************************** */  
async function registerHandler(req, res) {
    try {
        const { username, firstName, lastName, rol,  password } = req.body
        let hash = hashSync(password, 10)
        const user = {
            username,
            firstName,
            lastName,
            rol,
            hash
        }
        const TheUser  = new Usuario()
        let user_exist =  JSON.parse(await TheUser.getUserByUsername(username))
        if (user_exist.length > 0 ) {
            console.log('Otro usuario ya tiene asignado el username : ' + username)
            return res.status(500).json({ error: "username invalido" })
        }

        const v = await TheUser.createNewUser(user)
        let el_mensage = 'Usuario Registrado Exitosamente'
        return res.status(200).json({ message: el_mensage})  
    } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message })        
    }
}