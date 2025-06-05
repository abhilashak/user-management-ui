export const generateRandomUserData = () => {
  const names = [
    'Alex Johnson',
    'Taylor Smith',
    'Jordan Brown',
    'Casey Williams',
    'Morgan Davis',
    'Avery Chen',
    'Riley Patel',
    'Sam Rodriguez',
    'Quinn O\'Connor',
    'Jamie Kim'
  ]
  
  const biographies = [
    'A passionate software developer with expertise in full-stack development.',
    'Creative UI/UX designer focused on creating intuitive user experiences.',
    'Data scientist specializing in machine learning and analytics.',
    'DevOps engineer with experience in cloud infrastructure and automation.',
    'Product manager with a background in agile development methodologies.'
  ]
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    biography: biographies[Math.floor(Math.random() * biographies.length)]
  }
} 