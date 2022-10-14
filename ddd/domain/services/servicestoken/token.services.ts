import { ToekenRepository } from "../../../infraestructure/repositories/repositorytoken/token.repository"

export const TokenService = {
  postToken: async (payloadtoken:any,urlToken:any) => {
    return await ToekenRepository.postToken(payloadtoken,urlToken) 
  }
}