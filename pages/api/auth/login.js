import getConfig from 'next/config'
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"
import {Usuario} from "../../../clases/user"
import {compareSync} from  "bcryptjs"


const { serverRuntimeConfig } = getConfig()


//************************* */
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Origin,  Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

//******************* */

export default async function handler(req, res) {
    switch (req.method) {
      case "POST"    :
        return await loginHandler(req,res);
      default:
        return res.status(400).send("Method not allowed")
    }
  }
//******************************************************* */
async function loginHandler(req, res) {
    try {
        
        const { username, password } = req.body

        let TheUser  = new Usuario()
        const user =  JSON.parse(await TheUser.getUserByUsername(username))
      
        if (user.length <= 0 ) {
            console.log('No existe el login')
            return res.status(401).json({ error: "Invalid credentials" });
        }

       if (!(user && compareSync(password, user[0].hash))) {
            console.log('clave invalida')
            return res.status(401).json({ error: "Invalid credentials" });
       } 
          
          const firstName = TheUser.firstName
          const lastName = TheUser.lastName
          const rol = TheUser.userrol
          const id = TheUser.userid

        // expire in 7 days
        const token = sign(
            {
              expiresIn: '7d', 
             // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
              id,
              firstName,
              lastName,
              username,
              rol

            },
            serverRuntimeConfig.secret
          )
      
         const serialized = serialize('Tokendespacho', token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            secure: true,
            sameSite: "none",
            //maxAge: 1000 * 60 * 60 * 24 * 30,
            maxAge:  60 * 60 * 24 * 7, // 1 week
            path: "/",
          });
      
          res.setHeader("Set-Cookie", serialized)

        //  const uservery = verify(token, serverRuntimeConfig.secret)

         // console.log(uservery)

          return res.status(200).json({ message: "Login successful" , token: token })
        
    } catch (e) {
        console.log(e)
        return res.status(501).json({ error: e.message });
    }
  }
  
  module.exports = allowCors(loginHandler)