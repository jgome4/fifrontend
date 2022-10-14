
  import { Token } from "../../domain/models/token/token"

  const get = async <T>(url: string,token:Token) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: await headersToken(token),
    })

    if(!response.ok)
      error(response)
    return await response.json() as T
  }
  
  const post = async <T>(url: string, body: any,token:Token) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: await headersToken(token),
      body
    })
    if(!response.ok)
    error(response)
    return await response.json() as T
  }
  
  const put = async <T>(url: string, body: any,token:Token) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers:await headersToken(token),
      body
    })
    return await response.json() as T
  }
  
  const _delete = async <T>(url: string,token:Token) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await headersToken(token)
    })
    return await response.json() as T
  }
  function error(response:any){
     const {url,status,statusText}=response;
      throw new Error(`Error ${url} ${status} ${statusText}`);
  }
 async function headersToken(token:Token){
    
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization":(token.jwtToken!='')?"Bearer "+token.jwtToken:''
    }
    return headers;
 }
  export const http = {
    get,
    post,
    put,
    delete: _delete
  }