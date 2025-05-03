export function convertDate(date: string){
  return new Date(date).toLocaleDateString('pt-BR')
}