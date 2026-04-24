import { createClient } from "@supabase/supabase-js";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6YW9pa3l6aHVtYmllaWdtbHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDQ2MDQsImV4cCI6MjA5MjE4MDYwNH0.OVlc3DhaeLF_GNlpYritOM1dN0-u2KczeLiNda7mcsw";
const url = "https://fzaoikyzhumbieigmlqi.supabase.co";
export const supabase = createClient(url, token);
