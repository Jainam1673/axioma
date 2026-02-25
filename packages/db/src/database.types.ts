export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      clients: {
        Row: {
          client_name: string
          client_type: string | null
          company_id: string
          contact_details: string | null
          created_at: string
          gst_number: string | null
          id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          client_name: string
          client_type?: string | null
          company_id: string
          contact_details?: string | null
          created_at?: string
          gst_number?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          client_name?: string
          client_type?: string | null
          company_id?: string
          contact_details?: string | null
          created_at?: string
          gst_number?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          company_id: string
          created_at: string
          description: string | null
          expense_date: string
          id: string
          linked_month: string | null
          payment_method: string | null
          receipt_url: string | null
          recurring: boolean | null
          sub_category: string | null
          updated_at: string
          vendor_name: string | null
        }
        Insert: {
          amount: number
          category: string
          company_id: string
          created_at?: string
          description?: string | null
          expense_date: string
          id?: string
          linked_month?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          recurring?: boolean | null
          sub_category?: string | null
          updated_at?: string
          vendor_name?: string | null
        }
        Update: {
          amount?: number
          category?: string
          company_id?: string
          created_at?: string
          description?: string | null
          expense_date?: string
          id?: string
          linked_month?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          recurring?: boolean | null
          sub_category?: string | null
          updated_at?: string
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      income: {
        Row: {
          amount_received: number
          client_id: string
          company_id: string
          created_at: string
          id: string
          income_date: string
          payment_platform: string | null
          payment_status: string | null
          pending_amount: number
          project_name: string
          reference_id: string | null
          total_deal_value: number
          updated_at: string
        }
        Insert: {
          amount_received: number
          client_id: string
          company_id: string
          created_at?: string
          id?: string
          income_date: string
          payment_platform?: string | null
          payment_status?: string | null
          pending_amount: number
          project_name: string
          reference_id?: string | null
          total_deal_value: number
          updated_at?: string
        }
        Update: {
          amount_received?: number
          client_id?: string
          company_id?: string
          created_at?: string
          id?: string
          income_date?: string
          payment_platform?: string | null
          payment_status?: string | null
          pending_amount?: number
          project_name?: string
          reference_id?: string | null
          total_deal_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "income_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_outstanding_balances"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "income_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "income_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          company_id: string
          created_at: string
          description: string
          id: string
          invoice_id: string
          line_total: number
          quantity: number
          unit_price: number
        }
        Insert: {
          company_id: string
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          line_total?: number
          quantity?: number
          unit_price?: number
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          line_total?: number
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string
          company_id: string
          created_at: string
          discount: number | null
          grand_total: number | null
          id: string
          invoice_date: string
          invoice_number: string
          linked_quotation_id: string | null
          outstanding_balance: number | null
          payment_date: string | null
          payment_platform: string | null
          payment_status: string | null
          subtotal: number | null
          tax: number | null
          total_payments_received: number | null
          transaction_reference_number: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          company_id: string
          created_at?: string
          discount?: number | null
          grand_total?: number | null
          id?: string
          invoice_date: string
          invoice_number: string
          linked_quotation_id?: string | null
          outstanding_balance?: number | null
          payment_date?: string | null
          payment_platform?: string | null
          payment_status?: string | null
          subtotal?: number | null
          tax?: number | null
          total_payments_received?: number | null
          transaction_reference_number?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          company_id?: string
          created_at?: string
          discount?: number | null
          grand_total?: number | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          linked_quotation_id?: string | null
          outstanding_balance?: number | null
          payment_date?: string | null
          payment_platform?: string | null
          payment_status?: string | null
          subtotal?: number | null
          tax?: number | null
          total_payments_received?: number | null
          transaction_reference_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_outstanding_balances"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_linked_quotation_id_fkey"
            columns: ["linked_quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_withdrawals: {
        Row: {
          amount: number
          company_id: string
          created_at: string
          id: string
          partner_id: string
          reason_notes: string | null
          updated_at: string
          withdrawal_date: string
        }
        Insert: {
          amount: number
          company_id: string
          created_at?: string
          id?: string
          partner_id: string
          reason_notes?: string | null
          updated_at?: string
          withdrawal_date: string
        }
        Update: {
          amount?: number
          company_id?: string
          created_at?: string
          id?: string
          partner_id?: string
          reason_notes?: string | null
          updated_at?: string
          withdrawal_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_withdrawals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_withdrawals_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string
          created_at: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          full_name: string
          id: string
          role: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quotation_items: {
        Row: {
          company_id: string
          created_at: string
          description: string
          id: string
          line_total: number
          quantity: number
          quotation_id: string
          unit_price: number
        }
        Insert: {
          company_id: string
          created_at?: string
          description: string
          id?: string
          line_total?: number
          quantity?: number
          quotation_id: string
          unit_price?: number
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          line_total?: number
          quantity?: number
          quotation_id?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotation_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_items_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          client_contact_details: string | null
          client_gst: string | null
          client_id: string
          company_id: string
          created_at: string
          discount: number | null
          grand_total: number | null
          id: string
          quotation_date: string
          quotation_number: string
          status: string | null
          subtotal: number | null
          tax: number | null
          terms_and_conditions: string | null
          updated_at: string
          validity_date: string | null
        }
        Insert: {
          client_contact_details?: string | null
          client_gst?: string | null
          client_id: string
          company_id: string
          created_at?: string
          discount?: number | null
          grand_total?: number | null
          id?: string
          quotation_date: string
          quotation_number: string
          status?: string | null
          subtotal?: number | null
          tax?: number | null
          terms_and_conditions?: string | null
          updated_at?: string
          validity_date?: string | null
        }
        Update: {
          client_contact_details?: string | null
          client_gst?: string | null
          client_id?: string
          company_id?: string
          created_at?: string
          discount?: number | null
          grand_total?: number | null
          id?: string
          quotation_date?: string
          quotation_number?: string
          status?: string | null
          subtotal?: number | null
          tax?: number | null
          terms_and_conditions?: string | null
          updated_at?: string
          validity_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_outstanding_balances"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "quotations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      client_outstanding_balances: {
        Row: {
          client_id: string | null
          client_name: string | null
          company_id: string | null
          total_outstanding: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_summary: {
        Row: {
          company_id: string | null
          gross_profit: number | null
          month: string | null
          total_expense: number | null
          total_income: number | null
        }
        Relationships: []
      }
      partner_withdrawals_summary: {
        Row: {
          company_id: string | null
          month: string | null
          partner_id: string | null
          total_withdrawn: number | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_withdrawals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_withdrawals_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_auth_company_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

