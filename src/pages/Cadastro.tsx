import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, User, Building } from "lucide-react";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { useAuth } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUserType, userType, user, loading, signUp } = useAuth();

  // Dados comuns
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Dados para PcD
  const [nomePcd, setNomePcd] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [tipoDeficiencia, setTipoDeficiencia] = useState("");
  const [recursosAcessibilidade, setRecursosAcessibilidade] = useState<
    string[]
  >([]);

  // Dados para Empresa
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [porte, setPorte] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [cargo, setCargo] = useState("");

  const handleRecursoChange = (recurso: string) => {
    if (recursosAcessibilidade.includes(recurso)) {
      setRecursosAcessibilidade(
        recursosAcessibilidade.filter((r) => r !== recurso)
      );
    } else {
      setRecursosAcessibilidade([...recursosAcessibilidade, recurso]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulário
    if (!email || !password) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    if (!acceptTerms) {
      alert("Você precisa aceitar os termos de uso");
      return;
    }

    // Preparar dados conforme o tipo de usuário
    const userData =
      userType === "pcd"
        ? {
            nome_completo: nomePcd,
            cpf,
            telefone,
            data_nascimento: dataNascimento,
            tipo_deficiencia: tipoDeficiencia,
            recursos_acessibilidade: recursosAcessibilidade,
            userType,
          }
        : {
            razao_social: razaoSocial,
            cnpj,
            porte,
            responsavel,
            cargo_responsavel: cargo,
            userType,
          };

    // Registrar usuário
    await signUp(email, password, userData);
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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900">
                Criar Conta
              </CardTitle>
              <CardDescription>
                Junte-se à comunidade IN+ e comece sua jornada de inclusão
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Seletor de tipo de usuário */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={userType === "pcd" ? "default" : "ghost"}
                  className="flex-1"
                  onClick={() => setUserType("pcd")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Pessoa com Deficiência
                </Button>
                <Button
                  variant={userType === "empresa" ? "default" : "ghost"}
                  className="flex-1"
                  onClick={() => setUserType("empresa")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Empresa
                </Button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {userType === "pcd" ? (
                  // Formulário para PcD
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome completo *</Label>
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Seu nome completo"
                          className="mt-1"
                          required
                          value={nomePcd}
                          onChange={(e) => setNomePcd(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          type="text"
                          placeholder="000.000.000-00"
                          className="mt-1"
                          required
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="mt-1"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="data-nascimento">
                          Data de Nascimento
                        </Label>
                        <Input
                          id="data-nascimento"
                          type="date"
                          className="mt-1"
                          value={dataNascimento}
                          onChange={(e) => setDataNascimento(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tipo-deficiencia">
                        Tipo de Deficiência (opcional)
                      </Label>
                      <select
                        id="tipo-deficiencia"
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={tipoDeficiencia}
                        onChange={(e) => setTipoDeficiencia(e.target.value)}
                      >
                        <option value="">Prefiro não informar</option>
                        <option value="fisica">Deficiência Física</option>
                        <option value="visual">Deficiência Visual</option>
                        <option value="auditiva">Deficiência Auditiva</option>
                        <option value="intelectual">
                          Deficiência Intelectual
                        </option>
                        <option value="multipla">Deficiência Múltipla</option>
                        <option value="tgd">
                          Transtorno Global do Desenvolvimento
                        </option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Esta informação nos ajuda a personalizar recursos de
                        acessibilidade
                      </p>
                    </div>

                    <div>
                      <Label>Recursos de Acessibilidade Desejados</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="libras"
                            className="rounded"
                            checked={recursosAcessibilidade.includes("Libras")}
                            onChange={() => handleRecursoChange("Libras")}
                          />
                          <Label htmlFor="libras" className="text-sm">
                            Intérprete de Libras
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="audio"
                            className="rounded"
                            checked={recursosAcessibilidade.includes(
                              "Audiodescrição"
                            )}
                            onChange={() =>
                              handleRecursoChange("Audiodescrição")
                            }
                          />
                          <Label htmlFor="audio" className="text-sm">
                            Audiodescrição
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="contraste"
                            className="rounded"
                            checked={recursosAcessibilidade.includes(
                              "Alto Contraste"
                            )}
                            onChange={() =>
                              handleRecursoChange("Alto Contraste")
                            }
                          />
                          <Label htmlFor="contraste" className="text-sm">
                            Alto Contraste
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="leitor"
                            className="rounded"
                            checked={recursosAcessibilidade.includes(
                              "Leitor de Tela"
                            )}
                            onChange={() =>
                              handleRecursoChange("Leitor de Tela")
                            }
                          />
                          <Label htmlFor="leitor" className="text-sm">
                            Leitor de Tela
                          </Label>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Formulário para Empresa
                  <>
                    <div>
                      <Label htmlFor="razao-social">Razão Social *</Label>
                      <Input
                        id="razao-social"
                        type="text"
                        placeholder="Nome da empresa"
                        className="mt-1"
                        required
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cnpj">CNPJ *</Label>
                        <Input
                          id="cnpj"
                          type="text"
                          placeholder="00.000.000/0000-00"
                          className="mt-1"
                          required
                          value={cnpj}
                          onChange={(e) => setCnpj(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="porte">Porte da Empresa</Label>
                        <select
                          id="porte"
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={porte}
                          onChange={(e) => setPorte(e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option value="mei">MEI</option>
                          <option value="micro">Microempresa</option>
                          <option value="pequena">
                            Empresa de Pequeno Porte
                          </option>
                          <option value="media">Empresa de Médio Porte</option>
                          <option value="grande">Grande Empresa</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email-empresa">
                        E-mail Corporativo *
                      </Label>
                      <Input
                        id="email-empresa"
                        type="email"
                        placeholder="contato@empresa.com"
                        className="mt-1"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="responsavel">Nome do Responsável *</Label>
                      <Input
                        id="responsavel"
                        type="text"
                        placeholder="Nome completo do responsável"
                        className="mt-1"
                        required
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cargo">Cargo do Responsável</Label>
                      <Input
                        id="cargo"
                        type="text"
                        placeholder="Ex: Gerente de RH"
                        className="mt-1"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="password">Senha *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
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
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Li e aceito os{" "}
                    <Link
                      to="/termos"
                      className="text-blue-600 hover:text-blue-500 underline"
                    >
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link
                      to="/privacidade"
                      className="text-blue-600 hover:text-blue-500 underline"
                    >
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800"
                >
                  Criar Conta
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Faça login
                  </Link>
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">
                  * Campos obrigatórios. Seus dados estão protegidos conforme a
                  LGPD.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cadastro;
