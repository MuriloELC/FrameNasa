/** Renderiza valores finitos, inclusive negativos, sem depender de bibliotecas. */
export function renderBarChart(container, records) {
  container.replaceChildren();
  container.className = 'data-chart';
  if (!records.length) {
    container.textContent = 'Nenhum dado para visualizar.';
    return;
  }
  const units = new Set(records.map(record => record.unit));
  if (units.size > 1) {
    container.textContent = 'Unidades diferentes: consulte a tabela ou filtre uma única unidade antes de comparar.';
    return;
  }
  const scale = Math.max(...records.map(record => Math.abs(record.value)), 1);
  for (const record of records.slice(0, 50)) {
    const row = document.createElement('div');
    row.className = 'data-chart-row';
    const label = document.createElement('span');
    label.textContent = record.label;
    const track = document.createElement('div');
    track.className = 'data-chart-track';
    track.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('div');
    fill.className = record.value < 0 ? 'data-chart-fill negative' : 'data-chart-fill';
    fill.style.width = `${Math.abs(record.value) / scale * 100}%`;
    track.append(fill);
    const value = document.createElement('span');
    value.textContent = `${record.value} ${record.unit}`;
    row.append(label, track, value);
    container.append(row);
  }
  if (records.length > 50) {
    const note = document.createElement('p');
    note.textContent = 'Exibindo os primeiros 50 registros. A tabela contém todos os resultados.';
    container.append(note);
  }
}
