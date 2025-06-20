import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Menu, User, Building, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
export const Header = () => {
  const {
    user,
    signOut
  } = useAuth();
  const handleLogout = async () => {
    await signOut();
  };
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <AccessibilityToolbar />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-900">
              IN+ <span className="text-green-500">Incluir e Integrar</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <NavigationMenu>
              <NavigationMenuList className="space-x-8">
                <NavigationMenuItem>
                  <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                    Início
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-900 font-medium">
                    Cursos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <Link to="/cursos" className="block p-3 hover:bg-gray-50 rounded">
                        <h3 className="font-medium">Todos os Cursos</h3>
                        <p className="text-sm text-gray-600">Explore nossa biblioteca completa</p>
                      </Link>
                      <Link to="/cursos/soft-skills" className="block p-3 hover:bg-gray-50 rounded">
                        <h3 className="font-medium">Empresas</h3>
                        <p className="text-sm text-gray-600">Cursos para Empresas</p>
                      </Link>
                      <Link to="/cursos/hard-skills" className="block p-3 hover:bg-gray-50 rounded">
                        <h3 className="font-medium">PCD</h3>
                        <p className="text-sm text-gray-600">Cursos para PCD</p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/vagas" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                    Vagas
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/empresas" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                    Empresas
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/consultoria" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                    Consultoria
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/sobre" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                    Sobre
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <Link to="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div> : <>
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <User className="mr-2 h-4 w-4" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild className="bg-blue-900 hover:bg-blue-800">
                  <Link to="/cadastro">Cadastrar</Link>
                </Button>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>;
};