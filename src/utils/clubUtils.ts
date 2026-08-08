export const CLUB_SYNONYMS: Record<string, string[]> = {
  'casr-coding-club': ['coding', 'code', 'programmer', 'casr coding'],
  'casr-take-one-movie-club': ['movie', 'take one', 'film', 'cinema'],
  'casr-frontliners': ['frontliner', 'frontliners', 'safety', 'emergency'],
  'casr-content-creators': ['content', 'creator', 'creators', 'vlog'],
  'agrifora-students-society': ['agrifora', 'agriculture', 'botanical'],
  'eco-sankalp': ['eco', 'sankalp', 'environment', 'green'],
  'casr-groovers-dance-club': ['dance', 'groover', 'groovers', 'choreography'],
  'casr-brushers-painting-club': ['paint', 'painting', 'brusher', 'brushers', 'art'],
  'casr-zyra-fashion-club': ['fashion', 'zyra', 'runway', 'apparel'],
  'casr-language': ['language', 'polyglot', 'foreign'],
  'casr-harmony-music-club': ['music', 'harmony', 'vocal', 'acoustic', 'band'],
  'casr-snapshot-photography-club': ['photo', 'photography', 'snapshot', 'camera'],
  'casr-animal-allies': ['animal', 'allies', 'rescue', 'shelter'],
  'casr-health-club': ['health', 'wellness', 'medical', 'fitness'],
  'casr-curtain-hall-drama-club': ['drama', 'curtain', 'theater', 'acting', 'nukkad'],
  'casr-science-technology-club': ['science', 'tech', 'technology', 'research'],
  'casr-chandrabhanga-creators': ['chandrabhanga', 'creators', 'magazine', 'poetry'],
  'casr-page-turners': ['page', 'turners', 'literature', 'book', 'reading'],
  'casr-robotics-club': ['robotics', 'robot', 'ros', 'bot'],
  'casr-hackton': ['hackton', 'hackathon', 'sprint'],
  'csar-take-one-movie-club': ['movie', 'take one', 'film', 'cinema'],
  'csar-frontliners': ['frontliner', 'frontliners', 'safety', 'emergency'],
  'csar-content-creators': ['content', 'creator', 'creators', 'vlog'],
  'csar-groovers-dance-club': ['dance', 'groover', 'groovers', 'choreography'],
  'csar-brushers-painting-club': ['paint', 'painting', 'brusher', 'brushers', 'art'],
  'csar-zyra-fashion-club': ['fashion', 'zyra', 'runway', 'apparel'],
  'csar-language': ['language', 'polyglot', 'foreign'],
  'csar-harmony-music-club': ['music', 'harmony', 'vocal', 'acoustic', 'band'],
  'csar-snapshot-photography-club': ['photo', 'photography', 'snapshot', 'camera'],
  'csar-animal-allies': ['animal', 'allies', 'rescue', 'shelter'],
  'csar-health-club': ['health', 'wellness', 'medical', 'fitness'],
  'csar-curtain-hall-drama-club': ['drama', 'curtain', 'theater', 'acting', 'nukkad'],
  'csar-science-technology-club': ['science', 'tech', 'technology', 'research'],
  'csar-chandrabhanga-creators': ['chandrabhanga', 'creators', 'magazine', 'poetry'],
  'csar-page-turners': ['page', 'turners', 'literature', 'book', 'reading'],
  'csar-robotics-club': ['robotics', 'robot', 'ros', 'bot'],
  'csar-hackton': ['hackton', 'hackathon', 'sprint'],
  'nss': ['nss', 'national service scheme', 'welfare'],
  'ncc': ['ncc', 'national cadet corps', 'parade', 'drill'],
  'yasr-club': ['yasr', 'youth aid', 'red cross'],
  'drone-club': ['drone', 'uav', 'fpv', 'quadcopter']
};

export function matchStudentToClub(student: any, clubId: string, clubName: string): boolean {
  if (!student) return false;
  const aliases = CLUB_SYNONYMS[clubId] || [];
  const nameClean = (clubName || '').replace(/^[^\w\s]+\s*/, '').toLowerCase().trim();
  const words = nameClean.split(/\s+/).filter(w => !['csar', 'casr', 'club', 'society', 'students', 'the'].includes(w));
  const allSearchTerms = Array.from(new Set([...aliases, ...words])).filter(w => w.length >= 2);

  const pClub = (student.clubName || '').toLowerCase();
  const secondary = Array.isArray(student.allClubs) ? student.allClubs.map((c: any) => (c || '').toLowerCase()).join(' ') : '';
  const historyList = Array.isArray(student.recentHistory) ? student.recentHistory.map((h: any) => (h?.clubName || '').toLowerCase()).join(' ') : '';
  const combined = `${pClub} ${secondary} ${historyList}`;

  return allSearchTerms.some(term => combined.includes(term));
}
