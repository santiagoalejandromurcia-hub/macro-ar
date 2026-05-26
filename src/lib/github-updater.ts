// ============================================================
// MacroLibre — GitHub Updater
// Actualiza archivos JSON en /public/data/ del repo via GitHub API.
// Vercel detecta el commit y redeploya automáticamente.
// ============================================================

const GITHUB_API = 'https://api.github.com';

interface DataFile {
  updatedAt: string;
  source: string;
  period?: string;
  data: unknown;
}

/**
 * Escribe o actualiza un archivo JSON en public/data/{indicator}.json
 * del repositorio de GitHub. Vercel redeploya automáticamente al detectar el commit.
 */
export async function updateDataFile(
  indicator: string,
  payload: DataFile,
  commitMessage?: string,
): Promise<{ success: boolean; sha?: string; error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo  = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    console.error('[github-updater] Faltan variables de entorno GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO');
    return { success: false, error: 'GitHub env vars not configured' };
  }

  const filePath = `public/data/${indicator}.json`;
  const apiUrl   = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;

  // 1. Obtener SHA actual del archivo (necesario para actualizar)
  let currentSha: string | undefined;
  try {
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (getRes.ok) {
      const current = await getRes.json() as { sha: string };
      currentSha = current.sha;
    }
  } catch {
    // Archivo no existe aún — se crea
  }

  // 2. Codificar contenido en base64
  const jsonString = JSON.stringify(payload, null, 2);
  const content    = Buffer.from(jsonString).toString('base64');
  const message    = commitMessage
    ?? `[auto] ${indicator} — ${new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

  const body: Record<string, unknown> = {
    message,
    content,
    committer: { name: 'MacroLibre Bot', email: 'bot@macrolibre.com' },
  };
  if (currentSha) body.sha = currentSha;

  // 3. PUT al GitHub API
  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    console.error(`[github-updater] Error actualizando ${indicator}:`, err);
    return { success: false, error: err };
  }

  const result = await putRes.json() as { content: { sha: string } };
  console.log(`[github-updater] ✅ ${indicator} actualizado — SHA: ${result.content?.sha}`);
  return { success: true, sha: result.content?.sha };
}
