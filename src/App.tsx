import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";
import Cursos from "./pages/Cursos";
import Curso from "./pages/Curso";
import Vagas from "./pages/Vagas";
import Empresas from "./pages/Empresas";
import Consultoria from "./pages/Consultoria";
import Sobre from "./pages/Sobre";
import Loja from "./pages/Loja Virtual";
import SoftSkills from "./pages/cursos/SoftSkills";
import HardSkills from "./pages/cursos/HardSkills";
import Dashboard from "./pages/Dashboard/Index";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/curso/:id" element={<Curso />} />
            <Route path="/cursos/soft-skills" element={<SoftSkills />} />
            <Route path="/cursos/hard-skills" element={<HardSkills />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/consultoria" element={<Consultoria />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
