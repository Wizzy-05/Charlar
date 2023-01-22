import React from "react";
import { ContactsProvider } from "./Contexts/ContactsProvider";
import useLocalStorage from "./Hooks/useLocalStorage";
import "./Styles/App.scss";
import Dashboard from "./Views/Dashboard";
import { Login } from "./Views/Login";

function App() {
  const [userId, setUserId] = useLocalStorage("id");
  const dashboard = (
    <ContactsProvider>
      <Dashboard userId={userId} />
    </ContactsProvider>
  );
  return userId ? dashboard : <Login setUserId={setUserId} />;
}

export default App;
