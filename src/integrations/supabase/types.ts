export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidaturas: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          user_id: string
          vaga_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          user_id: string
          vaga_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string
          vaga_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidaturas_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      cursos: {
        Row: {
          categoria: string
          created_at: string | null
          descricao: string | null
          duracao: number | null
          id: string
          instrutor: string | null
          nivel: string
          recursos_acessibilidade: string[] | null
          status: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          categoria: string
          created_at?: string | null
          descricao?: string | null
          duracao?: number | null
          id?: string
          instrutor?: string | null
          nivel: string
          recursos_acessibilidade?: string[] | null
          status?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          categoria?: string
          created_at?: string | null
          descricao?: string | null
          duracao?: number | null
          id?: string
          instrutor?: string | null
          nivel?: string
          recursos_acessibilidade?: string[] | null
          status?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      empresas: {
        Row: {
          cargo_responsavel: string | null
          cnpj: string
          created_at: string | null
          id: string
          porte: string | null
          razao_social: string
          responsavel: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cargo_responsavel?: string | null
          cnpj: string
          created_at?: string | null
          id?: string
          porte?: string | null
          razao_social: string
          responsavel: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cargo_responsavel?: string | null
          cnpj?: string
          created_at?: string | null
          id?: string
          porte?: string | null
          razao_social?: string
          responsavel?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      inscricoes_cursos: {
        Row: {
          created_at: string | null
          curso_id: string
          data_conclusao: string | null
          id: string
          progresso: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          curso_id: string
          data_conclusao?: string | null
          id?: string
          progresso?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          curso_id?: string
          data_conclusao?: string | null
          id?: string
          progresso?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inscricoes_cursos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          cpf: string | null
          created_at: string | null
          data_nascimento: string | null
          id: string
          nome_completo: string | null
          recursos_acessibilidade: string[] | null
          telefone: string | null
          tipo_deficiencia: string | null
          updated_at: string | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          id: string
          nome_completo?: string | null
          recursos_acessibilidade?: string[] | null
          telefone?: string | null
          tipo_deficiencia?: string | null
          updated_at?: string | null
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          id?: string
          nome_completo?: string | null
          recursos_acessibilidade?: string[] | null
          telefone?: string | null
          tipo_deficiencia?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vagas: {
        Row: {
          created_at: string | null
          descricao: string | null
          empresa_id: string
          id: string
          localidade: string | null
          recursos_acessibilidade: string[] | null
          requisitos: string | null
          salario: string | null
          status: string | null
          tipo_contrato: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          empresa_id: string
          id?: string
          localidade?: string | null
          recursos_acessibilidade?: string[] | null
          requisitos?: string | null
          salario?: string | null
          status?: string | null
          tipo_contrato?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string
          id?: string
          localidade?: string | null
          recursos_acessibilidade?: string[] | null
          requisitos?: string | null
          salario?: string | null
          status?: string | null
          tipo_contrato?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vagas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
