import { jwtDecode } from 'jwt-decode'

interface JWTPayload {
  exp: number;
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);

    const now = Date.now() / 1000;

    return decoded.exp > now;


  } catch (error) {
    console.log('Erro ao decodificar o token')
    return false;
  }
}