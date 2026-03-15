'use client';

export default function ArticleContent({ content }: { content: string }) {
  const renderMarkdown = (md: string): string => {
    return md
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-theme-primary mt-8 mb-3">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-theme-primary mt-10 mb-4" style="font-family: Instrument Serif, serif">$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-theme-primary font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .split('\n\n')
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<h2') || trimmed.startsWith('<h3')) return trimmed;
        if (trimmed.startsWith('- ')) {
          const items = trimmed
            .split('\n')
            .filter((l) => l.trim().startsWith('- '))
            .map((l) => `<li class="text-theme-secondary leading-relaxed">${l.trim().slice(2)}</li>`)
            .join('');
          return `<ul class="list-disc list-inside space-y-1.5 my-4 ml-2">${items}</ul>`;
        }
        return `<p class="text-theme-secondary leading-[1.8] mb-4">${trimmed.replace(/\n/g, ' ')}</p>`;
      })
      .join('\n');
  };

  return (
    <article dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
  );
}
