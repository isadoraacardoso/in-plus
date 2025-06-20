
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Play, CheckCircle, Clock, User } from "lucide-react";

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  recursos_acessibilidade: string[];
  duracao: number;
  instrutor: string;
}

interface Inscricao {
  id: string;
  progresso: number;
  status: string;
  data_conclusao: string | null;
}

const Curso = () => {
  const { id } = useParams<{ id: string }>();
  const [curso, setCurso] = useState<Curso | null>(null);
  const [inscricao, setInscricao] = useState<Inscricao | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('cursos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCurso(data);

        // Verificar se o usuário está inscrito
        if (user) {
          const { data: inscricaoData, error: inscricaoError } = await supabase
            .from('inscricoes_cursos')
            .select('*')
            .eq('user_id', user.id)
            .eq('curso_id', id)
            .single();

          if (inscricaoError && inscricaoError.code !== 'PGRST116') {
            throw inscricaoError;
          }

          setInscricao(inscricaoData || null);
        }
      } catch (error: any) {
        toast.error("Erro ao carregar curso");
        console.error("Erro:", error.message);
        navigate("/cursos");
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id, user, navigate]);

  const handleInscricao = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para se inscrever em um curso");
      navigate("/login");
      return;
    }

    if (!curso) return;

    try {
      const { data, error } = await supabase
        .from('inscricoes_cursos')
        .insert({
          user_id: user.id,
          curso_id: curso.id
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast.error("Você já está inscrito neste curso");
        } else {
          throw error;
        }
      } else {
        setInscricao(data);
        toast.success("Inscrição realizada com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao realizar inscrição");
      console.error("Erro:", error.message);
    }
  };

  const handleIniciarCurso = () => {
    toast.success("Iniciando curso... (Funcionalidade em desenvolvimento)");
  };

  const getBadgeColorFromRecurso = (recurso: string) => {
    switch(recurso) {
      case 'Libras':
        return "bg-blue-100 text-blue-800";
      case 'Legendas':
        return "bg-green-100 text-green-800";
      case 'Audiodescrição':
        return "bg-purple-100 text-purple-800";
      case 'Leitor de Tela':
        return "bg-yellow-100 text-yellow-800";
      case 'Leitura Fácil':
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Carregando curso...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
          <Button onClick={() => navigate("/cursos")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Cursos
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Button 
          onClick={() => navigate("/cursos")} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar aos Cursos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-blue-100 text-blue-800">{curso.categoria}</Badge>
                <Badge className="bg-gray-100 text-gray-800">{curso.nivel}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-blue-900 mb-4">{curso.titulo}</h1>
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{curso.instrutor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{curso.duracao} horas</span>
                </div>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Sobre o Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{curso.descricao}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos de Acessibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {curso.recursos_acessibilidade?.map((recurso) => (
                    <Badge 
                      key={recurso} 
                      className={getBadgeColorFromRecurso(recurso)}
                    >
                      {recurso}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Progresso do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                {inscricao ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progresso</span>
                        <span className="text-sm text-gray-600">{inscricao.progresso}%</span>
                      </div>
                      <Progress value={inscricao.progresso} className="h-2" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      {inscricao.status === 'concluido' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Curso Concluído</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-600">Em Andamento</span>
                        </>
                      )}
                    </div>

                    <Button 
                      onClick={handleIniciarCurso}
                      className="w-full"
                      disabled={inscricao.status === 'concluido'}
                    >
                      {inscricao.status === 'concluido' ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Concluído
                        </>
                      ) : inscricao.progresso > 0 ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Continuar Curso
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Iniciar Curso
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                      Você ainda não está inscrito neste curso.
                    </p>
                    <Button onClick={handleInscricao} className="w-full">
                      Inscrever-se no Curso
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Curso;
