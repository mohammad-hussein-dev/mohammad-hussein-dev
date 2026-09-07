import React from 'react';

/**
 * Robust ANSI escape sequence parser that converts terminal colored text
 * to React components with support for real-time search term highlighting.
 */

const ANSI_COLOR_MAP: Record<string, string> = {
  // Regular Foreground
  '30': 'text-slate-900 dark:text-slate-800',
  '31': 'text-red-400',
  '32': 'text-emerald-400',
  '33': 'text-amber-300',
  '34': 'text-sky-400',
  '35': 'text-purple-400',
  '36': 'text-cyan-300',
  '37': 'text-slate-200',
  '90': 'text-slate-500',
  '91': 'text-red-300',
  '92': 'text-emerald-300',
  '93': 'text-amber-200',
  '94': 'text-sky-300',
  '95': 'text-purple-300',
  '96': 'text-cyan-200',
  '97': 'text-white',

  // Bold Foreground (1;XX)
  '1;30': 'text-slate-600 font-bold',
  '1;31': 'text-red-400 font-bold drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]',
  '1;32': 'text-emerald-300 font-bold drop-shadow-[0_0_8px_rgba(110,231,183,0.3)]',
  '1;33': 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(252,211,77,0.3)]',
  '1;34': 'text-sky-300 font-bold drop-shadow-[0_0_8px_rgba(125,211,252,0.3)]',
  '1;35': 'text-purple-300 font-bold drop-shadow-[0_0_8px_rgba(216,180,254,0.3)]',
  '1;36': 'text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(103,232,249,0.35)]',
  '1;37': 'text-white font-bold',
};

interface StyledSegment {
  text: string;
  className: string;
}

export function parseAnsiToSegments(rawText: string): StyledSegment[] {
  if (!rawText) return [];

  const segments: StyledSegment[] = [];
  // Regex to match ANSI escape codes e.g. \x1b[1;36m or \u001b[0m
  const ansiRegex = /(?:\u001b|\x1b)\[([0-9;]*)m/g;

  let currentClass = 'text-slate-200';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = ansiRegex.exec(rawText)) !== null) {
    const textBefore = rawText.slice(lastIndex, match.index);
    if (textBefore) {
      segments.push({ text: textBefore, className: currentClass });
    }

    const code = match[1] || '0';
    if (code === '0' || code === '') {
      currentClass = 'text-slate-200';
    } else if (ANSI_COLOR_MAP[code]) {
      currentClass = ANSI_COLOR_MAP[code];
    } else if (code === '1') {
      currentClass += ' font-bold';
    } else if (code === '4') {
      currentClass += ' underline';
    }

    lastIndex = ansiRegex.lastIndex;
  }

  const remaining = rawText.slice(lastIndex);
  if (remaining) {
    segments.push({ text: remaining, className: currentClass });
  }

  return segments;
}

/**
 * Strip ANSI escape codes to get clean plain text for searching / copying
 */
export function stripAnsi(text: string): string {
  if (!text) return '';
  return text.replace(/(?:\u001b|\x1b)\[[0-9;]*m/g, '');
}

/**
 * Render parsed ANSI segment with optional highlight for search queries
 */
export function renderAnsiWithHighlight(
  rawText: string,
  searchQuery: string = '',
  keyPrefix: string = ''
): React.ReactNode[] {
  const segments = parseAnsiToSegments(rawText);
  const cleanSearch = searchQuery.trim().toLowerCase();

  return segments.map((seg, segIdx) => {
    const key = `${keyPrefix}-seg-${segIdx}`;

    if (!cleanSearch) {
      return (
        <span key={key} className={seg.className}>
          {seg.text}
        </span>
      );
    }

    // Highlight search match in this segment
    const lowerText = seg.text.toLowerCase();
    if (!lowerText.includes(cleanSearch)) {
      return (
        <span key={key} className={seg.className}>
          {seg.text}
        </span>
      );
    }

    const parts: React.ReactNode[] = [];
    let start = 0;
    let matchIndex = lowerText.indexOf(cleanSearch, start);

    while (matchIndex !== -1) {
      if (matchIndex > start) {
        parts.push(
          <span key={`${key}-p-${start}`}>
            {seg.text.slice(start, matchIndex)}
          </span>
        );
      }
      parts.push(
        <mark
          key={`${key}-m-${matchIndex}`}
          className="bg-amber-400/30 text-amber-200 border-b border-amber-400 font-semibold px-0.5 rounded-xs"
        >
          {seg.text.slice(matchIndex, matchIndex + cleanSearch.length)}
        </mark>
      );
      start = matchIndex + cleanSearch.length;
      matchIndex = lowerText.indexOf(cleanSearch, start);
    }

    if (start < seg.text.length) {
      parts.push(
        <span key={`${key}-p-end`}>{seg.text.slice(start)}</span>
      );
    }

    return (
      <span key={key} className={seg.className}>
        {parts}
      </span>
    );
  });
}
