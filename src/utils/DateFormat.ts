export const formatDate = (data: string) => {
    const date = new Date(data)
    const diaF = date.getDate();
    const dia = diaF.toString().padStart(2, '0')
    const mes = (date.getMonth()+1).toString().padStart(2, '0');
    const ano = date.getFullYear();

    const data_completa = [dia, mes, ano].join('/')

    return data_completa;
}

export const formatDateTime = (data: string) => {
    const date = new Date(data)
    const horaF = date.getHours();
    const hora = horaF.toString().padStart(2, '0');
    const minuto = date.getMinutes().toString().padStart(2, '0');

    const horas = [hora, minuto].join(':');

    return horas;
}

export const convertHour = (minutos: number) => {
    const horasF = Math.floor(minutos / 60);
    const dias = Math.floor(horasF / 24);
    const horas = horasF % 24;
    const min = minutos % 60;
    const textoHoras = (`00${horas}`).slice(-2);
    const textoMinutos = (`00${min}`).slice(-2);
    
    return `${dias > 0 ? dias+" dia(s)" : ""} ${textoHoras}:${textoMinutos}H`;
  };