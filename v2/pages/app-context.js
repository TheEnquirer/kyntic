import { createContext, useContext } from 'react';

const AppStateProvider = createContext();

export function AppStateProvider({ children }) {
    let sharedState = {
	test: "yooooooo",
    }

    return (
	<AppStateProvider.Provider value={sharedState}>
	    {children}
	</AppStateProvider.Provider>
    );
}


export function useAppContext() {
    return useContext(useAppContext);
}








