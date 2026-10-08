(() => {
  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const citation = source => `<p class="source-note research-reference">Research connection: <a href="https://research.chrisboosalis.com" target="_blank" rel="noreferrer">Intro to Research course</a>. ${esc(source)}.</p>`;
  const data = window.RESEARCH_CONTENT;
  if (!data) return;
  const lecturePositions={orientation:[2],'gap-app':[0],'c1-investigate':[0,1],'c1-plan':[2,0],'c1-act':[0],'c1-reflect':[0],'c2-investigate':[0],'c2-plan':[1],'c2-act':[2],'c2-reflect':[0],'c3-investigate':[1],'c3-plan':[0],'c3-act':[1],'c3-reflect':[0]};
  const responsePositions={orientation:1,'gap-app':2,'c1-investigate':2,'c1-plan':1,'c1-act':1,'c1-reflect':0,'c2-investigate':0,'c2-plan':1,'c2-act':0,'c2-reflect':1,'c3-investigate':0,'c3-plan':0,'c3-act':1,'c3-reflect':0};
  for (const unit of window.COURSE.units) {
    const lectures = data.lectures.filter(row => row.unit === unit.id);
    for (const [i,row] of lectures.entries()) {
      const target = unit.lecture[lecturePositions[unit.id][i]];
      target.html += `<div class="research-weave"><h3>Connect the evidence to the claim</h3><p>${esc(row.text)}</p>${citation(row.source)}</div>`;
    }
    const row = data.responses.find(row => row.unit === unit.id);
    if (row) {
      const target = unit.walkthrough[responsePositions[unit.id]];
      target.html += `<div class="research-weave"><h3>Research-informed response</h3><p class="evidence-tag">${row.unit==='gap-app'?'Public-data interpretation':'Illustrative teaching response'}</p><div class="model"><p>${esc(row.text)}</p></div><aside class="annotation"><strong>Reasoning to notice</strong><p>${esc(row.reasoning)}</p></aside>${citation(row.source)}</div>`;
    }
  }
})();
