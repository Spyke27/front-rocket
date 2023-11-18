export const getToken = () => {
    const token = localStorage.getItem('token');

    if(token){
        return token.substring(1, token.length - 1);
    }
}