import { Children, createContext, useContext, useState } from "react";

const AppContext = createContext({});

export function ContextProvider({children}:any) {
    const [state, setState] = useState(true)

    return (
        <AppContext.Provider
            value={{
                state
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}