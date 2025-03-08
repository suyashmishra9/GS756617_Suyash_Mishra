import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter> 
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <AppRouter />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
