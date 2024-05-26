import { Outlet } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { useAuth } from "./components/auth/AuthProvider";
const App = () => {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? <Nav /> : null}
      <Outlet />
    </>
  );
};
export default App;
