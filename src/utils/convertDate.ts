export function convertDate(date: string){
  return new Date(date).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
}