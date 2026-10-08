/* Requirement summaries checked against the supplied 2026-27 Version 09 guides.
   Page references use PDF page numbers; printed page numbers are four lower. */
(() => {
  'use strict';
  const cycles = {
    c1: {
      number: 1, title: 'Analyzing Data to Inform School Improvement and Promote Equity',
      short: 'Understand an equity gap', scope: 'School evidence and improvement planning',
      purpose: 'Investigate one equity gap for one student group, develop a defensible improvement proposal, and learn from leadership feedback.',
      minute: 'Analyze three recent years of quantitative data for one California state indicator. Investigate one student group with at least three different qualitative sources, connect the findings to research and school goals, identify potential contributing factors, and develop a problem statement. Propose strategies, seek targeted leadership feedback, explain adjustments, and reflect on your leadership.',
      output: 'Parts A-D: data tables, analysis, problem statement, proposed strategies and feedback, and reflection.',
      distinction: 'Act means developing strategies and obtaining feedback in this cycle. Do not invent implementation results for a proposal.',
      advance: 'Arrange access to the required years of data, local qualitative sources, school goals, and a leader who can provide informed feedback.',
      question: 'How do I know this is an equity concern, and why is this response justified?',
      rubricCount: 8, evidencePages: [8], specificationPages: [28,29],
      sources: ['R003','R004','R005','R006','R007'],
      thread: 'A carefully bounded equity inquiry can inform later collaborative work. Cycle 2 still needs its own context analysis and shared decisions.'
    },
    c2: {
      number: 2, title: 'Facilitating Communities of Practice',
      short: 'Lead collaborative learning', scope: 'A community of practice',
      purpose: 'Facilitate colleagues as they identify a problem of practice, implement one evidence-based strategy, and learn from its initial results.',
      minute: 'Investigate existing professional learning and select an educational focus with leadership guidance. Work with 3-5 educators or educational partners, in addition to yourself. Facilitate a planning meeting, then at least three recorded implementation meetings over several weeks. The group selects the problem and strategy together, examines implementation evidence, and determines next steps. Use member feedback to reflect on your facilitation.',
      output: 'Parts A-J: context and planning narratives, agendas and minutes, collaborative products, three implementation clips, commentary, and reflection.',
      distinction: 'The planning meeting does not count as one of the three implementation meetings. A presentation about a strategy does not demonstrate its implementation.',
      advance: 'Arrange participant availability and recording permissions before scheduling the sequence. At least three partners plus you must be seen and heard in each submitted implementation video.',
      question: 'How did my facilitation help this group learn, decide, and act together?',
      rubricCount: 7, evidencePages: [8,9], specificationPages: [34,35,36],
      sources: ['R008','R009','R010','R011','R012','R013','R014','R015','R016'],
      thread: 'Cycle 1 findings may inform the focus, but the Version 09 guide also permits a focus already identified by colleagues. Preserve the group\'s role in deciding.'
    },
    c3: {
      number: 3, title: 'Supporting Teacher Growth',
      short: 'Coach for teacher growth', scope: 'One volunteer teacher and a lesson',
      purpose: 'Conduct a collaborative coaching cycle grounded in a teacher\'s goals, focused observation, lesson video, and student work.',
      minute: 'Investigate coaching practices and the volunteer teacher\'s experience. Record a pre-observation conversation and jointly select one or two CSTP elements within the same domain. Observe the lesson live (synchronously, while it is taught) for at least 20 minutes and record the full observation. Analyze notes and student work, then record a post-observation conversation in which you review lesson video together, discuss evidence, and co-determine growth steps. Seek feedback and reflect on your own coaching.',
      output: 'Parts A-J: context, lesson plan, pre-observation clips and commentary, observation notes, student work, post-observation clips and commentary, and reflection.',
      distinction: 'The lesson recording supports the coaching conversation; it is not itself submitted as the lesson-video evidence for this cycle. Submitted meeting clips show your coaching.',
      advance: 'Arrange the full sequence, permissions, an audible recording setup, and access to student work before the observed lesson. Agree on the focus with the teacher.',
      question: 'How did evidence and a two-way conversation support this teacher\'s learning?',
      rubricCount: 7, evidencePages: [8,9], specificationPages: [32,33,34,35],
      sources: ['R017','R018','R019','R020','R021','R022'],
      thread: 'Carry forward careful evidence use and equitable participation. Let the teacher\'s self-assessment and classroom evidence shape this distinct coaching inquiry.'
    }
  };
  const steps = {
    'c1-investigate': {
      step: 1, name: 'Investigate', parts: ['A'], pages: [10,11,12,13], rubrics: ['1.1','1.2','1.3'],
      requirement: 'Select one of the six state indicators and analyze related quantitative data across the three most recent years. Identify one student group, collect and analyze at least three different qualitative sources, investigate school goals, and develop a research-informed equity gap analysis.',
      action: 'Make a source record for each year and each qualitative source. Compare patterns, perspectives, and exceptions before explaining what the combined evidence suggests.',
      watch: 'Three quotes from one interview do not become three different sources. If three years are unavailable for the selected indicator, the guide requires choosing an indicator for which they are available.',
      next: 'The analysis must support the potential institutional or structural factors and problem statement in Part B.',
      why: 'A numerical difference identifies a pattern. Local accounts, observations, and documents help investigate access, opportunity, and the conditions behind it.',
      exampleLimit: 'The saved Jordan High figures are a dated public snapshot. Harbor High interviews and observations are fictional and cannot establish local causes or serve as your evidence.'
    },
    'c1-plan': {
      step: 2, name: 'Plan', parts: ['B'], pages: [17,18], rubrics: ['1.4','1.5'],
      requirement: 'Use the equity gap analysis and relevant research to identify potential institutional or structural contributing factors. Develop one feasible problem statement addressing the identified student group\'s educational need.',
      action: 'For each possible factor, locate supporting Step 1 evidence, consider an alternative explanation, and explain which school-level need your problem statement addresses.',
      watch: 'A student identity is not a causal explanation. A preferred solution is not yet a problem statement. Gather more evidence when the proposed factor is unsupported.',
      next: 'Part C strategies must respond to this problem and its contributing factors, with a clear connection to school goals.',
      why: 'A focused problem statement makes it possible to judge whether a strategy addresses the need you actually investigated.',
      exampleLimit: 'The example illustrates a plausible school-level mechanism. It does not prove that feedback practices caused the public graduation gap.'
    },
    'c1-act': {
      step: 3, name: 'Act', parts: ['C'], pages: [21], rubrics: ['1.6','1.7'],
      requirement: 'Develop potential strategies linked to the problem statement and school goals. Seek targeted feedback from an administrator or educational leader familiar with the context. Explain adjustments, plans for partner buy-in, and anticipated implications.',
      action: 'Keep a record of the proposed strategy, the specific feedback, your reasoned adjustment, and the next steps needed for support and feasibility.',
      watch: 'Approval such as "looks good" provides little basis for explaining a revision. Target feedback to feasibility, access, resources, and implementation implications.',
      next: 'Use the feedback and your response to it as evidence of learning in Part D.',
      why: 'Leadership includes testing an idea with people who understand the setting and explaining how their knowledge changes the proposal.',
      exampleLimit: 'The fictional feedback shows how a proposal can change. It is not a report that the strategy was implemented or improved outcomes.'
    },
    'c1-reflect': {
      step: 4, name: 'Reflect', parts: ['D'], pages: [24], rubrics: ['1.8'],
      requirement: 'Explain why you sought the selected leader\'s feedback and how it shaped buy-in. Use evidence from earlier steps to examine your strengths and growth as an equity-driven leader and identify professional learning goals.',
      action: 'Choose a moment that changed your reasoning, trace the evidence behind that change, and identify a specific next learning step.',
      watch: 'A chronology of completed tasks is not an analysis of your leadership. A polished reflection cannot supply missing fieldwork.',
      next: 'Carry forward what you learned about assumptions, evidence, and feedback when you begin a new collaborative inquiry.',
      why: 'Reflection makes the relationship between experience and future leadership practice visible.',
      exampleLimit: 'The model demonstrates a reasoning pattern, not a required personal experience or a guaranteed rubric score.'
    },
    'c2-investigate': {
      step: 1, name: 'Investigate', parts: ['A'], pages: [11,12,13,14], rubrics: ['2.1','2.2'],
      requirement: 'Analyze current collaborative professional learning and its relationship to student learning or well-being. Select a data-based educational focus with leadership guidance and establish or join a community of 3-5 educators or educational partners in addition to yourself.',
      action: 'Learn how collaboration currently works, why each member belongs in this inquiry, and how relationships and context may affect participation.',
      watch: 'The minimum is three partners in addition to you. Arrange attendance so at least three partners and you are seen and heard in each submitted implementation video; disclose substitutions.',
      next: 'Bring the educational focus and relevant evidence to the planning meeting. The group will define the problem of practice together.',
      why: 'A community of practice needs a meaningful shared concern, relevant perspectives, and a setting in which colleagues can learn together.',
      exampleLimit: 'The public report supplies context. It cannot establish what colleagues need, how they collaborate, or why a particular group is appropriate.'
    },
    'c2-plan': {
      step: 2, name: 'Plan', parts: ['B','C','D'], pages: [17,18,19], rubrics: ['2.3','2.4'],
      requirement: 'Facilitate a planning meeting in which the group analyzes data, selects a problem of practice, and jointly chooses one relevant evidence-based strategy. Prepare an agenda, record minutes, and explain the selection, rationale, expected impact, challenges, and monitoring.',
      action: 'Make the difference between the broad educational focus, the specific practice problem, and the selected strategy clear. Decide with the group what evidence can reveal implementation and initial learning.',
      watch: 'An optional agenda or minutes template does not make the artifact optional. This planning meeting is separate from the minimum three implementation meetings.',
      next: 'The strategy must be implemented and its initial results monitored during the period of the implementation meetings.',
      why: 'Shared analysis and choice give the group ownership and make its later interpretation of results meaningful.',
      exampleLimit: 'The writing routine is one fictional strategy. Its use in this case is not a recommendation that every candidate select the same strategy.'
    },
    'c2-act': {
      step: 3, name: 'Act', parts: ['E','F','G','H','I'], pages: [22,23,24,25,26], rubrics: ['2.5','2.6'],
      requirement: 'Facilitate and record at least three implementation meetings over several weeks. Submit their agendas and minutes, collaborative work products, three clips, and commentary showing facilitation, analysis of initial results, and jointly determined next steps.',
      action: 'Support diverse viewpoints, return to implementation evidence, and document what the group decides. Independently select clips that show the required content and anchor commentary to specific moments.',
      watch: 'Real meetings must not be staged or scripted. Commentary must match the submitted footage. A general summary of the discussion does not explain what you did, why, and its impact.',
      next: 'Gather members\' feedback about the learning process and support. Combine it with implementation evidence to examine your facilitation in Part J.',
      why: 'The assessment needs observable evidence of how you help adults learn and make decisions together, including when the evidence is mixed.',
      exampleLimit: 'The fictional transcripts are for analysis and rehearsal, never for staging assessed meetings. The fictional classroom results do not establish a treatment effect.'
    },
    'c2-reflect': {
      step: 4, name: 'Reflect', parts: ['J'], pages: [29,30], rubrics: ['2.7'],
      requirement: 'Analyze your facilitation using initial implementation results and member feedback. Explain strengths, growth areas, professionalism and equity, the influence of context, and specific professional learning goals.',
      action: 'Compare your intentions with the group\'s experience and the evidence of its work. Explain a concrete change you would make to your facilitation.',
      watch: 'Evidence that students improved is not automatically evidence of your facilitation. Explain the leadership actions and group processes you can actually document.',
      next: 'Use the learning about listening, participation, and evidence when supporting an individual teacher in a separate coaching inquiry.',
      why: 'Feedback can reveal a gap between a facilitator\'s intention to include people and participants\' experience of influence.',
      exampleLimit: 'The model illustrates reflection on a fictional community. It does not demonstrate your own facilitation or replace authentic feedback.'
    },
    'c3-investigate': {
      step: 1, name: 'Investigate', parts: ['A'], pages: [11,12,13], rubrics: ['3.1'],
      requirement: 'Analyze school coaching, observation, and feedback practices, including the role of CSTP. Learn about a volunteer teacher\'s experience and explain how the school and teacher context will shape the coaching cycle.',
      action: 'Learn how the teacher has experienced feedback, clarify the purpose of the partnership, and plan the sequence and permissions.',
      watch: 'Schoolwide data cannot diagnose the volunteer teacher\'s practice. If a different standards framework is used, the guide calls for a crosswalk to the selected CSTP elements.',
      next: 'Use this context to listen carefully during the pre-observation meeting rather than imposing a predetermined coaching focus.',
      why: 'Trust and a useful coaching plan depend on understanding both the institutional context and this teacher\'s prior experience.',
      exampleLimit: 'The volunteer teacher and coaching history are fictional. They illustrate contextual reasoning, not assumptions to make about teachers.'
    },
    'c3-plan': {
      step: 2, name: 'Plan', parts: ['B','C','D','E'], pages: [15,16,17,18], rubrics: ['3.2'],
      requirement: 'Record a pre-observation meeting that includes teacher self-assessment, lesson goals, student assets and needs, and the observation plan. Jointly select one or two CSTP elements from the same domain and the evidence to collect, including student work.',
      action: 'Listen to the teacher\'s reasoning, agree on the focus and observation evidence, and clarify the student work that will support the later conversation.',
      watch: 'The candidate cannot select the focus alone. Plan for two pre-observation clips with different purposes, each up to six minutes.',
      next: 'Observe the agreed focus and collect the agreed evidence. The post-observation conversation should return to these decisions.',
      why: 'A jointly chosen focus keeps observation manageable and preserves the teacher\'s ownership of professional learning.',
      exampleLimit: 'CSTP 5A and 5B are the fictional case\'s focus, not a prescribed choice for candidates. Confirm the applicable standards and wording.'
    },
    'c3-act': {
      step: 3, name: 'Act', parts: ['F','G','H','I'], pages: [20,21,22,23], rubrics: ['3.3','3.4','3.5'],
      requirement: 'Observe the lesson live (synchronously, while it is taught) for at least 20 minutes and record the full observation. Analyze CSTP-focused notes and student work. Record the post-observation conversation, jointly view lesson video, examine strengths and growth, co-determine next steps, and seek feedback on your coaching.',
      action: 'Keep observations distinct from interpretations. Use the notes, lesson video, and work together to support a two-way learning conversation.',
      watch: 'Record and use the lesson video, but submit post-observation meeting clips for Part H: 1-3 clips, up to 15 minutes total, with each clip at least one minute. Fifteen minutes is not the limit for each clip.',
      next: 'The teacher\'s feedback about your coaching and evidence of the partnership inform Part J.',
      why: 'Different evidence sources show different aspects of teaching and learning. Joint interpretation supports a next step the teacher understands and owns.',
      exampleLimit: 'A fictional lesson, timestamp, or work sample cannot substitute for the actual observation and work. One lesson does not establish lasting teacher growth.'
    },
    'c3-reflect': {
      step: 4, name: 'Reflect', parts: ['J'], pages: [27], rubrics: ['3.6','3.7'],
      requirement: 'Use teacher feedback and cycle evidence to analyze your coaching strengths and growth, the two-way partnership and teacher ownership, and your role as an equitable instructional leader.',
      action: 'Identify evidence of how the conversation supported or limited teacher thinking. Connect your next professional learning step to that evidence.',
      watch: 'The reflection examines your coaching and leadership, not just the teacher\'s next lesson. The video reflection limit is six minutes, unlike Cycle 2\'s five-minute limit.',
      next: 'Carry this learning into future coaching partnerships and continuing professional inquiry.',
      why: 'An instructional leader needs to examine the quality and potential impact of their own support, as well as the practice they observed.',
      exampleLimit: 'The model proposes future coaching changes; it does not claim those changes have already produced improved outcomes.'
    }
  };
  const rubrics = {
    '1.1': [14,'Quantitative inquiry','Explain the pattern across the three most recent years and the rationale for the student group.','A chart and a group name without an explanation of the pattern.'],
    '1.2': [15,'Qualitative inquiry','Analyze at least three different sources and explain how their findings relate to the quantitative pattern and equity issue.','Listing sources or quotations without comparing findings.'],
    '1.3': [16,'Equity gap analysis','Connect quantitative and qualitative findings and show the relationship to specific school goals.','A numerical gap with no analysis of equity or school purpose.'],
    '1.4': [19,'Contributing factors','Use local analysis and relevant research to explain potential institutional or structural contributing factors.','A deficit assumption or citation unrelated to the proposed factor.'],
    '1.5': [20,'Problem statement','Develop a feasible problem statement that follows from the gap and potential contributing factors.','A solution chosen before the need is established.'],
    '1.6': [22,'Strategies and alignment','Explain how proposed strategies address the problem and factors and align with school goals.','A generic strategy with no connection to the investigation.'],
    '1.7': [23,'Feedback and feasibility','Explain how feedback strengthens strategies, how partners can develop buy-in, and realistic implementation implications.','Reporting approval without showing its effect on the proposal.'],
    '1.8': [25,'Leadership learning','Explain the feedback choice, its influence on buy-in, and evidence-based strengths and growth.','A task summary with vague future goals.'],
    '2.1': [15,'Professional learning context','Analyze how existing collaborative professional learning relates to students\' learning or well-being.','Naming meetings without analyzing their role.'],
    '2.2': [16,'Focus and membership','Connect student data and school goals to the focus and explain members\' roles, demographics, relationships, and inclusion.','Choosing a convenient group without a rationale.'],
    '2.3': [20,'Collaborative problem definition','Explain how the group analyzed evidence and jointly identified a practice that could change.','Announcing a problem and asking colleagues to agree.'],
    '2.4': [21,'Collaborative strategy selection','Explain the shared choice of one relevant evidence-based strategy and its expected impact.','Selecting a program name without a specific practice or shared reasoning.'],
    '2.5': [27,'Facilitation of group learning','Show and analyze facilitation that supports decisions, diverse viewpoints, focus, and group learning.','Narrating the footage without explaining a facilitation move and its purpose.'],
    '2.6': [28,'Results and next steps','Show how the group reaches a shared understanding of initial results and jointly determines next steps.','Reporting results to a passive audience.'],
    '2.7': [31,'Reflection on facilitation','Use initial results and member feedback to analyze equitable facilitation, strengths, growth, and next steps.','Calling a meeting successful without evidence or member feedback.'],
    '3.1': [14,'Coaching context','Analyze existing practices and explain how teacher experience shapes the plan and its implications.','A biography or list of school routines with no implications for coaching.'],
    '3.2': [19,'Planning a coaching partnership','Show listening, shared focus and evidence decisions, and a clear observation plan; analyze your coaching.','Choosing the elements or observation plan without the teacher\'s input.'],
    '3.3': [24,'Focused observation evidence','Document detailed evidence relevant to the selected CSTP elements and lesson goals, and analyze teaching practice.','Global praise or criticism instead of specific observations.'],
    '3.4': [25,'A learning conversation','Jointly interpret CSTP evidence, lesson video, and student work to identify strengths and growth; analyze your facilitation.','Feedback delivered as a verdict rather than a collaborative interpretation.'],
    '3.5': [26,'Shared growth steps','Co-determine next steps, resources, and coaching support grounded in CSTP-related evidence.','Prescribing the teacher\'s next steps alone.'],
    '3.6': [28,'Reflection on coaching','Use teacher feedback and cycle evidence to analyze your coaching and the partnership.','Reflecting only on the teacher\'s performance.'],
    '3.7': [29,'Equitable instructional leadership','Reflect on your role and the potential contribution of coaching to equitable teacher growth.','A general statement about equity disconnected from coaching.']
  };
  const glossary = [
    ['CalAPA','California Administrator Performance Assessment: an assessment of leadership practice through three evidence-based cycles. In this guide, APA refers to administrator performance assessment, not APA citation style.'],
    ['CAPE','California Administrator Performance Expectations: the leadership expectations underlying the assessment and its rubrics.'],
    ['CSTP','California Standards for the Teaching Profession: the teaching framework used to establish the Cycle 3 observation and coaching focus.'],
    ['Cycle, step, part, rubric','A cycle is a complete leadership inquiry. Its four steps organize the work. Parts identify the evidence you submit. A rubric describes the quality of performance evaluated using that evidence.'],
    ['Evidence','Records that support an account: data, work products, observation notes, video, and documented feedback. Explain what a record shows and what it cannot establish.'],
    ['Analysis','Explain relationships and reasoning: what happened, why you acted as you did, what the evidence reveals, and the impact or limits of the action.'],
    ['Equity gap','An inquiry into disparities in access, opportunities, resources, and outcomes for a student group. A numerical difference is a starting point for investigation.'],
    ['Problem of practice','A specific concern about practice that the Cycle 2 group can investigate and address through a selected strategy.'],
    ['Commentary and reflection','Commentary explains decisions and impact at specific recorded moments. Reflection examines your learning and future leadership using evidence from the cycle.']
  ];
  window.GUIDE_CONTENT = {version:'09', year:'2026-27', reviewed:'2026-10-07', cycles, steps, rubrics, glossary};
})();
