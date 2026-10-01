import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  Compass,
  GraduationCap,
  HeartHandshake,
  Network,
  KeyRound,
  MessagesSquare,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

/**
 * Presentation-only icon mapping for platform areas and capability pages.
 * Kept out of src/content so content stays free of presentation concerns.
 */
const ICONS: Record<string, LucideIcon> = {
  'learner-management': GraduationCap,
  'educator-management': Users,
  'academics-curriculum': BookOpen,
  'academics-assessments': BookOpen,
  'assessments-results': ClipboardCheck,
  attendance: CalendarCheck,
  'fees-finance': Wallet,
  finance: Wallet,
  communication: MessagesSquare,
  'school-administration': Building2,
  'performance-analytics': BarChart3,
  analytics: BarChart3,
  reporting: FileText,
  'roles-permissions': KeyRound,
  'ai-intelligence': Sparkles,
  portals: Smartphone,
  // Solution audiences
  schools: Building2,
  'school-leadership': Compass,
  'education-groups': Network,
  funders: HeartHandshake,
};

export function AreaIcon({ id, size = 20 }: { id: string; size?: number }) {
  const Icon = ICONS[id] ?? GraduationCap;
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
