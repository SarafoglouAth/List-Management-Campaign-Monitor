import { lazy, Suspense,useEffect } from "react"; // Import lazy and Suspense for code-splitting and dynamic loading
import reactLogo from "./assets/react.svg"; // Import the logo for the app
import Loader from "./components/Loader.jsx"; // Import the Loader component for fallback
import clearAllCookies from "./hooks/clearAllCookies.js";
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from "vanilla-cookieconsent";
import CookieConsentConfig from './hooks/CookieConsentConfig.js';
import ResetButton from "./components/Cookies/CookiesResetButton.jsx";
function App() {
  // Lazy load the CrudTable component to optimize the initial load time
  const CrudTable = lazy(() => import("./components/CrudTable.jsx"));
  const deleteCCCookies = false; 
  

  useEffect(() => {
    const startUp = async () => {
      await clearAllCookies(deleteCCCookies);
      CookieConsent.run(CookieConsentConfig);
    };
    startUp();
    
  }, []); 
  return (
    <>
    <div className="App">
      <header className="flex flex-row gap-5 justify-content-center text-center">
        {/* Display the application logo */}
        <img src={reactLogo} alt="app-logo" />
        <div className="flex flex-column text-center">
          <h1>React && Node js</h1>
          <i>Campaign Monitor</i>
        </div>
      </header>

      {/* Suspense component to handle lazy loading of the CrudTable */}
      <Suspense fallback={<Loader />}>
        <CrudTable />
      </Suspense>
     
    </div>
     <footer className="m-3 fixed bottom-0 right-0">
     <ResetButton />
   </footer>
   </>
  );
}

export default App;
