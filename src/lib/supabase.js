import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iksrhglmazgegzornzdc.supabase.co'
const supabaseKey = 'sb_publishable_ucE1tbfEuXGesVFw6HWBxQ_AG0B74CQ'

export const supabase = createClient(supabaseUrl, supabaseKey)