import portfolioData from '../../shared/portfolioData.json' with { type: 'json' };

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const project = portfolioData.projects.find((item) => item.id === req.query.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  return res.status(200).json(project);
}
