import { http } from '../../http/http'
import { Token } from '../../../domain/models/token/token'
import { TokenDTO } from '../../http/modelsdto/token/token'

export const ToekenRepository = {
  postToken: async (payloadtoken:any,urlToken:any) => {
    const tpkesn:Token={userName:'',jwtToken:''}
    const token = await http.post<Token>(`${process.env.API_TOKEN_TASK}`,JSON.stringify(payloadtoken),tpkesn)
    // we can extract this transform to a function inside this file to be reused by different methods
    return token;
  }
}