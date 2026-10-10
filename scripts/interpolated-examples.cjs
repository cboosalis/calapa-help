const texts = [null, require('./interpolated-c1.cjs'), require('./interpolated-c2.cjs'), require('./interpolated-c3.cjs')];
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const paragraphs = text => text.split(/\n\s*\n/).map(p => `<p>${escape(p)}</p>`).join('\n');
function table(caption, headers, rows) {
  return `<div class="evidence-table-wrap" tabindex="0" role="region" aria-label="${escape(caption)}"><table class="source-table"><caption>${escape(caption)}</caption><thead><tr>${headers.map(h => `<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const years = ['Student population', 'Latest reporting year 2024-2025', 'Previous reporting year 2023-2024', 'Earlier reporting year 2022-2023'];
const data = paragraphs('Selected California indicator: Chronic Absenteeism. The attendance figures below are from the LAUSD Whole Child Integrated Data record used in this instructional scenario.') +
  table('Three-year chronic absence percentages', years, [
    ['Schoolwide', '33.78%', '36.39%', '35.91%'],
    ['English learners', '51.09% of 167 (53% NC)', '51.71% of 170 (59% NC)', '47.27% of 162 (56% NC)'],
    ['Socioeconomically disadvantaged', '36.53%', '38.23%', '40.03%'],
    ['Students with disabilities', '40.61%', '45.56%', '48.08%'],
    ['Asian', '20%', '14.29%', '11.54%'],
    ['African American', '42.86% (23 students)', '58.62% (24 students)', '53.85% (25 students)'],
    ['Filipino', '20%', '24.14%', '25.71%'],
    ['Hispanic', '33.66%', '36.79%', '36.78%']
  ]) + table('School Experience Survey: enjoyment of classroom learning', years, [
    ['Schoolwide', '46%', '41%', '37%'], ['English learners', '50%', '53%', '45%']
  ]) + table('School Experience Survey: participation in school extracurricular activities', years, [
    ['Schoolwide', '49%', '46%', '52%'], ['English learners', '37%', '35%', '48%']
  ]) + table('California Dashboard: summative ELPAC and English Learner Progress Indicator', ['Population', 'Latest year 2024', 'Previous year 2023', 'Earlier year 2022'], [
    ['All English learners', '51% advanced one ELPI level; 44.4% stayed at their ELPI level; 4.6% moved down one ELPI level.', '46.7% advanced one ELPI level; 46.2% stayed at their ELPI level; 7.1% moved down one ELPI level.', '45.6% advanced one ELPI level; 41.1% stayed at their ELPI level; 12.8% moved down one ELPI level.']
  ]) + paragraphs('I selected English learners at Riverview High for further investigation of chronic absence. In each of the three reporting years, their rate exceeds the schoolwide rate. This continuing difference makes the group a relevant focus for examining attendance and access to support. This population remains the focus throughout the analysis and the development of the proposed response.');
const qualitative = table('Interview evidence', ['Source', 'Method', 'Findings'], [
  ['ELD teacher', 'Interview', ''], ['Chronically absent EL student', 'Interview', ''], ['PSA counselor', 'Interview', ''], ['ELAC parent', 'Interview', '']
]);
const html = {};
for (const cycle of [1, 2, 3]) {
  html[cycle] = Object.fromEntries(Object.entries(texts[cycle]).map(([id, text]) => [id, paragraphs(text)]));
}
html[1]['A-data'] = data;
html[1]['A-qualitative'] = qualitative;
module.exports = html;
