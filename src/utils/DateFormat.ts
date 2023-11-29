export const formatDate = (data: string) => {
    const date = new Date(data)
    const diaF = date.getDate() + 1;
    const dia = diaF.toString().padStart(2, '0')
    const mes = (date.getMonth()+1).toString().padStart(2, '0');
    const ano = date.getFullYear();

    const data_completa = [dia, mes, ano].join('/')

    return data_completa;
}

export const formatDateTime = (data: string) => {
    const date = new Date(data)
    const horaF = date.getHours() + 3; //Horário de Brasília
    const hora = horaF.toString().padStart(2, '0');
    const minuto = date.getMinutes().toString().padStart(2, '0');

    const horas = [hora, minuto].join(':');

    return horas;
}

export const convertHour = (minutos: number) => {
    const horas = Math.floor(minutos/ 60);          
    const min = minutos % 60;
    const textoHoras = (`00${horas}`).slice(-2);
    const textoMinutos = (`00${min}`).slice(-2);
    
    return `${textoHoras }:${textoMinutos}`;
  };