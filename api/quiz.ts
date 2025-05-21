import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const targetUrl = 'https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json';

  const cleanHeaders: Record<string, string> = {};
  Object.entries(req.headers).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cleanHeaders[key] = value;
    }
  });

  try {
    const apiRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...cleanHeaders,
        host: '', // Remove or override problematic headers
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await apiRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(apiRes.status).json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}
