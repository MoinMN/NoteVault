import { Routes, Route } from "react-router-dom";
import PrivacyPolicyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
