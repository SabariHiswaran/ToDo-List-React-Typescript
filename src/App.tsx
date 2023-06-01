import { useEffect, useState } from "react";
import "./App.css";
import Preloader from "./Components/Preloader";
import Todopage from "./Components/Todopage";

function App() {
  const [pageLoad, setPageLoad] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setPageLoad(true), 2000);
  }, []);

  return pageLoad ? (
    <div>
        <Todopage/>
    </div>
  ) : (
    <div>
      <Preloader />
    </div>
  );
}

export default App;
