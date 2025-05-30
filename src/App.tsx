import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataManagement from "./pages/DataManagement";
import AgeSearch from "./pages/AgeSearch";
import EpisodeSearch from "./pages/EpisodeSearch";
import Statistics from "./pages/Statistics";
import DatabaseInfo from "./pages/DatabaseInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/age-search" element={<AgeSearch />} />
          <Route path="/episode-search" element={<EpisodeSearch />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/database-info" element={<DatabaseInfo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
