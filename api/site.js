// Vercel Serverless Backend API (/api/site)
let memoryStore = { brandName: "Farm House Bradford Restaurant", status: "active", updatedAt: new Date().toISOString() };

export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json(memoryStore);
  if (req.method === 'POST') {
    memoryStore = { ...memoryStore, ...req.body, updatedAt: new Date().toISOString() };
    return res.status(200).json({ success: true, data: memoryStore });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
