/* Shared student guidance used at the point of need across the course. */
(() => {
  'use strict';
  const ext=(url,label)=>`<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
  const parent='https://www.ctcexams.nesinc.com/Content/Docs/CalAPASampleConsentForm_ParentGuardianFamily.pdf';
  const adult='https://www.ctcexams.nesinc.com/Content/Docs/CalAPASampleConsentForm_VolunteerEducator.pdf';
  const policies='https://www.ctcexams.nesinc.com/TestView.aspx?f=CACBT_TestingPolicies_CalAPA.html';
  const materials='https://www.ctcexams.nesinc.com/TestView.aspx?f=HTML_FRAG/CalAPA_AssessmentMaterials.html';
  const table=(heads,rows)=>`<div class="c1-table-wrap"><table><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>`<td data-label="${heads[i]}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const cases=()=>`<section id="case-directory"><h2>Find your way through the examples</h2><p>The examples show how reasoning develops. Their people, populations, and events stay within their own case. Your real cycles can address different concerns.</p>${table(['Example','Setting, concern, and evidence','Where to read'],[
    ['Primary Cycle 1: Cedar Grove','Fictional K-5 attendance inquiry focused on students with disabilities. T1-T2 are invented annual counts and comparisons; Q1-Q3 are interviews, observations, and documents; G1 is the school commitment; F1 is feedback.','<a href="#cycle/c1/fictional-case">Cedar Grove case</a>'],
    ['Primary Cycle 2: Canyon View','Fictional Grade 9 writing inquiry with four partners and a coach. Matched sample: 24 learners, 12 English learners and 12 peers not classified as EL.','<a href="#cycle/c2/fictional-case">Group inquiry</a>'],
    ['Primary Cycle 3: Canyon View','Fictional voluntary coaching with Chen and a separate class of 28. The 28-minute lesson and work examples A-C concern assessment and response to learning.','<a href="#cycle/c3/fictional-case">Teacher partnership</a>'],
    ['Additional Harbor High example','Fictional secondary-school access, feedback, revision, meetings, and coaching. Jordan High graduation records provide separately labeled public context; Harbor classroom samples are not Jordan students or the Canyon View sample.','<a href="#connections/c1">Additional Harbor High example</a>'],
    ['Jordan High public evidence','Saved public school records, CDS 19647331934454. Populations and denominators vary by indicator and year. These are not local interview or classroom findings.','<a href="#equity-gap-help">Equity Gap Help</a>'],
    ['Archived Epsilon tutorials','Fictional school and graduate-project illustrations. Supplemental research reasoning, not extra CalAPA assignments.','<a href="#equity-gap-help/framework">Archived tutorials</a>']])}</section>`;
  const caseNotice=cycle=>`<section class="example-boundary"><h2>Additional Harbor High example</h2><p>This retained example concerns a fictional secondary-school inquiry into access to feedback, revision, and timely support. Jordan High graduation figures are public context only. ${cycle==='c1'?'The listening-session example includes six volunteer English learners; their perspectives do not represent every student.':cycle==='c2'?'Two teachers contribute six matched work pairs each. The twelve responses reviewed at each meeting come from changing sampled sets, not a fixed schoolwide cohort.':'The Grade 10 class has 28 students, including nine English learners. Six varied initial/revised work pairs support the discussion; they are not a representative schoolwide sample.'} These counts are separate from the primary case.</p><p>Use this example to compare reasoning with ${cycle==='c1'?'Cedar Grove attendance':'Canyon View writing and coaching'}. <a href="#cycle/${cycle}/fictional-case">Return to the primary Cycle ${cycle.slice(1)} case</a> or <a href="#home/case-directory">compare all cases</a>.</p></section>`;
  const privacy=()=>`<section id="permissions-workflow"><h2>Permissions, privacy, and your authorship</h2><ol>
    <li>Before collecting or recording evidence, check with your school and preparation program that existing permissions cover the people and intended use. For uncovered participants, arrange the required permission first: ${ext(parent,'parent/guardian/family sample consent')} and ${ext(adult,'adult/volunteer educator sample consent')}. Have the program confirm local requirements.</li>
    <li>Agree on secure storage and authorized access. Keep permission records according to school or district protocol. Use recordings only within the permissions given and the approved preparation and submission process.</li>
    <li>De-identify written artifacts: remove identifying names and use pseudonyms or general references for people and institutions. During recordings, use first names only. These are different directions; there is no general instruction here to blur every face. Follow the cycle rules for visible participants and permitted editing.</li>
    <li>Inspect the actual upload copies for identifiers, legibility, audio, duration, correct labels, and completeness. Retain permitted copies before final submission; the ePortfolio no longer allows file access for review or editing after submission.</li>
  </ol><p>You remain the author of your submission. Follow your institution's AI policy, cite sources, and ensure every account reflects your own work. The official attestation requires compliance with that institutional policy; it grants no blanket AI permission and imposes no blanket AI ban.</p><p>${ext(policies,'Official confidentiality directions and candidate attestations')} &middot; ${ext('https://www.ctcexams.nesinc.com/TestView.aspx?f=CACBT_TestPolicies_CalAPA.html','Rules of Participation')} &middot; ${ext('https://www.ctcexams.nesinc.com/TestView.aspx?f=CACBT_Faculty_CalAPA.html','Acceptable support')}</p></section>`;
  const terms={
    cstp:['CSTP','California Standards for the Teaching Profession: the framework used with the volunteer teacher to focus Cycle 3 observation and coaching. Use the applicable version; this case uses the 2024 framework.'],
    cape:['CAPE','California Administrator Performance Expectations: expectations for administrator preparation that underpin CalAPA. They describe leadership performance, while CSTP describes teaching practice.'],
    community:['Community of practice','Colleagues who learn through a shared concern, practice, evidence, and continued inquiry. A meeting group becomes a learning community through its work, not its title.'],
    group:['Student group','A defined reporting or inquiry population, such as students with disabilities or English learners. Groups can overlap; membership and reporting rules depend on the measure and year.'],
    numerator:['Numerator','The count meeting the measured condition, when the source reports a count. Read the specific definition; a scale score is not a head count.'],
    denominator:['Denominator','The eligible population used to calculate a rate. Tested, enrolled, and accountability populations are not interchangeable.'],
    points:['Percentage point','The difference between two percentages: 30% minus 18% is 12 percentage points. A relative percent change uses a different calculation.'],
    cds:['CDS','County-District-School: California\'s 14-digit school identifier. Use it to distinguish similarly named schools.'],
    lea:['LEA','Local educational agency, such as a school district or county office. An LEA result is not automatically a result for each school.'],
    elpi:['ELPI','English Learner Progress Indicator: an accountability measure of progress toward English proficiency. Its eligible population and participation adjustments depend on the reporting year.'],
    rfep:['RFEP','Reclassified Fluent English Proficient: a student formerly classified as an English learner who met reclassification criteria. Check how the selected report includes or separates RFEP students.'],
    ltel:['LTEL','Long-Term English Learner: an English-learner classification based on the applicable source rules. Check the year, eligibility, and group definition before comparing it with all English learners.'],
    dass:['DASS','Dashboard Alternative School Status: accountability provisions for eligible alternative schools. Confirm the historical graduation definition; do not apply one year\'s rules to every year.'],
    caa:['CAA','California Alternate Assessments: assessments for eligible students with the most significant cognitive disabilities. Do not treat CAA results as interchangeable with Smarter Balanced results.'],
    dfs:['Distance from Standard','The distance between an assessment score and the relevant achievement standard, averaged for the reported group. It is not the percentage meeting or exceeding standard.']
  };
  const glossary=()=>`<p class="kicker">Reading support</p><h1>Terms used in CalAPA Help</h1><article class="reading">${Object.entries(terms).map(([id,[name,meaning]])=>`<section id="term-${id}"><h2>${name}</h2><p>${meaning}</p></section>`).join('')}<p>Use the source-year definitions alongside these short explanations. ${ext('https://www.cde.ca.gov/ta/ac/cm/','California School Dashboard technical guidance')} &middot; <a href="#more-sources">Current official standards and resources</a></p></article>`;
  function linkFirstTerms(root) {
    const pattern=/\b(CSTP|CAPE|CDS|LEA|ELPI|RFEP|LTEL|DASS|CAA|community of practice|student group|numerator|denominator|percentage points?|Distance from Standard)\b/gi;
    const keys={cstp:'cstp',cape:'cape',cds:'cds',lea:'lea',elpi:'elpi',rfep:'rfep',ltel:'ltel',dass:'dass',caa:'caa','community of practice':'community','student group':'group',numerator:'numerator',denominator:'denominator','percentage point':'points','percentage points':'points','distance from standard':'dfs'};
    const seen=new Set(), nodes=[];
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const n=walker.currentNode;
      if(!n.parentElement.closest('a,button,script,style,.official,.rubric,.question h3,.c1-template,pre,code,details,nav,header')) nodes.push(n);
    }
    for(const node of nodes) {
      const value=node.textContent; let cursor=0, changed=false; const fragment=document.createDocumentFragment();
      for(const match of value.matchAll(pattern)) {
        const key=keys[match[0].toLowerCase()]; if(seen.has(key))continue;
        seen.add(key);changed=true;fragment.append(value.slice(cursor,match.index));
        const a=document.createElement('a');a.href='#glossary/term-'+key;a.className='term-link';a.title=terms[key][1];a.textContent=match[0];fragment.append(a);cursor=match.index+match[0].length;
      }
      if(changed){fragment.append(value.slice(cursor));node.replaceWith(fragment);}
    }
  }
  const maps={
    c1:[['T1-T2: annual evidence','Three fictional years; inspect before selecting the group','A I.1 and IV.1','a-q1'],['Q1-Q3 and G1: local inquiry','Interview, observe, examine records and school commitments; then synthesize','A II-IV; B questions 1-4','qualitative-analysis'],['Research and problem statement','Test the proposed factors and define a feasible need','B questions 3-5','b-q3'],['Proposal and F1 feedback','Draft actions, obtain feedback, revise; no implementation result claimed','C questions 1-5','strategy-map'],['Reflection','Use earlier decisions and feedback to explain leadership learning','D questions 1-3','part-d']],
    c2:[['September 9: planning','Baseline 12/24; define problem and select routine; G1 criterion and initial model','B-C; D questions 1-8','part-c'],['September 23: meeting 1','Week 2: 15/24; revisit copying concern; agree to refine contrasting models by September 25','E-F; G2/G3; illustrative Clip 1; I questions 1-2','part-f'],['October 7: meeting 2','Week 4: 18/24; review contrasting models, then agree on oral rehearsal; G4 adjustment','E-F; G3/G4; illustrative Clip 2; I questions 3-4','part-i'],['October 21: meeting 3','Week 6: 19/24; examine initial/revised pairs, limits, and next steps','E-F; G3/G4; illustrative Clip 3; I question 5','part-g'],['After implementation','Use member feedback and results to examine facilitation','J questions 1-4','part-j']],
    c3:[['Before the lesson','Teacher context; jointly choose CSTP 5A/5B, goal, and evidence','A-C; pre-meeting Clips 1-2; E','part-e'],['Lesson 00:00-28:00','Record whole observation; notes at 08:20, 14:10, 22:40; keep initial/revised work','F; work A-C in G','part-f'],['Before the post-meeting','Share lesson recording with Chen; prepare notes and contrasting work for joint review','H preparation','part-h'],['Post-meeting','Clip 1: learning; Clip 2: teaching and future earlier check; Clip 3: teacher feedback','H; I questions 1-3','part-i'],['Reflection and proposed follow-up','Examine feedback; plan an earlier check in the next lesson and review in two weeks','J questions 1-3','part-j']]
  };
  const evidenceMap=id=>`<section id="case-evidence-map"><h3>Follow the case evidence through the cycle</h3><p>This map orients you to the fictional example. It is not an extra required artifact. ${id==='c3'?'Lesson time locates a classroom event; meeting-clip time locates the coaching discussion about it.':''}</p>${table(['Evidence or time','What happens','Where it is used'],maps[id].map(([a,b,c,target])=>[a,b,`<a href="#cycle/${id}/${target}">${c}</a>`]))}</section>`;
  const resourceTypes=()=>`<section id="current-materials"><h2>Which official document do I need?</h2>${table(['Resource','Purpose'],[
    ['Cycle guide','Instructions, evidence requirements, limits, and rubrics for the applicable version.'],['Response template','The original prompts and response spaces you complete.'],['Assessment Materials Updates','Corrections or revisions issued after publication. Read these alongside the original guide and template.'],['Evidence Table Crosswalk','Explains changes between assessment years; it does not replace the current instructions.'],['Program Guide','Supplemental context and concepts for candidates and program faculty.']])}<p>${ext(materials,'Current assessment materials and resource-type index')} links to the Commission collection. A separate direct download for every update, crosswalk, or program guide was not confirmed; use this official index and your program's applicable version. <a href="#sources">Saved Version 09 guides and templates</a> are a dated local collection.</p></section>`;
  const videoDetails={
    Ki6q2tBfWpo:['August 17, 2026','92 min','Version 09','How do Cycle 1 inquiry, evidence, and rubrics fit together?'],
    llnn6B7z290:['August 20, 2026','91 min','Version 09','How do planning, implementation meetings, and collaborative evidence fit Cycle 2?'],
    BK6O8nwuBxg:['August 28, 2026','100 min','Version 09','How do the coaching steps and evidence fit Cycle 3?'],
    LYdBHjccNnY:['September 17, 2026','78 min','2026 session; version not named in title','How can I identify an equity gap and analyze the opening data?'],
    '53qiuIwfY9A':['August 28, 2026','100 min','2026-27','What support may candidates and programs use?'],
    '8o6FGWG8H8E':['February 19, 2026','44 min','MFIC program perspective; version not specified','How can a program organize support for CalAPA candidates?']
  };
  function resources(html) {
    const el=document.createElement('div');el.innerHTML=html;
    el.querySelector('.reading').insertAdjacentHTML('afterbegin',resourceTypes());
    el.querySelectorAll('.source-list li').forEach((li,i)=>{
      li.id='resource-'+(i+1);
      const a=li.querySelector('a'),href=a.getAttribute('href');
      li.dataset.searchTerms=href.includes('ParentGuardian')?'parent consent child permission family consent':href.includes('VolunteerEducator')?'adult permission volunteer teacher consent':href.includes('youtube')?'CTC video YouTube':a.textContent.includes('National University')?'National University program resources':'';
      const id=href.includes('watch?')?new URL(href).searchParams.get('v'):null;
      if(videoDetails[id]){const [date,duration,version,question]=videoDetails[id];li.querySelector('small').textContent=`Published ${date}; about ${duration}; ${version}. Student question: ${question}`;}
    });
    const permissions=[...el.querySelectorAll('section')].find(s=>s.querySelector('h2')?.textContent==='Permissions, confidentiality, and authorship');
    permissions.insertAdjacentHTML('beforeend','<p><a href="#readiness/permissions-workflow">Follow the permissions, storage, redaction, and authorship sequence</a>.</p>');
    el.querySelector('.reading').insertAdjacentHTML('beforeend','<p class="source-note">Video publication dates, durations, titles, and channel metadata checked October 8, 2026. Publication dates may differ from recording dates. Descriptions identify the topic to consult; they are not a review of every statement in each recording. Current official instructions govern.</p>');
    return el.innerHTML;
  }
  const cedarResearch=()=>`<section><h2>Primary Cycle 1 example: Cedar Grove attendance</h2><p>Cedar Grove is a fictional K-5 school. The inquiry concerns students with disabilities and access to promised attendance support. Q1-Q3 describe a small selected packet of interviews, observations, and documents; T1 is the annual outcome evidence. These sources answer different questions.</p><p>${ext('https://ies.ed.gov/use-work/resource-library/report/evaluation-report/can-texting-parents-improve-attendance-elementary-school-test-adaptive-messaging-strategy','Heppen, Kurki, and Brown (2020): adaptive parent messaging')} supports examining communication, with limits on transferring a general elementary-school result to the proposed referral process. ${ext('https://link.springer.com/article/10.1007/s10803-023-06025-3','Totsika and colleagues (2024; online 2023): attendance and neurodevelopmental conditions')} adds a lens on unmet needs and relationships, with important differences in population, setting, period, and design.</p><p><a href="#cycle/c1/b-q3">Read the initial research draft and its completed revision</a>. Notice how the source changes the question asked of local evidence. The revised response narrows a claim about communication to a question about usable, coordinated support; it does not assign a cause to the attendance disparity.</p></section>`;
  window.LEARNING_SUPPORT={cases,caseNotice,privacy,glossary,linkFirstTerms,evidenceMap,resourceTypes,resources,cedarResearch};
})();
