import { Route, Routes } from "react-router-dom";
import Login_Store from "./pages/Login_Store";
import Signup from "./pages/Signup";
import Code_Verify from "./pages/Code_Verify";
import NavBar from "./components/NavBar";
import AuthRoute from "./components/AuthRoute"
import StoreAuthRoute from "./components/StoreAuthRout";
import Store_Validation from "./pages/Store_validation";


function App() {
  return (
    <>
      <Routes>
      <Route element={<AuthRoute/>}>
        <Route path="/code-verification" element={<Code_Verify />} />

      </Route>

      <Route element={<StoreAuthRoute />}>
      {/* signuppagenavigation */}
        <Route path="/signup" element={<Signup />} />
      </Route>
        <Route path="/" element={<Login_Store />} />
        <Route path="/storevalidation" element={<Store_Validation />} />
      </Routes>
    </>
  );
}

export default App;
