import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cwmqwhihtpctypfyrpxf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQzMDY2NTY4LCJleHAiOjE5NTg2NDI1Njh9.NTrKR2T9aBtMAWk4ddmK_swx9UbAd8pi1A4Cg8515rg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
