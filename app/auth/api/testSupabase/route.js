import { supabase } from '../../../lib/supabase';

export async function GET(req, res) {
  try {
    // Test connection by querying a table (e.g., "users")
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
