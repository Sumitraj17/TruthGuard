import { createContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = (props) => {
  const [isLoggedIn, setLog] = useState(false);
  const [login, setLogin] = useState(false);
  const [user,setUser] = useState("")

  const update = (flag) => {
    setLog(flag);
    localStorage.setItem("loggedIn", flag);
  };
  const updateLogin = (flag) => {
    setLogin(flag);
    localStorage.setItem("login", flag);
  };
  const updateUser = (id)=>{
    setUser(id);
    localStorage.setItem("id",id);
  }
  useEffect(() => {
    
    setLog(localStorage.getItem("loggedIn") || false);
    setLogin(localStorage.getItem("login") || false);
    setUser(localStorage.getItem("id") || "");
  },[isLoggedIn,login,user]);
  return (
    <Context.Provider
      value={{ isLoggedIn, update, login, setLogin, updateLogin,user,updateUser }}
    >
      {props.children}
    </Context.Provider>
  );
};
export { Context, Provider };
