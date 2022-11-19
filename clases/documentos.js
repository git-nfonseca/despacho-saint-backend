import  {sql_query } from "../db/sqlserver"

class Documentos {
    constructor () {
        this.tipo_doc = ['A','C']
    }

    getAllDocumentos = async () => {
        try {
            /*const sql = `select SAFACT.TipoFac, SAFACT.NumeroD, SAFACT.Descrip, SAFACT.MtoTotal,
                         (SELECT   SUM(SAPROD.Peso)  As totalpeso
                            FROM SAITEMFAC, SAPROD
                            WHERE
                            SAITEMFAC.CodItem = SAPROD.CodProd AND 
                            SAITEMFAC.TipoFac IN ('A','C') AND 
                            SAITEMFAC.TipoFac = SAFACT.TipoFac and 
                            SAITEMFAC.NumeroD = SAFACT.NumeroD
                            group by SAITEMFAC.NumeroD)  As Peso
                            from SAFACT
                            WHERE
                                SAFACT.TipoFac in ('A','C') AND SAFACT.FechaE>='2022-10-01'  ` */
            const sql = `select SAFACT.TipoFac, SAFACT.NumeroD, SAFACT.CodClie, SAFACT.Descrip, SAFACT.MtoTotal
                         from SAFACT
                         WHERE
                         SAFACT.TipoFac in ('A','C') AND SAFACT.FechaE>='2022-05-01'`                    
            const results = await sql_query(sql)           
            return await results.recordset   
        } catch (e) {
            console.log(e.message)
            return { message: e.message }            
        }
    }

    


}

export {Documentos}