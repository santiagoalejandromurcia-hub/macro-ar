import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { OG_LOGO_DATA_URL } from '@/lib/ogLogo';

// OG Image global (home y rutas sin imagen propia). Paleta: azul #0099FF/#0070C2,
// fondo #FDFDFE, acento #E73F25 / #D63A21, titular en Anton.

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Macro Libre: no son solo números';

export default async function Image() {
  let anton: ArrayBuffer | null = null;
  try {
    const buf = await readFile(join(process.cwd(), 'src/app/fonts/Anton-Regular.ttf'));
    anton = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    anton = null;
  }
  const display = anton ? 'Anton' : 'sans-serif';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          background: 'linear-gradient(180deg, #0070C2 0%, #0099FF 45%, #9AD6FF 80%, #FDFDFE 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={OG_LOGO_DATA_URL} width={56} height={56} alt="" style={{ borderRadius: 12 }} />
          <span style={{ color: '#FFFFFF', fontSize: 30, fontWeight: 700 }}>Macro Libre</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: display, color: '#FFFFFF', fontSize: 112, lineHeight: 1.02, textTransform: 'uppercase', letterSpacing: 1 }}>
            Macro Libre:
          </span>
          <span style={{ fontFamily: display, color: '#FFFFFF', fontSize: 112, lineHeight: 1.02, textTransform: 'uppercase', letterSpacing: 1 }}>
            no son solo números
          </span>
          <div style={{ display: 'flex', marginTop: 24, width: 160, height: 10, borderRadius: 5, background: '#E73F25' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ display: 'flex', background: '#D63A21', color: '#FFFFFF', fontSize: 24, fontWeight: 700, padding: '12px 24px', borderRadius: 12 }}>
            macrolibre.com
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: anton ? [{ name: 'Anton', data: anton, style: 'normal', weight: 400 }] : [] },
  );
}
