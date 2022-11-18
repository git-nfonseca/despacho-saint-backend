
const allowCors = fn => async (req, res) => {
    console.log('estoy setiando el headers del enpoit de errorrrrr')
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')
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


export default async function handler(req, res) {
        console.log('erorrrr desde end point del error api')
        return  res.status(401).json({ error: "Invalid TOKEN 11" })
    }
  

    module.exports = allowCors(handler)