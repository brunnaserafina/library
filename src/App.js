import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterBook from "./pages/RegisterBook";

function App() {
  const [render, setRender] = useState(false);
  const [loggedAdmin, setLoggedAdmin] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  const AdminRoute = ({ element, ...props }) => {
    return loggedAdmin ? element : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home render={render} setRender={setRender} />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/cadastrar-livro"
          element={
            <AdminRoute
              element={<RegisterBook render={render} setRender={setRender} />}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
