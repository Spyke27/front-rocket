import { ReactNode, createContext } from "react";

type ContextType = {
    tipo: string | null;
    id: string | null;
    nome: string | null;
}

export const UserContext = createContext<ContextType | null>(null)

type Props ={ children: ReactNode }

export const UserProvider = ({ children } : Props ) => {
    const tipo = sessionStorage.getItem('userType');
    const id = sessionStorage.getItem('userId');
    const nome = sessionStorage.getItem('userName');

    return (
        <UserContext.Provider value={{ tipo, id, nome }}>
            { children }
        </UserContext.Provider>
    )
}