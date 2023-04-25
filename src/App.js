import "./components/style.css";
import "./App.css";
import { ExtrusionProvider } from "./context/ExtrusionContext";
import { ClientProvider } from "./context/ClientContext";
import { FilmProvider } from "./context/FilmContext";
import { PrintingProvider } from "./context/PrintingContext";
import { StriosProvider } from "./context/StriosContext";
import { TintProvider } from "./context/TintContext";
import { DiscountProvider } from "./context/DiscountContext";
import { AuthProvider } from "./context/AuthContext";
import AppCustom from "./AppCustom";
import { BrowserRouter as Router } from "react-router-dom";
import { BagProvider } from "./context/BagContext";

function App() {
  return (
    <div className="appbody-main">
      {/* <Routes className='appbody-routes'> */}
      <Router>
        <AuthProvider>
          <ClientProvider>
            <FilmProvider>
              <PrintingProvider>
                <DiscountProvider>
                  <StriosProvider>
                    <TintProvider>
                      <ExtrusionProvider>
                        <BagProvider>
                          <AppCustom />
                        </BagProvider>
                      </ExtrusionProvider>
                    </TintProvider>
                  </StriosProvider>
                </DiscountProvider>
              </PrintingProvider>
            </FilmProvider>
          </ClientProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
