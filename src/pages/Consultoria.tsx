import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  Shield, 
  BookOpen, 
  CheckCircle,
  Phone,
  Mail,
  Calendar
} from "lucide-react";

const Consultoria = () => {
  const servicos = [
    {
      icon: Users,
      title: "Consultoria em Inclusão",
      description: "Ajudamos sua empresa a criar um ambiente verdadeiramente inclusivo para pessoas com deficiência.",
      features: ["Diagnóstico organizacional", "Plano de ação personalizado", "Treinamento de equipes"]
    },
    {
      icon: TrendingUp,
      title: "Compliance e Lei de Cotas",
      description: "Garantimos que sua empresa esteja em conformidade com a legislação vigente.",
      features: ["Auditoria de cumprimento", "Estratégias de contratação", "Acompanhamento legal"]
    },
    {
      icon: Shield,
      title: "Acessibilidade Digital",
      description: "Tornamos seus sistemas e plataformas acessíveis para todos os usuários.",
      features: ["Avaliação de acessibilidade", "Implementação WCAG", "Testes com usuários"]
    },
    {
      icon: BookOpen,
      title: "Treinamentos Corporativos",
      description: "Capacitamos suas equipes para trabalhar de forma inclusiva e respeitosa.",
      features: ["Workshops presenciais", "Cursos online", "Materiais educativos"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AccessibilityToolbar />
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Consultoria em Inclusão
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme sua empresa em um ambiente verdadeiramente inclusivo. 
            Nossa consultoria especializada ajuda organizações a criar oportunidades 
            reais para pessoas com deficiência.
          </p>
        </div>

        {/* Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {servicos.map((servico, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <servico.icon className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-xl">{servico.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {servico.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {servico.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="bg-blue-900 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Nossos Resultados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-blue-100">Empresas atendidas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-blue-100">Taxa de satisfação</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">2000+</div>
              <div className="text-blue-100">Profissionais capacitados</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Pronto para transformar sua empresa?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Entre em contato conosco e descubra como podemos ajudar sua organização 
              a se tornar mais inclusiva e diversa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Phone className="mr-2 h-4 w-4" />
                (11) 9999-9999
              </Button>
              <Button size="lg" variant="secondary">
                <Mail className="mr-2 h-4 w-4" />
                consultoria@inplus.com
              </Button>
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar Reunião
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Consultoria;
