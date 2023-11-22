import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInsession } from "./common/session";
import Editor from "./pages/editor.pages";
import toaster from "./common/toaster";
import ToasterProvider from "./common/toaster";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    let userInSession = lookInsession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <ToasterProvider>
          <Routes>
            <Route path="/editor" element={<Editor />} />
            <Route path="/" element={<Navbar />}>
              <Route path="signin" element={<UserAuthForm type="sign-in" />} />
              <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            </Route>
          </Routes>
          </ToasterProvider>
      </UserContext.Provider>
    </>
  );
};

export default App;
