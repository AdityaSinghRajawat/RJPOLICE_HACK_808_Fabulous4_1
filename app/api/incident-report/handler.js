import { getIncidentReports, postIncidentReport, putIncidentReport, deleteIncidentReport } from '@/api/incident-report/route.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getIncidentReports(req, res);
    case 'POST':
      return await postIncidentReport(req, res);
    case 'PUT':
      return await putIncidentReport(req, res);
    case 'DELETE':
      return await deleteIncidentReport(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
  }
}
