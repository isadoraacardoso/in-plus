import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  BriefcaseBusiness,
  Globe,
  Users,
  BarChart,
  GraduationCap,
} from "lucide-react";
import { Footer } from "@/components/Footer";
const Index = () => {
  const { user, userType } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            IN+: Incluir e Integrar
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Capacitação profissional acessível e inclusão no mercado de trabalho
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                >
                  Acessar Minha Área
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/cadastro">
                  <Button
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-blue-50"
                  >
                    Cadastrar-se Gratuitamente
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white bg-blue-900 hover:bg-blue-800"
                  >
                    Entrar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to={user ? "/cursos" : "/cadastro"}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Capacitação Profissional
                  </h3>
                  <p className="text-gray-600">
                    Acesse cursos com recursos de acessibilidade e desenvolva
                    suas habilidades profissionais
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to={user ? "/vagas" : "/cadastro"}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <BriefcaseBusiness className="h-8 w-8 text-green-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Oportunidades de Emprego
                  </h3>
                  <p className="text-gray-600">
                    Conecte-se com empresas comprometidas com a inclusão e
                    encontre vagas acessíveis
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              to={user && userType === "empresa" ? "/dashboard" : "/cadastro"}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Para Empresas</h3>
                  <p className="text-gray-600">
                    Acesse consultoria especializada e ferramentas para criar um
                    ambiente de trabalho inclusivo
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">
              Cursos em Destaque
            </h2>
            <Link to="/cursos" className="text-blue-600 hover:underline">
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                    Empresas
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-medium">
                    Básico
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Ambiente inclusivo</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Crie espaços de trabalho onde todos se sintam valorizados e
                  respeitados.
                </p>
                <Link to={user ? "/cursos" : "/login"}>
                  <Button variant="outline" size="sm" className="w-full">
                    Saiba mais
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                    PCD
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-medium">
                    Intermediário
                  </span>
                </div>
                <h3 className="font-semibold mb-2">
                  Direitos e Empregabilidade
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Conheça os direitos trabalhistas e amplie suas oportunidades
                  no mercado.
                </p>
                <Link to={user ? "/cursos" : "/login"}>
                  <Button variant="outline" size="sm" className="w-full">
                    Saiba mais
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-medium">
                    Básico
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Diversidade e Inclusão</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Aprenda a criar ambientes mais acessíveis e inclusivos para
                  pessoas com deficiência, promovendo equidade e pertencimento.
                </p>
                <Link to={user ? "/cursos" : "/login"}>
                  <Button variant="outline" size="sm" className="w-full">
                    Saiba mais
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Nosso Impacto</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-200">Pessoas Capacitadas</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-blue-200">Cursos Disponíveis</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-blue-200">Empresas Parceiras</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <p className="text-blue-200">Contratações Realizadas</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Index;
