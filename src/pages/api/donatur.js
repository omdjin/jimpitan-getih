import { supabase } from '@/lib/suppabase';
import { cors, runMiddleware } from '@/middlewares/cors';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await runMiddleware(req, res, cors);
    // Process a POST request
    let { data: donatur, error } = await supabase.from('donatur').insert([req.body]);

    if (error) {
      res.status(201).json({ status: 500, message: error.message });
    } else {
      res.status(201).json({ status: 201, message: 'Success add data' });
    }
  } else {
    res.status(400).json({ status: 'Bad Request' });
  }
}
