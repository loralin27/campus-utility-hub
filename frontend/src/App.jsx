import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Resources from "./pages/Resources";
import Borrow from "./pages/Borrow";
import LostFound from "./pages/LostFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/borrow"
            element={
              <ProtectedRoute>
                <Borrow />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lost"
            element={
              <ProtectedRoute>
                <LostFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;