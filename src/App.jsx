import "./App.css";
import Header from "./shared/components/Header/Header";
import Home from "./routes/Home/Home";
import Details from "./routes/Details/Details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountriesContextProvider } from "./contexts/CountriesContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <CountriesContextProvider>
          <Routes>
            <Route path="/">
              <Route path="" element={<Home />} />
              <Route path=":countryName" element={<Details />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </CountriesContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
