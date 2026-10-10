(() => {
  'use strict';
  const D = window.GUIDE_CONTENT;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const p = text => `<p>${text}</p>`;
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const list = items => `<ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const table = (heads, rows) => `<div class="table-scroll" tabindex="0" role="region" aria-label="${esc(heads.join(', '))}"><table><thead><tr>${heads.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const link = (cycle, page, label) => `<a href="sources/CalAPA_C${cycle}_AssessmentGuide.pdf#page=${page}" target="_blank" rel="noreferrer">${esc(label || `Cycle ${cycle} guide, PDF p. ${page}`)}${icon('external-link')}</a>`;
  const stepEntries = cycle => Object.entries(D.steps).filter(([id])=>id.startsWith(cycle));
  const source = (cycle, pages) => `<p class="source-note">Cycle ${cycle} assessment guide, Version 09. Source: ${pages.map(page=>link(cycle,page,`PDF p. ${page} (printed p. ${page-4})`)).join('; ')}. Guidance and examples are instructional interpretations.</p>`;
  const roadmap = (cycle, active) => `<nav class="step-roadmap" aria-label="Cycle ${D.cycles[cycle].number} steps">${stepEntries(cycle).map(([id,s])=>`<a href="#unit/${id}/lecture" ${id===active?'aria-current="step"':''}><span class="step-number">${s.step}</span><span>${s.name}<small>Part${s.parts.length>1?'s':''} ${s.parts.join(', ')}</small></span></a>`).join('')}</nav>`;
  function evidence(cycle, sets, parts) {
    const rows = sets[D.cycles[cycle].number].filter(([part])=>!parts || parts.includes(part));
    return table(['Part','Evidence to submit','Maximum or important constraint'],rows.map(([part,name,file,note])=>[
      `<strong>${esc(part)}</strong>`,file?`<a href="sources/${file}" download>${esc(name)}</a>`:esc(name),esc(note)
    ]));
  }
  function rubricDiscussion(ids) {
    const checks = {
      '1.1': 'Does my analysis cover three years of quantitative data and justify the student group I selected?',
      '1.2': 'Do my qualitative sources clarify the selected group\'s experiences, and have I explained their limits?',
      '1.3': 'How do the quantitative and qualitative findings explain the gap between school commitments and the group\'s outcomes?',
      '1.4': 'Which evidence supports each contributing factor, and what explanations still need investigation?',
      '1.5': 'Does my problem statement follow from the gap and contributing factors, and can the school feasibly address it?',
      '1.6': 'How does each proposed strategy address an identified factor and align with school goals?',
      '1.7': 'What changed after leadership feedback, and how will I build participation and address realistic implementation concerns?',
      '1.8': 'Which decisions and evidence show what I learned about equity leadership and what I will practice next?',
      '2.1': 'How does the existing professional learning context support or limit student learning and well-being?',
      '2.2': 'Why do the data and school goals support this focus, and how do membership and relationships support inclusive learning?',
      '2.3': 'Where do the planning records show colleagues interpreting evidence and jointly defining a changeable practice?',
      '2.4': 'How did the group jointly select its strategy, and what evidence and research support the expected impact?',
      '2.5': 'Which recorded facilitation moves supported differing viewpoints, shared decisions, and learning, and why?',
      '2.6': 'Do the minutes and clips show the group interpreting initial results and jointly choosing next steps?',
      '2.7': 'How do initial results and member feedback inform my strengths, growth needs, and next steps as a facilitator?',
      '3.1': 'How do school coaching practices and the volunteer teacher\'s experience shape this coaching plan?',
      '3.2': 'Where do the pre-meeting and commentary show listening, shared CSTP focus, and jointly agreed observation evidence?',
      '3.3': 'Do my observation notes connect specific classroom events to the agreed CSTP elements and lesson goals?',
      '3.4': 'Where did the teacher and I jointly interpret lesson video and student work to identify strengths and growth?',
      '3.5': 'Did the teacher help decide next steps, resources, and coaching support, and what evidence informed them?',
      '3.6': 'How do teacher feedback and cycle evidence inform my understanding of my coaching and the partnership?',
      '3.7': 'What does this cycle reveal about my role in supporting equitable teacher growth and my own future learning?'
    };
    return `<section class="rubric-discussion"><h2>Read the rubrics as evidence questions</h2><p>Locate the essential question, the source of evidence, and the full performance descriptors. The discussions below explain the focus; they do not reproduce the complete scoring rules or assign a score.</p>${ids.map(id=>{
      const [page,title,look,miss]=D.rubrics[id];
      const step=Object.entries(D.steps).find(([,s])=>s.rubrics.includes(id))[0];
      return `<details id="rubric-${id.replace('.','-')}"><summary>Rubric ${id}: ${esc(title)}</summary><p><strong>What to examine:</strong> ${esc(look)}</p><p><strong>A weakness to notice:</strong> ${esc(miss)}</p><p><strong>Self-check:</strong> ${esc(checks[id])}</p><p>${link(id[0],page,`Read all five levels of Rubric ${id}`)} &middot; <a href="#unit/${step}/walkthrough">Study the related annotated example</a></p></details>`;
    }).join('')}<p class="source-note">These are teaching interpretations of the named Version 09 rubrics. A completed checklist, fluent writing, or a matching phrase does not establish a rubric score.</p></section>`;
  }
  function orientationChecks() {
    return `<section id="understanding-check"><h2>Check your understanding before starting</h2><p>Explain your answer before opening the discussion. These are study questions, not assessment items.</p>${[
      ['Is a Cycle 1 improvement proposal enough for Cycle 2?', 'No. Cycle 2 requires a community of practice to implement a jointly selected strategy and examine initial results. A prior equity inquiry may inform its focus, but cannot replace this work.'],
      ['Does Act mean the same activity in all three cycles?', 'No. The step names repeat, but the work differs. Cycle 1 develops strategies and obtains feedback. Cycle 2 implements and studies a strategy with a group. Cycle 3 observes instruction and conducts an evidence-based coaching conversation.'],
      ['Does Cycle 3 submit the classroom lesson video as its meeting clips?', 'No. The lesson is recorded and used in the post-observation conversation. Part D submits pre-observation meeting clips; Part H submits post-observation meeting clips.'],
      ['Does using numbers and interviews automatically make my work a formal mixed methods research study?', 'No. CalAPA requires particular forms of leadership inquiry and evidence. Research methods can improve your reasoning, but do not add a thesis design, statistical test, or separate research project to the assessment.'],
      ['Do all cycles have to investigate the identical problem?', 'No. The Cycle 2 guide permits a focus informed by Cycle 1 or one already identified by colleagues. The guide\'s connected teaching case illustrates one possible relationship. In Cycle 3, the teacher\'s context and jointly chosen CSTP focus govern the coaching inquiry.']
    ].map(([q,a])=>`<details><summary>${esc(q)}</summary>${p(esc(a))}</details>`).join('')}</section>`;
  }
  function home() {
    return `${window.NOVICE_OVERVIEW.home()}<article class="reading guide-reading">${window.LEARNING_SUPPORT.cases()}</article>${thread(true)}`;
  }
  function cycle(id, sets) {
    const revised=window.REVISED_CYCLES?.[id];
    const anchor=location.hash.split('/')[2];
    if(revised && (!anchor || revised.anchors.includes(anchor))) return revised.html;
    const fullPage={c1:window.CYCLE1_PAGE,c2:window.CYCLE2_PAGE,c3:window.CYCLE3_PAGE}[id];
    if(fullPage) return fullPage.html;
    const c=D.cycles[id]; if(!c) return home();
    return `<nav class="crumb" aria-label="Breadcrumb"><a href="#home">Overview</a><span>/</span><span>Cycle ${c.number}</span></nav><header class="guide-heading"><p class="kicker">Cycle ${c.number} in one minute</p><h1>${esc(c.title)}</h1><p class="deck">${esc(c.purpose)}</p><p>${esc(c.minute)}</p></header>${roadmap(id)}<article class="reading guide-reading">${window.NOVICE_OVERVIEW.glance(id)}<section><h2>What you are demonstrating</h2><p class="lead-question">${esc(c.question)}</p><p><strong>What you produce:</strong> ${esc(c.output)}</p><p><strong>Plan early:</strong> ${esc(c.advance)}</p><p class="watch-note"><strong>Keep this distinction:</strong> ${esc(c.distinction)}</p>${source(c.number,[5,...c.evidencePages])}</section>
    <section><h2>Follow the work through all four steps</h2><div class="step-summaries">${stepEntries(id).map(([key,s])=>`<section><p class="kicker">Step ${s.step} &middot; Part${s.parts.length>1?'s':''} ${s.parts.join(', ')}</p><h3><a href="#unit/${key}/lecture">${s.name}</a></h3><p>${esc(s.requirement)}</p><p><a href="#unit/${key}/walkthrough">Study the existing annotated example ${icon('arrow-right')}</a></p></section>`).join('')}</div></section>
    <section id="cycle-evidence"><h2>Your evidence map</h2><p>Limits are maxima, not writing targets. Narrative templates count toward page limits; Cycle 1 Part A excludes the quantitative and qualitative data tables as specified. Read the complete specifications for formats and other conditions.</p>${evidence(id,sets)}${source(c.number,c.specificationPages)}<p><a href="#readiness">Check recording, authorship, formatting, and uploads</a>.</p></section>
    ${rubricDiscussion(stepEntries(id).flatMap(([,s])=>s.rubrics))}<section class="common-thread-note"><h2>A Common Thread</h2><p>${esc(c.thread)}</p><a href="#home/common-thread">Compare what carries forward and what needs new evidence ${icon('arrow-right')}</a></section><section><h2>Continue with the teaching case</h2><p><a href="#connections/${id}">Read the extended Cycle ${c.number} narrative</a> &middot; <a href="#gap/${id}">Equity Gap connections</a> &middot; <a href="#literature/${id}">Research and its limits</a></p></section></article>`;
  }
  function stepLead(unit, sets) {
    const s=D.steps[unit.id]; if(!s) return '';
    return `${roadmap(unit.area,unit.id)}<section class="requirement-summary"><p class="kicker">Requirement summary &middot; Step ${s.step}: ${s.name}</p><h2>The task and the evidence</h2><p>${esc(s.requirement)}</p><p><strong>Why it matters:</strong> ${esc(s.why)}</p>${evidence(unit.area,sets,s.parts)}<p><strong>Your next action:</strong> ${esc(s.action)}</p><p class="watch-note"><strong>Watch out:</strong> ${esc(s.watch)}</p>${source(unit.guide[0],s.pages)}</section>`;
  }
  function stepEnd(unit) {
    const s=D.steps[unit.id]; if(!s) return '';
    return `${rubricDiscussion(s.rubrics)}<section class="common-thread-note"><h2>What carries forward</h2><p>${esc(s.next)}</p><p><a href="#home/common-thread">See the Common Thread on the Overview</a> &middot; <a href="#cycle/${unit.area}">Return to the cycle map</a></p></section>`;
  }
  function thread(embedded=false) {
    const opening=embedded
      ? `<article class="reading guide-reading" id="common-thread"><header class="guide-heading"><p class="kicker">Across all three cycles</p><h2>A Common Thread</h2><p class="deck">Keep the purpose coherent while allowing the inquiry to change. Equity, evidence, shared decisions, and reflection connect the work.</p></header>`
      : `<header class="guide-heading"><p class="kicker">Across all three cycles</p><h1>A Common Thread</h1><p class="deck">Keep the purpose coherent while allowing the inquiry to change. Equity, evidence, shared decisions, and reflection connect the work.</p></header><article class="reading guide-reading">`;
    return `${opening}<p>A connected story should emerge from authentic work. It should not require colleagues or a teacher to endorse a problem you selected in advance. Cycle 2 explicitly allows a focus informed by Cycle 1 or an existing concern identified by colleagues.</p>${source(2,[5,12])}
    <div class="thread-path" aria-label="One possible instructional connection"><section><p class="kicker">Cycle 1 &middot; school inquiry</p><h2>From a disparity to a justified proposal</h2><p>In the primary Cedar Grove case, fictional attendance patterns lead to investigation of support access for students with disabilities. School commitments, local evidence, research, and leadership feedback shape the proposal.</p></section><section><p class="kicker">Cycle 2 &middot; group inquiry</p><h2>From a concern to shared practice</h2><p>In the primary Canyon View case, four colleagues, facilitated by the candidate as instructional coach, examine a 24-student Grade 9 writing sample and jointly choose a Model-Practice-Reflect routine. Its implementation evidence, differing interpretations, and decisions become the focus.</p></section><section><p class="kicker">Cycle 3 &middot; coaching inquiry</p><h2>From shared learning to a teacher partnership</h2><p>In the primary Canyon View coaching case, Chen voluntarily examines assessment in a separate class of 28. Teacher self-assessment and a jointly selected CSTP focus shape the observation and coaching. Lesson evidence determines the conversation.</p></section></div>
    <p class="fiction">These primary cases illustrate a connection in leadership reasoning, not one school project or population. The <a href="#connections/c1">Additional Harbor High example</a> separately develops a graduation-to-feedback story using public Jordan High context and invented Harbor evidence.</p>
    <section><h2>Carry the reasoning, check the evidence again</h2>${table(['Connection','What can carry forward','What must be established for this inquiry'],[
      ['Cycle 1 to Cycle 2','A concern, contextual knowledge, attention to access, questions raised by evidence.','Current professional-learning context, group membership, collaborative problem and strategy selection, actual implementation.'],
      ['Cycle 2 to Cycle 3','Experience listening, examining work, handling differing interpretations, and supporting professional learning.','Volunteer teacher context, self-assessment, shared CSTP focus, lesson and work evidence, authentic coaching.'],
      ['Across every cycle','Source awareness, respect for perspectives, a willingness to revise, and specific professional learning goals.','The evidence required for that cycle\'s tasks and rubrics. A previous narrative cannot substitute for new actions.']
    ])}</section><section><h2>When the focus changes</h2><p>Suppose the Cycle 1 inquiry concerns attendance, but the existing community of practice is studying mathematical reasoning. Explain the relevant data and school goals for the community\'s focus. The continuity can lie in your leadership practices: testing assumptions, including different perspectives, and using evidence to revise decisions.</p><p>In Cycle 3, let the teacher\'s experience, students, and jointly selected focus guide the coaching. A tidy storyline is not a reason to force the teacher toward your earlier topic.</p></section>
    <section><h2>Notice the changing scale of the evidence</h2><p>Annual school outcomes describe a broad pattern. Community implementation records describe what a group tried over several weeks. A lesson video and student work reveal particular classroom interactions. These are different populations, periods, and purposes. Their connection needs explanation; one does not automatically prove the effect of another.</p></section><section><h2>Four questions at each transition</h2>${list(['What do I know, and which evidence supports it?','What remains uncertain or needs new evidence?','Who must help interpret the evidence and make this decision?','What have I learned about my leadership that I will practice next?'])}</section>${orientationChecks()}<p><a href="#cycle/c1">Cycle 1</a> &middot; <a href="#cycle/c2">Cycle 2</a> &middot; <a href="#cycle/c3">Cycle 3</a></p></article>`;
  }
  function readiness() {
    return `<p class="kicker">Across all cycles</p><h1>Prepare evidence for submission</h1><p class="deck">Plan the fieldwork early. Review the complete official specifications before uploading. These preparation notes do not certify that a submission will be scored or pass.</p><article class="reading guide-reading"><section><h2>Keep the evidence and its explanation together</h2><p>Use the correct cycle, part, and template. Check every prompt and subprompt against your own records. Narrative templates use Arial 11-point type, single spacing, and one-inch margins as specified. Do not remove original template text or alter its formatting to create space. Required uploads cannot be replaced by hyperlinks.</p><p>Document uploads generally accept DOCX, ODT, and PDF. Video formats and part-specific exceptions appear in the specifications; Cycle 3 Part G can include a video work product. Retain local copies and inspect the uploaded files before submitting.</p>${source(1,[26,27,28,29])}${source(2,[32,33,34,35,36])}${source(3,[30,31,32,33,34,35])}</section>
    <section><h2>Plan recording before the meeting</h2>${table(['Evidence','What to plan','Submitted limits'],[
      ['Cycle 2 implementation meetings','At least three implementation meetings; candidate and at least three partners seen and heard. Planning meeting is separate.','Part H: exactly 3 clips, up to 5 minutes each.'],
      ['Cycle 3 pre-observation','Candidate and volunteer teacher seen and heard; shared focus and observation plan.','Part D: exactly 2 clips, up to 6 minutes each.'],
      ['Cycle 3 observation','Observe live (synchronously) for at least 20 minutes; record the full observation; use the lesson video in coaching.','Lesson recording itself is not the submitted meeting clips.'],
      ['Cycle 3 post-observation','Record the conversation, including joint viewing of lesson video and examination of work.','Part H: 1-3 clips, up to 15 minutes total; each at least 1 minute.']
    ])}<p>Verify permissions and site policies, test sound and framing, and keep recordings in authorized storage. Meetings must be authentic. Fictional transcripts teach analysis; they are not scripts for an assessed event.</p><p>Use clip numbers and precise timestamps in commentary. Explain the action, rationale, and impact supported by that moment. Follow the cycle\'s editing directions; do not turn permitted editing into staged evidence.</p>${source(2,[13,24,25,35])}${source(3,[12,16,17,20,21,22,34])}</section>
    <section><h2>Protect identities and keep ownership</h2><p>The guides direct candidates to remove actual school and person names and redact personally identifiable information in submitted evidence. Follow the official translation provisions for non-English evidence and their specified ASL and braille exceptions.</p><p>Instructors can explain requirements, teach skills, discuss rubrics, support self-assessment, and help with logistics. Candidates retain their own analysis, evidence selection, decisions, and writing. Support must not supply answers, edit responses, or choose submission clips. <a href="https://www.ctcexams.nesinc.com/TestView.aspx?f=CACBT_Faculty_CalAPA.html" target="_blank" rel="noreferrer">Official acceptable support guidance</a>.</p></section>
    <section><h2>Check the current official information</h2><p>Confirm applicable guide and template versions, corrections, your program calendar, submission dates, and the ePortfolio instructions. Registration and submission happen through the official assessment system.</p><p><a href="https://www.ctcexams.nesinc.com/TestView.aspx?f=HTML_FRAG/CalAPA_TestPage.html" target="_blank" rel="noreferrer">Official CalAPA information, dates, and policies</a> &middot; <a href="#sources">Local guide and template collection</a></p></section></article>`;
  }
  function plain(html) {const el=document.createElement('div');el.innerHTML=html;return el.textContent.replace(/\s+/g,' ').trim();}
  function search(query) {
    query=query.trim().slice(0,180);
    const entries=[];
    const resources=document.createElement('div');resources.innerHTML=window.CURRENT_RESOURCES.render();
    for(const item of resources.querySelectorAll('.source-list li'))entries.push({title:item.querySelector('a').textContent,label:'More Sources',url:'#more-sources/'+item.id,text:item.textContent+' '+item.dataset.searchTerms});
    entries.push({title:'Terms used in CalAPA Help',label:'Glossary',url:'#glossary',text:plain(window.LEARNING_SUPPORT.glossary())});
    for(const [i,page] of [window.REVISED_CYCLES?.c1||window.CYCLE1_PAGE,window.REVISED_CYCLES?.c2||window.CYCLE2_PAGE,window.REVISED_CYCLES?.c3||window.CYCLE3_PAGE].entries()) for(const entry of page.search) entries.push({...entry,label:`Cycle ${i+1} guidance`,text:plain(entry.html)});
    entries.push({title:'Equity Gap Help',label:'Data reports and interpretation',url:'#equity-gap-help',text:plain(window.EQUITY_GAP_HELP.render())});
    for(const u of window.COURSE.units) for(const mode of ['lecture','walkthrough']) {
      const s=D.steps[u.id];
      const text=[u.area==='start'?'Overview':`Cycle ${u.area.slice(1)}`,u.title,u.parts,u.rubrics,...u[mode].map(x=>x.title+' '+plain(x.html)),...(s?[s.requirement,s.action,s.watch,s.next,...s.rubrics.map(id=>Object.values(D.rubrics[id]).join(' '))]:[])].join(' ');
      entries.push({title:u.title,label:mode==='lecture'?'Task and guidance':'Teaching example',url:`#unit/${u.id}/${mode}`,text});
    }
    entries.unshift({title:'Understanding CalAPA',label:'Overview',url:'#home',text:plain(home())},{title:'Prepare evidence for submission',label:'Submission preparation',url:'#readiness',text:plain(readiness()+window.LEARNING_SUPPORT.privacy()+window.LEARNING_SUPPORT.resourceTypes())});
    for(const [id,c] of Object.entries(D.cycles))entries.unshift({title:`Cycle ${c.number}: ${c.title}`,label:'Cycle overview',url:`#cycle/${id}`,text:`Cycle ${c.number} ${c.title} ${c.minute} ${c.output} ${c.distinction} ${c.thread}`});
    const terms=query.toLocaleLowerCase().replace(/\bstakeholders?\b/g,'partners').split(/\s+/).filter(Boolean);
    const results=terms.length?entries.filter(x=>terms.every(t=>x.text.toLocaleLowerCase().includes(t))).sort((a,b)=>terms.filter(t=>b.title.toLocaleLowerCase().includes(t)).length-terms.filter(t=>a.title.toLocaleLowerCase().includes(t)).length):[];
    return `<p class="kicker">Guide search</p><h1>Find a task, concept, or example</h1>${searchForm(query,'main-search')}<p role="status">${query?`${results.length} results for ${esc(query)}`:'Search the instructional guide, including the existing worked examples and rubric discussions.'}</p><div class="search-results">${results.map(x=>{const at=x.text.toLowerCase().indexOf(terms[0]),start=Math.max(0,at-65);return `<article><p class="kicker">${x.label}</p><h2><a href="${x.url}">${esc(x.title)}</a></h2><p>${start?'... ':''}${esc(x.text.slice(start,start+290))}...</p></article>`;}).join('')}</div>${query&&!results.length?'<p>Try a broader term such as <a href="#search/qualitative">qualitative</a>, <a href="#search/feedback">feedback</a>, or <a href="#search/3.2">3.2</a>.</p>':''}<p><a href="#sources">Browse original guides and templates</a></p>`;
  }
  function searchForm(value='',id='guide-search') {return `<form class="guide-search" data-guide-search role="search"><label for="${id}">Search the guide</label><div><input id="${id}" name="q" type="search" maxlength="180" value="${esc(value)}" placeholder="Evidence, feedback, rubric..."><button class="icon-button" type="submit" title="Search" aria-label="Search the guide">${icon('search')}</button></div></form>`;}
  window.GUIDE={home,cycle,thread,stepLead,stepEnd,readiness,search,searchForm,roadmap};
})();
