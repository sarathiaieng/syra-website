// Supabase Configuration
const SUPABASE_URL = 'https://bhticeredjosyvhlzkds.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodGljZXJlZGpvc3l2aGx6a2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA4MDMsImV4cCI6MjA4NjgyNjgwM30.yZxYtNTrxKxCkbeJMF80XBnkXwdX_CQ0nw6ZklmFt9A';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = _supabase;
