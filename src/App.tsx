import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import './global.css'

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
