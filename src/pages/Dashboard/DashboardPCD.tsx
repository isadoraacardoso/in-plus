
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { CalendarClock, GraduationCap, BookOpen, BriefcaseBusiness } from "lucide-react";

interface Inscricao {
  id: string;
  status: string;
  progresso: number;
  curso: {
    id: string;
    titulo: string;
    categoria: string;
    nivel: string;
  };
}

interface Candidatura {
  id: string;
  status: string;
  created_at: string;
  vaga: {
    id: string;
    titulo: string;
    empresa: {
      razao_social: string;
    };
  };
}

const DashboardPCD = () => {
  const { user } = useAuth();
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDados = async () => {
      try {
        // Buscar perfil
        const { data: perfilData, error: perfilError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (perfilError && perfilError.code !== 'PGRST116') throw perfilError;

        // Buscar inscrições em cursos
        const { data: inscricoesData, error: inscricoesError } = await supabase
          .from('inscricoes_cursos')
          .select(`
            id,
            status,
            progresso,
            curso:curso_id (
              id,
              titulo,
              categoria,
              nivel
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (inscricoesError) throw inscricoesError;

        // Buscar candidaturas
        const { data: candidaturasData, error: candidaturasError } = await supabase
          .from('candidaturas')
          .select(`
            id,
            status,
            created_at,
            vaga:vaga_id (
              id,
              titulo,
              empresa:empresa_id (
                razao_social
              )
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (candidaturasError) throw candidaturasError;

        setPerfil(perfilData || {});
        setInscricoes(inscricoesData || []);
        setCandidaturas(candidaturasData || []);
      } catch (error: any) {
        toast.error("Erro ao carregar dados");
        console.error("Erro:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AccessibilityToolbar />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Carregando dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Olá, {perfil?.nome_completo || user?.email}</h1>
        <p className="text-gray-600 mb-8">Bem-vindo ao seu painel de controle</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                Cursos Inscritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{inscricoes.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BriefcaseBusiness className="mr-2 h-5 w-5 text-green-600" />
                Candidaturas Enviadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{candidaturas.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-purple-600" />
                Cursos Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {inscricoes.filter(i => i.status === 'concluido').length}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Meus Cursos</span>
                <Link to="/cursos">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </Link>
              </CardTitle>
              <CardDescription>Cursos em andamento e concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              {inscricoes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Você ainda não está inscrito em nenhum curso</p>
                  <Link to="/cursos">
                    <Button>Explorar Cursos</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {inscricoes.map((inscricao) => (
                    <div key={inscricao.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">{inscricao.curso.titulo}</h3>
                        <div className="flex space-x-2 mt-1">
                          <Badge variant="outline">{inscricao.curso.categoria}</Badge>
                          <Badge variant="outline">{inscricao.curso.nivel}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={inscricao.status === 'concluido' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'}>
                          {inscricao.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                        </Badge>
                        <span className="text-sm text-gray-500 mt-1">
                          {inscricao.progresso}% completo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Minhas Candidaturas</span>
                <Link to="/vagas">
                  <Button variant="outline" size="sm">Ver Todas</Button>
                </Link>
              </CardTitle>
              <CardDescription>Status das suas candidaturas</CardDescription>
            </CardHeader>
            <CardContent>
              {candidaturas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Você ainda não se candidatou a nenhuma vaga</p>
                  <Link to="/vagas">
                    <Button>Ver Vagas Disponíveis</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidaturas.map((candidatura) => (
                    <div key={candidatura.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">{candidatura.vaga.titulo}</h3>
                        <p className="text-sm text-gray-600">{candidatura.vaga.empresa?.razao_social}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={
                          candidatura.status === 'aceita' ? 'bg-green-100 text-green-800' :
                          candidatura.status === 'rejeitada' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {candidatura.status === 'aceita' ? 'Aceita' :
                           candidatura.status === 'rejeitada' ? 'Rejeitada' :
                           'Em análise'}
                        </Badge>
                        <span className="text-xs text-gray-500 mt-1 flex items-center">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          {new Date(candidatura.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPCD;
