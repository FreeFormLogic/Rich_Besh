import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TelegramApp from "@/components/telegram-app";
import Home from "@/pages/home";
import Predictions from "@/pages/predictions";
import Courses from "@/pages/courses";
import SuccessStories from "@/pages/success-stories";
import Stories from "@/pages/stories";
import ExclusiveContent from "@/pages/exclusive-content";
import TrustManagement from "@/pages/trust-management";
import Consultations from "@/pages/consultations";
import Partners from "@/pages/partners";
import Purchases from "@/pages/purchases";
import Support from "@/pages/support";
import Lifestyle from "@/pages/lifestyle";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/success" element={<SuccessStories />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/exclusive-content" element={<ExclusiveContent />} />
        <Route path="/trust-management" element={<TrustManagement />} />
        <Route path="/consultations" element={<Consultations />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/support" element={<Support />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TelegramApp>
          <Toaster />
          <AppRouter />
        </TelegramApp>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
