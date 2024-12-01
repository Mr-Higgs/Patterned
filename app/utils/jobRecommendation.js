import { supabase } from '../../lib/supabase'

export async function getJobRecommendations(userId) {
  // Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileError) {
    console.error('Error fetching user profile:', profileError)
    return []
  }

  // Fetch user availability
  const { data: availability, error: availabilityError } = await supabase
    .from('availability')
    .select('date')
    .eq('user_id', userId)

  if (availabilityError) {
    console.error('Error fetching user availability:', availabilityError)
    return []
  }

  // Fetch jobs based on user's skills, location, and availability
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select('*')
    .contains('required_skills', profile.skills)
    .eq('location', profile.location)
    .in('date', availability.map(a => a.date))
    .gte('pay_rate', profile.minimum_pay_rate || 0)
    .order('created_at', { ascending: false })
    .limit(10)

  if (jobsError) {
    console.error('Error fetching job recommendations:', jobsError)
    return []
  }

  return jobs
}

