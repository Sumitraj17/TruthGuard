import { createContext, useState } from "react";

const Context = createContext();

const Provider = (props)=>{
    const [isLoggedIn,setLog]=useState(false);
    const [login,setLogin] = useState(false);

    const update=(flag)=>{
        setLog(flag);
    }

    return(
        <Context.Provider value={{isLoggedIn,update,login,setLogin}}>{props.children}</Context.Provider>
    )
}
export {Context,Provider};
