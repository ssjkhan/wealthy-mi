import React from "react";
import "./styles/css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Demo from "./features/demo/Demo";
import ConstructionAlert from "./components/ConstructionAlert";
import Expense from "./features/expenses/Expenses";

function App() {
  const currentUser = useSelector((state) => state.auth);
  // if (!currentUser.userInfo) {
  //   return <Navigate to="/app/auth" />;
  // }

  let showConAlert = () => {};

  const getConAlertHandle = (alertHandle) => {
    showConAlert = alertHandle;
  };

  return (
    <div id="wrapper">
      <ConstructionAlert onMount={getConAlertHandle} />
      <Sidebar conAlert={() => showConAlert(true)} />
      <Routes>
        <Route path="demo" element={<Demo />}></Route>
        <Route path="expense" element={<Expense />}></Route>
        <Route path="*" ErrorHandling></Route>
      </Routes>
    </div>
  );
}

export default App;
