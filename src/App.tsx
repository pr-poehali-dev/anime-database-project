import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import Index from "@/pages/Index";
import DataManagement from "./pages/DataManagement";
import Statistics from "./pages/Statistics";
import AgeSearch from "./pages/AgeSearch";
import EpisodeSearch from "./pages/EpisodeSearch";
import DatabaseInfo from "./pages/DatabaseInfo";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/age-search" element={<AgeSearch />} />
          <Route path="/episode-search" element={<EpisodeSearch />} />
          <Route path="/database-info" element={<DatabaseInfo />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
