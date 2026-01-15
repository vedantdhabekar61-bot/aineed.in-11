import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://moknjjmwnuniuemxcoqz.supabase.co';
const supabaseKey = 'sb_publishable_lH2Snm34ZqqGHhBtNAHHwQ_3y-nY_Md';

export const supabase = createClient(supabaseUrl, supabaseKey);
