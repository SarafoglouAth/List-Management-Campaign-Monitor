import { lazy, Suspense } from "react"; // Import lazy and Suspense for code-splitting and dynamic loading
import reactLogo from "./assets/react.svg"; // Import the logo for the app
import Loader from "./components/Loader.jsx"; // Import the Loader component for fallback

function App() {
  // Lazy load the CrudTable component to optimize the initial load time
  const CrudTable = lazy(() => import("./components/CrudTable.jsx"));

  return (
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
  );
}

export default App;
