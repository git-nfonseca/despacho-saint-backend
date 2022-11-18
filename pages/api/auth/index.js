import {Usuario} from "../../../clases/user"

export default async function handler(req, res) {
    switch (req.method) {
      case "GET"    :
        return await listarHandler(req,res)
      default:
        return res.status(400).send("Method not allowed");
    }
  }
  //**************************************************** */
  async function listarHandler(req,res) {
    try {
        const TheUser = new Usuario()
        const lista_usuarios = await TheUser.getAllUsers()
        return res.status(200).json(lista_usuarios)
    } catch (e) {
     console.log(e)
     return res.status(501).json({ error: e.message });                    
    }
}
//*********************************** */  