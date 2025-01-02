import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

const ContextProvider = ({ children }) => {

   const [allData, setAllData] = useState({});
    
    useEffect(() => {
        fetch('http://localhost:3500/user_1/')
        .then(res => res.json())
        .then(data => setAllData(data))
    },[])
    

    return(
        <DataContext.Provider value={allData} >
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider;
