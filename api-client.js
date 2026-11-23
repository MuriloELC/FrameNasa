import {mapRecords} from './data.js';

const DEFAULT_MAX_BYTES = 2 * 1024 * 1024;

export function buildApiUrl(baseUrl, query = {}, {allowLocalHttp = false} = {}) {
  let url;
  try { url = new URL(baseUrl); } catch { throw Error('Informe uma URL de API válida.'); }
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.protocol !== 'https:' && !(allowLocalHttp && local)) {
    throw Error('A API deve usar HTTPS; HTTP é permitido apenas para desenvolvimento local explícito.');
  }
  if (url.username || url.password) throw Error('Não inclua credenciais na URL.');
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  }
  return url;
}

export function getJsonPath(value, path = '') {
  if (!path) return value;
  return path.split('.').filter(Boolean).reduce((current, part) => {
    if (current === null || current === undefined || !Object.hasOwn(Object(current), part)) {
      throw Error(`Caminho JSON não encontrado: ${path}`);
    }
    return current[part];
  }, value);
}

export function objectSeriesToRows(series, {keyField = 'key', valueField = 'value'} = {}) {
  if (!series || Array.isArray(series) || typeof series !== 'object') {
    throw Error('A série precisa ser um objeto com pares chave/valor.');
  }
  return Object.entries(series).map(([key, value]) => ({[keyField]: key, [valueField]: value}));
}

export function extractApiRecords(payload, {
  recordsPath = '',
  objectSeries = false,
  objectKeyField = 'key',
  objectValueField = 'value',
  fields,
  unit = '',
  missingValues = [],
} = {}) {
  const selected = getJsonPath(payload, recordsPath);
  const rows = objectSeries
    ? objectSeriesToRows(selected, {keyField: objectKeyField, valueField: objectValueField})
    : selected;
  if (!Array.isArray(rows)) throw Error('O caminho configurado não contém uma lista de registros.');
  return mapRecords(rows, fields, {unit, missingValues});
}

export async function fetchJsonApi({
  url,
  query = {},
  headers = {},
  timeoutMs = 10000,
  maxBytes = DEFAULT_MAX_BYTES,
  allowLocalHttp = false,
  fetchImpl = globalThis.fetch,
} = {}) {
  if (typeof fetchImpl !== 'function') throw Error('Fetch não está disponível neste ambiente.');
  if (!Number.isFinite(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000) throw Error('Timeout deve estar entre 1 e 60.000 ms.');
  if (!Number.isFinite(maxBytes) || maxBytes < 1 || maxBytes > 10 * 1024 * 1024) throw Error('Limite deve estar entre 1 byte e 10 MB.');
  const target = buildApiUrl(url, query, {allowLocalHttp});
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(target, {headers, signal: controller.signal});
    if (!response.ok) throw Error(`API respondeu com HTTP ${response.status}.`);
    const declaredSize = Number(response.headers?.get?.('content-length'));
    if (Number.isFinite(declaredSize) && declaredSize > maxBytes) throw Error('Resposta excede o limite configurado.');
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > maxBytes) throw Error('Resposta excede o limite configurado.');
    try { return JSON.parse(new TextDecoder().decode(buffer)); }
    catch { throw Error('A resposta não contém JSON válido.'); }
  } catch (error) {
    if (error?.name === 'AbortError') throw Error('A requisição excedeu o tempo limite.');
    throw error;
  } finally { clearTimeout(timer); }
}
