
-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nome_completo TEXT,
  cpf TEXT,
  telefone TEXT,
  data_nascimento DATE,
  tipo_deficiencia TEXT,
  recursos_acessibilidade TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de empresas
CREATE TABLE public.empresas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  razao_social TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  porte TEXT,
  responsavel TEXT NOT NULL,
  cargo_responsavel TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de cursos
CREATE TABLE public.cursos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL,
  nivel TEXT NOT NULL,
  recursos_acessibilidade TEXT[],
  duracao INTEGER, -- em horas
  instrutor TEXT,
  status TEXT DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de vagas
CREATE TABLE public.vagas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  requisitos TEXT,
  salario TEXT,
  localidade TEXT,
  tipo_contrato TEXT,
  recursos_acessibilidade TEXT[],
  status TEXT DEFAULT 'ativa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de inscrições em cursos
CREATE TABLE public.inscricoes_cursos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  curso_id UUID REFERENCES public.cursos(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'inscrito',
  progresso INTEGER DEFAULT 0,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, curso_id)
);

-- Criar tabela de candidaturas
CREATE TABLE public.candidaturas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  vaga_id UUID REFERENCES public.vagas(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'enviada',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, vaga_id)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidaturas ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para empresas
CREATE POLICY "Empresas podem ver seus próprios dados" ON public.empresas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Empresas podem atualizar seus próprios dados" ON public.empresas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Empresas podem inserir seus próprios dados" ON public.empresas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para cursos (todos podem ver)
CREATE POLICY "Todos podem ver cursos" ON public.cursos
  FOR SELECT USING (true);

-- Políticas para vagas (todos podem ver)
CREATE POLICY "Todos podem ver vagas" ON public.vagas
  FOR SELECT USING (true);

-- Políticas para vagas (empresas podem gerenciar suas vagas)
CREATE POLICY "Empresas podem gerenciar suas vagas" ON public.vagas
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.empresas 
      WHERE empresas.id = vagas.empresa_id 
      AND empresas.user_id = auth.uid()
    )
  );

-- Políticas para inscrições em cursos
CREATE POLICY "Usuários podem ver suas próprias inscrições" ON public.inscricoes_cursos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias inscrições" ON public.inscricoes_cursos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias inscrições" ON public.inscricoes_cursos
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para candidaturas
CREATE POLICY "Usuários podem ver suas próprias candidaturas" ON public.candidaturas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias candidaturas" ON public.candidaturas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome_completo)
  VALUES (new.id, new.raw_user_meta_data ->> 'nome_completo');
  RETURN new;
END;
$$;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Inserir alguns cursos de exemplo
INSERT INTO public.cursos (titulo, descricao, categoria, nivel, recursos_acessibilidade, duracao, instrutor) VALUES 
('Comunicação Eficaz no Trabalho', 'Desenvolva habilidades de comunicação para o ambiente profissional', 'Soft Skills', 'Básico', ARRAY['Libras', 'Legendas', 'Audiodescrição'], 20, 'Prof. Maria Santos'),
('Excel Avançado', 'Domine as funcionalidades avançadas do Microsoft Excel', 'Hard Skills', 'Avançado', ARRAY['Legendas', 'Leitor de Tela'], 40, 'Prof. João Silva'),
('Direitos da Pessoa com Deficiência', 'Conheça seus direitos e a legislação vigente', 'Legislação', 'Básico', ARRAY['Libras', 'Legendas', 'Leitura Fácil'], 15, 'Dra. Ana Costa'),
('Liderança e Trabalho em Equipe', 'Desenvolva competências de liderança inclusiva', 'Soft Skills', 'Intermediário', ARRAY['Libras', 'Audiodescrição'], 30, 'Prof. Carlos Lima');
