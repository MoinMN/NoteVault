import { Routes, Route } from "react-router-dom";
import PrivacyPolicyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";
import NotFoundPage from "./pages/NotFound";
import OpenAppPage from "./pages/OpenApp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/open" element={<OpenAppPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
