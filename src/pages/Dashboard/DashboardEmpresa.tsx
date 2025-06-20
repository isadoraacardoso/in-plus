
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, BriefcaseBusiness, CheckCircle2 } from "lucide-react";

interface Vaga {
  id: string;
  titulo: string;
  localidade: string;
  status: string;
  candidaturas_count: number;
}

interface Empresa {
  id: string;
  razao_social: string;
  cnpj: string;
  porte: string;
  responsavel: string;
  cargo_responsavel: string;
}

const DashboardEmpresa = () => {
  const { user } = useAuth();
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [totalCandidaturas, setTotalCandidaturas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novaVaga, setNovaVaga] = useState({
    titulo: '',
    descricao: '',
    requisitos: '',
    salario: '',
    localidade: '',
    tipo_contrato: '',
    recursos_acessibilidade: ['Ambiente Acessível']
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchDados = async () => {
      try {
        // Buscar dados da empresa
        const { data: empresaData, error: empresaError } = await supabase
          .from('empresas')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (empresaError) {
          if (empresaError.code === 'PGRST116') {
            toast.error("Empresa não encontrada. Por favor, complete seu cadastro.");
            return;
          }
          throw empresaError;
        }

        setEmpresa(empresaData);

        // Buscar vagas da empresa
        const { data: vagasData, error: vagasError } = await supabase
          .from('vagas')
          .select(`
            id,
            titulo,
            localidade,
            status,
            candidaturas:candidaturas(count)
          `)
          .eq('empresa_id', empresaData.id)
          .order('created_at', { ascending: false });

        if (vagasError) throw vagasError;

        // Transformar os dados das vagas
        const vagasProcessadas = vagasData.map((vaga: any) => ({
          ...vaga,
          candidaturas_count: vaga.candidaturas[0]?.count || 0
        }));

        setVagas(vagasProcessadas);

        // Calcular total de candidaturas
        const total = vagasProcessadas.reduce((acc: number, vaga: Vaga) => acc + vaga.candidaturas_count, 0);
        setTotalCandidaturas(total);
      } catch (error: any) {
        toast.error("Erro ao carregar dados");
        console.error("Erro:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [user]);

  const handleNovaVaga = async () => {
    try {
      if (!empresa) {
        toast.error("Dados da empresa não encontrados");
        return;
      }

      if (!novaVaga.titulo || !novaVaga.descricao) {
        toast.error("Preencha ao menos título e descrição da vaga");
        return;
      }

      const { error } = await supabase
        .from('vagas')
        .insert({
          empresa_id: empresa.id,
          titulo: novaVaga.titulo,
          descricao: novaVaga.descricao,
          requisitos: novaVaga.requisitos,
          salario: novaVaga.salario,
          localidade: novaVaga.localidade,
          tipo_contrato: novaVaga.tipo_contrato,
          recursos_acessibilidade: novaVaga.recursos_acessibilidade
        });

      if (error) throw error;

      toast.success("Vaga criada com sucesso!");
      setDialogOpen(false);
      
      // Recarregar a página para mostrar a nova vaga
      window.location.reload();
    } catch (error: any) {
      toast.error("Erro ao criar vaga");
      console.error("Erro:", error.message);
    }
  };

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

  if (!empresa) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AccessibilityToolbar />
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Perfil de empresa não encontrado</h1>
          <p className="mb-6">Você precisa completar seu cadastro como empresa.</p>
          <Button onClick={() => navigate("/cadastro")}>Completar Cadastro</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Dashboard da Empresa</h1>
        <p className="text-gray-600 mb-8">{empresa.razao_social}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BriefcaseBusiness className="mr-2 h-5 w-5 text-blue-600" />
                Vagas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{vagas.filter(v => v.status === 'ativa').length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Total de Candidaturas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalCandidaturas}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-purple-600" />
                Contratações Realizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Minhas Vagas</CardTitle>
                <CardDescription>Gerencie suas vagas e candidaturas</CardDescription>
              </div>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Vaga
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {vagas.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Você ainda não publicou nenhuma vaga</p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar primeira vaga
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 bg-gray-100">Título</th>
                      <th className="text-left py-3 px-4 bg-gray-100">Localidade</th>
                      <th className="text-left py-3 px-4 bg-gray-100">Status</th>
                      <th className="text-left py-3 px-4 bg-gray-100">Candidaturas</th>
                      <th className="text-right py-3 px-4 bg-gray-100">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vagas.map((vaga) => (
                      <tr key={vaga.id} className="border-b">
                        <td className="py-4 px-4">{vaga.titulo}</td>
                        <td className="py-4 px-4">{vaga.localidade || "-"}</td>
                        <td className="py-4 px-4">
                          <Badge className={vaga.status === 'ativa' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'}>
                            {vaga.status === 'ativa' ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">{vaga.candidaturas_count}</td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Ver detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog para criar nova vaga */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Vaga</DialogTitle>
            <DialogDescription>
              Preencha os dados da vaga que sua empresa deseja publicar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="titulo">Título da Vaga *</Label>
              <Input
                id="titulo"
                value={novaVaga.titulo}
                onChange={(e) => setNovaVaga({...novaVaga, titulo: e.target.value})}
                placeholder="Ex: Analista de Recursos Humanos"
              />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição *</Label>
              <Textarea
                id="descricao"
                rows={4}
                value={novaVaga.descricao}
                onChange={(e) => setNovaVaga({...novaVaga, descricao: e.target.value})}
                placeholder="Detalhes sobre a vaga e responsabilidades"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="requisitos">Requisitos</Label>
                <Textarea
                  id="requisitos"
                  rows={3}
                  value={novaVaga.requisitos}
                  onChange={(e) => setNovaVaga({...novaVaga, requisitos: e.target.value})}
                  placeholder="Habilidades e experiência necessárias"
                />
              </div>
              <div>
                <Label htmlFor="salario">Salário</Label>
                <Input
                  id="salario"
                  value={novaVaga.salario}
                  onChange={(e) => setNovaVaga({...novaVaga, salario: e.target.value})}
                  placeholder="Ex: R$ 3.000,00 ou A combinar"
                />
                <div className="mt-2">
                  <Label htmlFor="tipo_contrato">Tipo de Contrato</Label>
                  <Input
                    id="tipo_contrato"
                    value={novaVaga.tipo_contrato}
                    onChange={(e) => setNovaVaga({...novaVaga, tipo_contrato: e.target.value})}
                    placeholder="Ex: CLT, PJ, Estágio"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="localidade">Localidade</Label>
              <Input
                id="localidade"
                value={novaVaga.localidade}
                onChange={(e) => setNovaVaga({...novaVaga, localidade: e.target.value})}
                placeholder="Ex: São Paulo - SP ou Remoto"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleNovaVaga}>Publicar Vaga</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardEmpresa;
