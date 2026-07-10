export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type DbRecord<T extends object> = T & Record<string, unknown>;

export type TradeDirection = "long" | "short";
export type TradingSession = "asia" | "london" | "new_york" | "overlap" | "other";
export type TradeOutcome = "win" | "loss" | "breakeven" | "open";
export type RuleAdherence = "followed" | "partial" | "broken" | "not_applicable";
export type AttachmentKind = "image" | "tradingview" | "note";

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      profiles: {
        Row: DbRecord<{
          id: string;
          email: string | null;
          full_name: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        }>;
        Insert: DbRecord<{
          id: string;
          email?: string | null;
          full_name?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        }>;
        Update: DbRecord<{
          email?: string | null;
          full_name?: string | null;
          timezone?: string;
          updated_at?: string;
        }>;
        Relationships: [];
      };
      trades: {
        Row: DbRecord<{
          id: string;
          user_id: string;
          pair: string;
          direction: TradeDirection;
          entry_price: number;
          exit_price: number | null;
          stop_loss: number | null;
          take_profit: number | null;
          lot_size: number;
          risk_amount: number;
          profit_loss: number | null;
          r_multiple: number | null;
          outcome: TradeOutcome;
          session: TradingSession;
          timeframe: string;
          strategy: string;
          setup: string | null;
          notes: string | null;
          opened_at: string;
          closed_at: string | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: DbRecord<{
          id?: string;
          user_id: string;
          pair: string;
          direction: TradeDirection;
          entry_price: number;
          exit_price?: number | null;
          stop_loss?: number | null;
          take_profit?: number | null;
          lot_size: number;
          risk_amount: number;
          profit_loss?: number | null;
          r_multiple?: number | null;
          outcome?: TradeOutcome;
          session: TradingSession;
          timeframe: string;
          strategy: string;
          setup?: string | null;
          notes?: string | null;
          opened_at: string;
          closed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        }>;
        Update: DbRecord<Partial<Database["public"]["Tables"]["trades"]["Insert"]>>;
        Relationships: [];
      };
      trade_behaviors: {
        Row: DbRecord<{
          id: string;
          user_id: string;
          trade_id: string;
          emotion: string | null;
          confidence: number | null;
          rule_adherence: RuleAdherence;
          mistake_tags: string[];
          execution_rating: number | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: DbRecord<{
          id?: string;
          user_id: string;
          trade_id: string;
          emotion?: string | null;
          confidence?: number | null;
          rule_adherence?: RuleAdherence;
          mistake_tags?: string[];
          execution_rating?: number | null;
          created_at?: string;
          updated_at?: string;
        }>;
        Update: DbRecord<
          Partial<Database["public"]["Tables"]["trade_behaviors"]["Insert"]>
        >;
        Relationships: [];
      };
      trade_attachments: {
        Row: DbRecord<{
          id: string;
          user_id: string;
          trade_id: string;
          kind: AttachmentKind;
          storage_path: string | null;
          url: string | null;
          caption: string | null;
          created_at: string;
        }>;
        Insert: DbRecord<{
          id?: string;
          user_id: string;
          trade_id: string;
          kind: AttachmentKind;
          storage_path?: string | null;
          url?: string | null;
          caption?: string | null;
          created_at?: string;
        }>;
        Update: DbRecord<
          Partial<Database["public"]["Tables"]["trade_attachments"]["Insert"]>
        >;
        Relationships: [];
      };
      ai_trade_reviews: {
        Row: DbRecord<{
          id: string;
          user_id: string;
          trade_id: string;
          summary: string;
          structured_output: Json;
          model: string;
          prompt_version: string;
          disclaimer: string;
          created_at: string;
        }>;
        Insert: DbRecord<{
          id?: string;
          user_id: string;
          trade_id: string;
          summary: string;
          structured_output: Json;
          model: string;
          prompt_version: string;
          disclaimer: string;
          created_at?: string;
        }>;
        Update: DbRecord<
          Partial<Database["public"]["Tables"]["ai_trade_reviews"]["Insert"]>
        >;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type TradeRow = Database["public"]["Tables"]["trades"]["Row"];
export type TradeInsert = Database["public"]["Tables"]["trades"]["Insert"];
export type TradeUpdate = Database["public"]["Tables"]["trades"]["Update"];
export type TradeBehaviorRow =
  Database["public"]["Tables"]["trade_behaviors"]["Row"];
export type TradeAttachmentRow =
  Database["public"]["Tables"]["trade_attachments"]["Row"];
export type AiTradeReviewRow =
  Database["public"]["Tables"]["ai_trade_reviews"]["Row"];

export type TradeWithRelations = TradeRow & {
  behavior: TradeBehaviorRow | null;
  attachments: TradeAttachmentRow[];
  aiReviews: AiTradeReviewRow[];
};
