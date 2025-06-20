import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Heart, Target, Users, Award, Lightbulb, Globe } from "lucide-react";
import { Footer } from "@/components/Footer";

const Sobre = () => {
  const valores = [
    {
      icon: Heart,
      title: "Inclusão",
      description:
        "Acreditamos que toda pessoa tem direito a oportunidades iguais no mercado de trabalho.",
    },
    {
      icon: Target,
      title: "Foco no Resultado",
      description:
        "Trabalhamos com objetivos claros para gerar impacto real na vida das pessoas.",
    },
    {
      icon: Users,
      title: "Colaboração",
      description:
        "Unimos pessoas, empresas e organizações em prol de um objetivo comum.",
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Buscamos sempre a qualidade máxima em tudo que fazemos.",
    },
  ];

  const equipe = [
    {
      nome: "Maria Santos",
      cargo: "CEO e Fundadora",
      descricao:
        "15 anos de experiência em inclusão social e diversidade corporativa.",
    },
    {
      nome: "João Silva",
      cargo: "Diretor de Tecnologia",
      descricao:
        "Especialista em acessibilidade digital e desenvolvimento inclusivo.",
    },
    {
      nome: "Ana Costa",
      cargo: "Diretora de RH",
      descricao: "Psicóloga especializada em recrutamento e seleção inclusiva.",
    },
    {
      nome: "Carlos Lima",
      cargo: "Coordenador de Cursos",
      descricao:
        "Pedagogo com foco em educação inclusiva e desenvolvimento profissional.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Sobre a IN+ Incluir e Integrar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos uma plataforma dedicada a promover a inclusão de pessoas com
            deficiência no mercado de trabalho, conectando talentos a
            oportunidades reais.
          </p>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-blue-900">
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Promover a inclusão efetiva de pessoas com deficiência no
                mercado de trabalho, oferecendo capacitação, oportunidades e
                suporte especializado.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-blue-900">
                Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ser referência nacional em inclusão profissional, criando um
                mercado de trabalho verdadeiramente acessível e diverso para
                todos.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-blue-900">
                Nossos Valores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Inclusão, respeito, diversidade, excelência, inovação e
                compromisso social guiam todas as nossas ações e decisões.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Valores Detalhados */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
            Nossos Valores em Detalhes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valores.map((valor, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <valor.icon className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">{valor.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nossa História */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">
              Nossa História
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              A IN+ Incluir e Integrar nasceu em 2020 da necessidade urgente de
              criar pontes reais entre pessoas com deficiência e o mercado de
              trabalho. Fundada por profissionais experientes em RH, tecnologia
              e inclusão social, nossa plataforma surgiu para revolucionar a
              forma como a inclusão profissional acontece no Brasil.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Desde o início, nosso foco tem sido não apenas cumprir a Lei de
              Cotas, mas criar um ambiente onde a diversidade seja valorizada e
              onde cada pessoa possa contribuir com seus talentos únicos.
              Acreditamos que a inclusão vai muito além da contratação - é sobre
              criar culturas organizacionais verdadeiramente acessíveis.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hoje, orgulhosamente conectamos milhares de profissionais com
              deficiência a oportunidades de trabalho em centenas de empresas
              parceiras, sempre com foco na qualidade das relações e no
              desenvolvimento contínuo de todos os envolvidos.
            </p>
          </CardContent>
        </Card>

        {/* Equipe */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((membro, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{membro.nome}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {membro.cargo}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{membro.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <Card className="bg-gradient-to-r from-blue-900 to-green-600 text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Nosso Impacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  5.000+
                </div>
                <div className="text-blue-100">Pessoas capacitadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  800+
                </div>
                <div className="text-blue-100">Empresas parceiras</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  3.200+
                </div>
                <div className="text-blue-100">Profissionais contratados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  150+
                </div>
                <div className="text-blue-100">Cursos oferecidos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Sobre;
