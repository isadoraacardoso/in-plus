
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, User, Building } from "lucide-react";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, user, loading, setUserType, userType } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    await signIn(email, password);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AccessibilityToolbar />
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900">Entrar na Plataforma</CardTitle>
              <CardDescription>
                Acesse sua conta para continuar sua jornada
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Seletor de tipo de usuário */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={userType === 'pcd' ? 'default' : 'ghost'}
                  className="flex-1"
                  onClick={() => setUserType('pcd')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Pessoa com Deficiência
                </Button>
                <Button
                  variant={userType === 'empresa' ? 'default' : 'ghost'}
                  className="flex-1"
                  onClick={() => setUserType('empresa')}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Empresa
                </Button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-1"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pr-10"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember" className="ml-2 text-sm">
                      Lembrar de mim
                    </Label>
                  </div>
                  <Link
                    to="/esqueci-senha"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                  Entrar
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <Link to="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">
                    Cadastre-se gratuitamente
                  </Link>
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">
                  Esta plataforma está em conformidade com as diretrizes de acessibilidade WCAG 2.1 AA
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
