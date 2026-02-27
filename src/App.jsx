import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="w-full max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/transactions" element={<TransactionHistory />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;