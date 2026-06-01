import { createClient } from '@supabase/supabase-js';

// 🔌 Native Storage Fallback Adapter Logic
const mockStorageEngine = {
  getItem: async (key) => null,
  setItem: async (key, value) => {},
  removeItem: async (key) => {},
};

// ========================================================
// SCHOLARCASH - DATABASE PRODUCTION INITIALIZATION MODULE
// ========================================================

const SUPABASE_URL = 'https://kkpjtyakcccndlbwwxnc.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcGp0eWFrY2NjbmRsYnd3eG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTc2NDUsImV4cCI6MjA5NDg5MzY0NX0.wHcVml0GgTNc7iVOHn8cxUAqVNHinR8eTClHJc03nCs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: mockStorageEngine, // 🎯 Crash rokne ke liye independent memory pool setup
    persistSession: false,      // Signup test karne ke liye session persistence temporary off kiya
    autoRefreshToken: false,
    detectSessionInUrl: false,
  }
});
