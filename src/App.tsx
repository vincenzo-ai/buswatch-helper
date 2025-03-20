
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "@/components/AnimatePresence";
import OpenStreetMapNotice from "@/components/MapboxApiKey";
import LandingPage from "./pages/LandingPage";
import DriverApp from "./pages/DriverApp";
import ParentApp from "./pages/ParentApp";
import NotFound from "./pages/NotFound";
import DriverProfile from "./pages/DriverProfile";
import ChildProfile from "./pages/ChildProfile";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/driver" element={<DriverApp />} />
        <Route path="/parent" element={<ParentApp />} />
        <Route path="/driver-profile" element={<DriverProfile />} />
        <Route path="/child-profile" element={<ChildProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OpenStreetMapNotice />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
