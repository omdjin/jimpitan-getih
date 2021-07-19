import { supabase } from '@/lib/suppabase';
import { cors, runMiddleware } from '@/middlewares/cors';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query.data === 'donatur') {
      const { data, error } = await supabase
        .from('donatur')
        .select(
          'name,age,phone,blood,min_weight,sex,positive_covid,recovered_covid,is_healthy,is_ready_donor,created_at,updated_at'
        )
        .csv();
      if (!error) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('content-disposition', 'attachment; filename=data-donatur.xls');
        return res.send(data);
      } else {
        res.status(201).json({ status: 200, message: error.message });
      }
    } else if (req.query.data === 'request-plasma') {
      const { data, error } = await supabase
        .from('request-plasma')
        .select('name,age,blood,min_weight,sex,hospital_address,phone,created_at,updated_at')
        .csv();
      if (!error) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('content-disposition', 'attachment; filename=data-request-plasma.xls');
        return res.send(data);
      } else {
        res.status(201).json({ status: 200, message: error.message });
      }
    }

    res.status(200).json({ status: 'donlot' });
  } else {
    res.status(400).json({ status: 'Bad Request' });
  }
}
