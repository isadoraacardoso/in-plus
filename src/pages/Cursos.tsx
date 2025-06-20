
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

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

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [inscricoes, setInscricoes] = useState<Record<string, boolean>>({});
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data, error } = await supabase
          .from('cursos')
          .select('*')
          .order('titulo', { ascending: true });

        if (error) throw error;
        setCursos(data || []);

        // Verificar inscrições do usuário se estiver logado
        if (user) {
          const { data: inscricoesData, error: inscricoesError } = await supabase
            .from('inscricoes_cursos')
            .select('curso_id')
            .eq('user_id', user.id);

          if (inscricoesError) throw inscricoesError;

          const inscricoesMap: Record<string, boolean> = {};
          inscricoesData?.forEach(i => {
            inscricoesMap[i.curso_id] = true;
          });
          
          setInscricoes(inscricoesMap);
        }
      } catch (error: any) {
        toast.error("Erro ao carregar cursos");
        console.error("Erro:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [user]);

  const handleInscricao = async (cursoId: string) => {
    if (!user) {
      toast.error("Você precisa estar logado para se inscrever em um curso");
      navigate("/login");
      return;
    }

    try {
      const { error } = await supabase
        .from('inscricoes_cursos')
        .insert({
          user_id: user.id,
          curso_id: cursoId
        });

      if (error) {
        if (error.code === '23505') { // Código de violação de unicidade
          toast.error("Você já está inscrito neste curso");
        } else {
          throw error;
        }
      } else {
        setInscricoes(prev => ({...prev, [cursoId]: true}));
        toast.success("Inscrição realizada com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao realizar inscrição");
      console.error("Erro:", error.message);
    }
  };

  const handleVerCurso = (cursoId: string) => {
    navigate(`/curso/${cursoId}`);
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
          <h1 className="text-2xl font-bold mb-4">Carregando cursos...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Cursos Disponíveis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <Card key={curso.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{curso.categoria}</Badge>
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{curso.nivel}</Badge>
                </div>
                <CardTitle className="text-xl mt-2">{curso.titulo}</CardTitle>
                <CardDescription>
                  Instrutor: {curso.instrutor} • {curso.duracao} horas
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 mb-4">{curso.descricao}</p>
                <div className="flex flex-wrap gap-1 mt-2">
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
              <CardFooter className="flex gap-2">
                <Button
                  onClick={() => handleVerCurso(curso.id)}
                  variant="outline"
                  className="flex-1"
                >
                  Ver Curso
                </Button>
                <Button
                  onClick={() => handleInscricao(curso.id)}
                  className="flex-1"
                  disabled={!!inscricoes[curso.id]}
                  variant={inscricoes[curso.id] ? "outline" : "default"}
                >
                  {inscricoes[curso.id] ? "Inscrito" : "Inscrever-se"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cursos;
