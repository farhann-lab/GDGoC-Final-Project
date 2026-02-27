import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/transactions" element={<TransactionHistory />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;