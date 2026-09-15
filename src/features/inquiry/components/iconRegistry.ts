/**
 * @fileoverview Explicit icon registry.
 * @description
 *   Importing `* as Icons from 'lucide-react'` pulls in every icon in
 *   the library (~1500 icons, ~600 KB). We only use ~50. This file
 *   imports each one explicitly so tree-shaking keeps the bundle small.
 *
 *   When adding a new intent/domain, add its icon here.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import {
  // Intent icons
  Rocket, Briefcase, Clock, Search, Handshake,
  Sprout, FlaskConical, FileText, Users,
  GraduationCap, MessageCircle, Mic, Podcast,
  PenLine, Coins, Compass, Link2,
  Bug, Lightbulb, HelpCircle, Sparkles,
  // Domain icons
  Server, ShieldCheck, Radio, Database,
  Bot, BrainCircuit, Eye, Atom,
  Sigma, Target, LineChart,
  Container, GitBranch, Cloud,
  Layout, Layers, Gauge,
  Languages, ScanSearch,
  // UI icons
  Circle, Check, X, ArrowLeft, ArrowRight,
  Send, Mail, Copy, RotateCcw, Hash,
  Package, Wallet, User as UserIcon, Building2,
  MessageSquare, Grid3x3, Terminal,
  Pencil, SkipForward, CheckCircle2,
  TrendingUp,
} from 'lucide-react';

/** Component type for a single lucide icon. */
export type IconComponent = React.ComponentType<{
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

/**
 * Icon lookup table. Keyed by the string names stored in the intent and
 * domain registries. If a key is missing, callers should fall back to
 * `Circle`.
 */
export const ICONS: Record<string, IconComponent> = {
  // Intents
  Rocket, Briefcase, Clock, Search, Handshake,
  Sprout, FlaskConical, FileText, Users,
  GraduationCap, MessageCircle, Mic, Podcast,
  PenLine, Coins, Compass, Link2,
  Bug, Lightbulb, HelpCircle, Sparkles,
  // Domains
  Server, ShieldCheck, Radio, Database,
  Bot, BrainCircuit, Eye, Atom,
  Sigma, Target, LineChart,
  Container, GitBranch, Cloud,
  Layout, Layers, Gauge,
  Languages, ScanSearch,
};

/** Safe resolver — always returns a valid component. */
export function resolveIcon(name: string): IconComponent {
  return ICONS[name] ?? Circle;
}

// Re-export individual icons used elsewhere in the feature
export {
  Circle, Check, X, ArrowLeft, ArrowRight,
  Send, Mail, Copy, RotateCcw, Hash,
  Package, Wallet, UserIcon, Building2,
  MessageSquare, Grid3x3, Terminal,
  Pencil, SkipForward, CheckCircle2, TrendingUp,
};
