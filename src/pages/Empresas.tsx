
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Building, Users, MapPin } from "lucide-react";

interface Empresa {
  id: string;
  razao_social: string;
  porte: string;
  vagas_count: number;
}

const Empresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data, error } = await supabase
          .from('empresas')
          .select(`
            id,
            razao_social,
            porte,
            vagas:vagas(count)
          `)
          .order('razao_social', { ascending: true });

        if (error) throw error;

        const empresasProcessadas = data?.map((empresa: any) => ({
          ...empresa,
          vagas_count: empresa.vagas[0]?.count || 0
        })) || [];

        setEmpresas(empresasProcessadas);
      } catch (error: any) {
        console.error("Erro ao carregar empresas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Carregando empresas...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Empresas Parceiras</h1>
          <p className="text-gray-600 text-lg">
            Conheça as empresas que fazem parte da nossa rede de inclusão
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {empresas.map((empresa) => (
            <Card key={empresa.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{empresa.razao_social}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {empresa.porte || "Não informado"}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {empresa.vagas_count} vaga{empresa.vagas_count !== 1 ? 's' : ''} disponíve{empresa.vagas_count !== 1 ? 'is' : 'l'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {empresas.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma empresa encontrada</h3>
            <p className="text-gray-500">Estamos trabalhando para trazer mais empresas parceiras.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Empresas;
