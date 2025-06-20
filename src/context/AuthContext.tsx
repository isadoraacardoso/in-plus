
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type UserType = "pcd" | "empresa" | null;

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userType: UserType;
  loading: boolean;
  setUserType: (type: UserType) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para limpar o estado de autenticação
  const cleanupAuthState = () => {
    // Remove os tokens padrão de autenticação
    localStorage.removeItem('supabase.auth.token');
    
    // Remove todas as chaves Supabase do localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove do sessionStorage se estiver em uso
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    
    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Atrasar a busca de dados para evitar deadlocks
          setTimeout(() => {
            checkUserType(session.user.id);
          }, 0);
        } else {
          setUserType(null);
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserType(session.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserType = async (userId: string) => {
    try {
      // Verificar se o usuário tem um perfil de empresa
      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (empresa) {
        setUserType('empresa');
        return;
      }
      
      // Senão, assume que é um perfil PCD
      setUserType('pcd');
    } catch (error) {
      console.error("Erro ao verificar tipo de usuário:", error);
      setUserType('pcd'); // Por padrão, considera PCD
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Limpar estado de autenticação existente
      cleanupAuthState();
      
      // Tentar logout global
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continua mesmo se falhar
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data?.user) {
        toast.success("Login realizado com sucesso!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
      console.error("Erro de login:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      // Limpar estado de autenticação existente
      cleanupAuthState();
      
      // Tentar logout global
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continua mesmo se falhar
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome_completo: userData.nome_completo || userData.razao_social || email,
            user_type: userData.userType
          }
          // Removed emailRedirectTo to disable email verification completely
        }
      });
      
      if (error) throw error;
      
      if (data?.user) {
        if (userData.userType === 'empresa') {
          // Criar registro de empresa
          const { error: empresaError } = await supabase
            .from('empresas')
            .insert({
              user_id: data.user.id,
              razao_social: userData.razao_social,
              cnpj: userData.cnpj,
              porte: userData.porte,
              responsavel: userData.responsavel,
              cargo_responsavel: userData.cargo_responsavel
            });
            
          if (empresaError) throw empresaError;
        } else {
          // Atualizar perfil PCD
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              cpf: userData.cpf,
              telefone: userData.telefone,
              data_nascimento: userData.data_nascimento,
              tipo_deficiencia: userData.tipo_deficiencia,
              recursos_acessibilidade: userData.recursos_acessibilidade
            })
            .eq('id', data.user.id);
            
          if (profileError) throw profileError;
        }
        
        toast.success("Cadastro realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta");
      console.error("Erro de cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Limpar estado de autenticação
      cleanupAuthState();
      
      // Tentar logout global
      await supabase.auth.signOut({ scope: 'global' });
      
      toast.success("Logout realizado com sucesso");
      navigate("/login");
    } catch (error: any) {
      toast.error("Erro ao fazer logout");
      console.error("Erro de logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userType,
        loading,
        setUserType,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
