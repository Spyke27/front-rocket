export const formatDate = (data: string) => {
    const date = new Date(data)
    const dia = date.getDate().toString();
    const mes = (date.getMonth()+1).toString().padStart(2, '0');
    const ano = date.getFullYear();

    return dia+"/"+mes+"/"+ano;
}

export const formatDateTime = (data: string) => {
    const date = new Date(data)
    const hora = date.getHours();
    const minuto = date.getMinutes();

    return hora+":"+minuto;
}