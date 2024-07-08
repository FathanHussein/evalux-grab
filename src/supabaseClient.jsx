import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqplvlvclhtreaikiijg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcGx2bHZjbGh0cmVhaWtpaWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNTg5NDYsImV4cCI6MjAzNTkzNDk0Nn0.OimnQG_NbylUmAQ-RNivK8iw22819qsxRIfo_6OdaLc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
