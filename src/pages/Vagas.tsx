import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MapPin, Building, CreditCard, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  requisitos: string;
  salario: string;
  localidade: string;
  tipo_contrato: string;
  recursos_acessibilidade: string[];
  empresa: {
    razao_social: string;
  };
}

const Vagas = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [candidaturas, setCandidaturas] = useState<Record<string, boolean>>({});
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const { data, error } = await supabase
          .from("vagas")
          .select(
            `
            *,
            empresa:empresa_id (
              razao_social
            )
          `
          )
          .eq("status", "ativa")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setVagas(data || []);

        // Verificar candidaturas do usuário se estiver logado
        if (user) {
          const { data: candidaturasData, error: candidaturasError } =
            await supabase
              .from("candidaturas")
              .select("vaga_id")
              .eq("user_id", user.id);

          if (candidaturasError) throw candidaturasError;

          const candidaturasMap: Record<string, boolean> = {};
          candidaturasData?.forEach((c) => {
            candidaturasMap[c.vaga_id] = true;
          });

          setCandidaturas(candidaturasMap);
        }
      } catch (error: any) {
        toast.error("Erro ao carregar vagas");
        console.error("Erro:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, [user]);

  const handleCandidatura = async (vagaId: string) => {
    if (!user) {
      toast.error("Você precisa estar logado para se candidatar a uma vaga");
      navigate("/login");
      return;
    }

    try {
      const { error } = await supabase.from("candidaturas").insert({
        user_id: user.id,
        vaga_id: vagaId,
      });

      if (error) {
        if (error.code === "23505") {
          // Código de violação de unicidade
          toast.error("Você já se candidatou para esta vaga");
        } else {
          throw error;
        }
      } else {
        setCandidaturas((prev) => ({ ...prev, [vagaId]: true }));
        toast.success("Candidatura enviada com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao enviar candidatura");
      console.error("Erro:", error.message);
    }
  };

  const getBadgeColorFromRecurso = (recurso: string) => {
    switch (recurso) {
      case "Libras":
        return "bg-blue-100 text-blue-800";
      case "Ambiente Acessível":
        return "bg-green-100 text-green-800";
      case "Home Office":
        return "bg-purple-100 text-purple-800";
      case "Tecnologia Assistiva":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AccessibilityToolbar />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Carregando vagas...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Vagas Inclusivas
        </h1>

        <div className="space-y-6">
          {vagas.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">
                  Nenhuma vaga disponível no momento.
                </p>
              </CardContent>
            </Card>
          ) : (
            vagas.map((vaga) => (
              <Card key={vaga.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <CardTitle className="text-xl">{vaga.titulo}</CardTitle>
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-1" />
                      <CardDescription className="m-0">
                        {vaga.empresa?.razao_social || "Empresa"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{vaga.descricao}</p>

                  {vaga.requisitos && (
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Requisitos</h3>
                      <p className="text-gray-700">{vaga.requisitos}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {vaga.localidade && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{vaga.localidade}</span>
                      </div>
                    )}

                    {vaga.salario && (
                      <div className="flex items-center text-gray-600">
                        <CreditCard className="h-4 w-4 mr-1" />
                        <span>{vaga.salario}</span>
                      </div>
                    )}

                    {vaga.tipo_contrato && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{vaga.tipo_contrato}</span>
                      </div>
                    )}
                  </div>

                  {vaga.recursos_acessibilidade &&
                    vaga.recursos_acessibilidade.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-sm mb-1">
                          Recursos de Acessibilidade
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {vaga.recursos_acessibilidade.map((recurso) => (
                            <Badge
                              key={recurso}
                              className={getBadgeColorFromRecurso(recurso)}
                            >
                              {recurso}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleCandidatura(vaga.id)}
                    className="w-full md:w-auto"
                    disabled={!!candidaturas[vaga.id]}
                    variant={candidaturas[vaga.id] ? "outline" : "default"}
                  >
                    {candidaturas[vaga.id]
                      ? "Candidatura Enviada"
                      : "Candidatar-se"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vagas;
