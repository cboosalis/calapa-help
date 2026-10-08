/* Cycle 1 template-led instruction. Official descriptors are kept separate from teaching notes. */
(() => {
  'use strict';

  const limits = [
    ['A', 'Data Tables and Written Narrative: Data Collection and Equity Gap Analysis', '1 file', 'DOCX, ODT, or PDF', 'Up to 5 pages of responses to prompts. Quantitative and qualitative data tables are excluded from the page count.'],
    ['B', 'Written Narrative: Contributing Factors and Problem Statement', '1 file', 'DOCX, ODT, or PDF', 'Up to 5 pages.'],
    ['C', 'Written Narrative: Planning for School Improvement and Promoting Equity', '1 file', 'DOCX, ODT, or PDF', 'Up to 5 pages.'],
    ['D', 'Reflective Narrative', '1 file', 'Written: DOCX, ODT, or PDF. Video: asf, qt, mov, mpg, mpeg, avi, wmv, mp4, or m4v', 'Written: up to 5 pages. Video explanation: up to 5 minutes.']
  ];

  const sharedFormatting = 'Use the downloaded template, Arial 11-point type, single spacing, and one-inch margins. Do not delete or alter prompts or formatting to gain space. Excess pages are not read or scored.';

  const parts = {
    A: {
      title: 'Part A: Data Collection and Equity Gap Analysis',
      file: 'CalAPA_C1_S1_A_DataCollectionEquityGapAnalysis.docx',
      step: 'Step 1: Investigate',
      limit: 'Up to 5 pages of responses. Quantitative and qualitative data tables are outside the page count.',
      rubrics: ['1.1', '1.2', '1.3'],
      sections: [
        ['I. Initial Data Collection',
          ['California state indicator field.', 'Three-year quantitative table with the most recent year first.', 'Prompt 1: Identify the one specific student group you have chosen to further investigate.'],
          'Start with one of the six California state indicators, not a general concern. Keep the year, group, denominator, source, and source qualification attached to every number.',
          'In the teaching case, the selected indicator is Graduation Rate and the selected group is English Learners. The saved public record shows lower English Learners graduation rates than schoolwide in each saved year. This supports further investigation into access to graduation pathways. It does not identify a cause.'],
        ['II. Extended Data Collection',
          ['Directions: Identify each of the three qualitative sources you selected, and record and analyze the qualitative data you collected from each source.', 'Table columns: Data Sources; Qualitative Data.'],
          'Use three different kinds of qualitative evidence. Three quotations from one conversation are not three sources. Each source should help explain resources, access, support, experience, or school processes connected to the indicator.',
          'Harbor High uses a student listening session, two observations of feedback and revision periods, and a document review of assignment packets plus the support-referral procedure. Together, they suggest uneven access to usable feedback and follow-through, while preserving counterexamples where support worked.'],
        ['III. School Vision, Mission, and/or Goals',
          ['Prompt 1: Investigate the vision, mission, and/or goals at your school and document your findings.'],
          'Quote or summarize the actual school commitment that makes this gap a leadership concern. Do not invent a goal after the fact.',
          'The fictional school goal is equitable completion of a rigorous graduation pathway. In a real response, replace that with verified site language and explain how the selected group and indicator connect to it.'],
        ['IV. Equity Gap Analysis',
          ['Prompt 1: Explain what supports your decision to select this equity gap and student group, including analysis of the quantitative data and why it is relevant to equity.', 'Prompt 2: Describe the three qualitative sources and how they provide more information about this student group for the indicator.', 'Prompt 3: Explain qualitative patterns or trends and how they relate to quantitative patterns or trends.', 'Prompt 4: Define the equity gap through quantitative and qualitative analysis. Discuss related research and explain how research informs or supports the finding.', 'Prompt 5: Explain how the identified equity gap relates to specific school vision, mission, and/or goals.'],
          'The equity gap analysis is not just subtracting two percentages. Examine outcomes together with resources, opportunities, support, monitoring, school commitments, and actual student experiences. Embed research citations in the written responses when used; do not attach a separate reference list.',
          'A stronger response says: the public graduation disparity warrants inquiry; local sources suggest inconsistent access to feedback, revision time, and completed referrals; research on dropout prevention and academic support helps evaluate plausible school-level conditions; the issue matters because the school goal promises equitable pathway completion. It also says what the evidence cannot prove.']
      ]
    },
    B: {
      title: 'Part B: Contributing Factors and Problem Statement',
      file: 'CalAPA_C1_S2_B_ContribFactorsAndProbStatement.docx',
      step: 'Step 2: Plan',
      limit: 'Up to 5 pages.',
      rubrics: ['1.4', '1.5'],
      sections: [
        ['I. Institutional/Structural Factors',
          ['Prompt 1: What potential contributing factors are suggested by the data you collected and analyzed?', 'Prompt 2: How do these specific contributing factors, including institutional and/or structural factors, impact student learning or well-being?', 'Prompt 3: Cite research related to your findings regarding contributing factors.', 'Prompt 4: Identify areas of educational need related to the single equity gap.'],
          'A contributing factor is a school-level condition that evidence makes plausible. It is not a student identity, a family stereotype, or a preferred solution. Explain resources, access, adult practice, monitoring, scheduling, communication, or follow-through.',
          'The fictional candidate identifies inconsistent feedback follow-through as a possible contributing condition. The response uses Step 1 evidence, considers alternatives, cites research related to usable academic support, and avoids saying English learner status caused the graduation pattern.'],
        ['II. Problem Statement to Address Student Group Area of Need',
          ['Prompt 5: Describe the equity gap that needs to be addressed at the chosen school for the California state indicator and the identified student group area of need.'],
          'A problem statement should be narrow enough for school improvement planning and broad enough to address the investigated need. It should name the group, the need, and the school-controlled condition without jumping straight to a strategy.',
          'Harbor High needs a consistent school-day process that gives English learners usable feedback, revision time, and completed support follow-through in credit-bearing courses connected to graduation pathways.']
      ]
    },
    C: {
      title: 'Part C: Planning for School Improvement and Promoting Equity',
      file: 'CalAPA_C1_S3_C_PlanSchoolImprovementPromotEquity.docx',
      step: 'Step 3: Act',
      limit: 'Up to 5 pages.',
      rubrics: ['1.6', '1.7'],
      sections: [
        ['Prompts 1-3: Strategies, fit, factors, and goals',
          ['Prompt 1: Describe potential strategies for equitable school improvement and how they are to be applied.', 'Prompt 2: Explain how the strategies address the equity gap described in your problem statement.', 'Prompt 3: Explain how the strategies address or take into account potential contributing factors and align with school vision, mission, and/or goals.'],
          'A strategy is stronger when the mechanism is visible: what will adults do differently, what access barrier does it address, and how will the school know whether it is feasible? Do not claim implementation results in Cycle 1.',
          'The proposal protects short in-class revision time, uses a common next-step feedback prompt, and assigns a named adult to check whether a referral became an accessible appointment. These strategies respond to feedback access and follow-through, not merely to the graduation chart.'],
        ['Prompts 4-5: Feedback, adjustments, buy-in, and implications',
          ['Prompt 4: Describe targeted feedback from an administrator, supervisor, or key educational leader on each proposed strategy and explain adjustments based on that feedback.', 'Prompt 5: Describe steps for school-level and community educational partner buy-in and anticipated implications.'],
          'Feedback should change the proposal or confirm a constraint that must be handled. A generic "looks good" comment gives little evidence. Show the before-and-after decision.',
          'A leader questions whether after-school support is accessible to the selected group. The candidate revises the strategy toward protected school-day support and plans partner conversations with teachers, counseling staff, students, and family representatives about timing, responsibility, and communication.']
      ]
    },
    D: {
      title: 'Part D: Reflective Narrative',
      file: 'CalAPA_C1_S4_D_ReflectiveNarrative.docx',
      step: 'Step 4: Reflect',
      limit: 'Written: up to 5 pages. Video explanation: up to 5 minutes.',
      rubrics: ['1.8'],
      sections: [
        ['Prompt 1: Feedback rationale and buy-in',
          ['Provide your rationale for the leader feedback you chose to gather in Step 3 and explain how the feedback affected your approach to positive educational partner buy-in.'],
          'Explain why that person was the right feedback source for the proposal, context, resources, or buy-in problem. Then show how the feedback changed the way you planned to involve others.',
          'The candidate chose the assistant principal who oversees counseling and intervention schedules because the proposal depended on accessible support time. The feedback changed the proposal from adding help to redesigning access and follow-through.'],
        ['Prompt 2: Strengths, growth, and evidence',
          ['Reflect on strengths and areas for growth as an equity-driven leader, and refer to evidence from Steps 1, 2, and/or 3.'],
          'This is an evidence-based leadership reflection, not a celebration of effort. Use specific evidence that challenged, changed, or limited your judgment.',
          'A strength was examining counterexamples instead of forcing every source to confirm the first interpretation. A growth area was not initially including students in reviewing whether the revised access plan was understandable.'],
        ['Prompt 3: Professional learning goals',
          ['Identify specific professional learning goals and describe future steps for your professional growth.'],
          'Make the goal observable. Name what you will practice, with whom, when, and what evidence will help you know whether your leadership improved.',
          'For six weeks, the candidate will use a decision log in planning meetings: evidence considered, alternative considered, missing perspective, and reason for the choice. A mentor will review whether the log shows genuine changes in reasoning.']
      ]
    }
  };

  const rubrics = {
    '1.1': ['Step 1: Investigate', 'Based on the chosen California state indicator, how well does the candidate select and analyze quantitative data sources across the three most recent years, identify patterns and/or trends related to equity, and choose an appropriate student group?', 'Part A: Data Tables and Written Narrative: Data Collection and Equity Gap Analysis. CAPE Standard 1; Elements 1A, 1C.', 'Level 3 requires a clear three-year quantitative analysis, a selected group, and a rationale. Level 4 adds additional data that clarify group differences. Level 5 also explains how relevant research informs the equity issue.', [
      ['1', 'Candidate does not include quantitative data across the three most recent years. OR patterns and trends are not identified or are irrelevant. OR candidate does not select a student group to investigate OR selects a student group not appropriate for the identified indicator.'],
      ['2', 'Candidate selects a California state indicator and minimally analyzes quantitative data, vaguely identifying patterns and/or trends related to school equity. Candidate is not clear about which student group they will investigate or why the student group was selected.'],
      ['3', 'Candidate selects a California state indicator and analyzes quantitative data across the three most recent years, clearly identifying general patterns and/or trends related to school equity. Candidate clearly identifies a student group to investigate further and provides a rationale for why this student group was selected.'],
      ['4', 'All of Level 3, plus: Candidate explores additional data linked to the indicator that clearly informs their understanding of patterns and/or trends to further clarify group differences within the state indicator selected, such as demographic data, ethnicity, gender, or language.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate cites relevant research that informs their understanding of patterns and/or trends related to equity for the determined equity issue and chosen student group.']
    ]],
    '1.2': ['Step 1: Investigate', 'How does the candidate collect and analyze relevant qualitative data from a range of at least three different qualitative data sources and explain their relationship to the quantitative data findings and the identified student group equity issue?', 'Part A: Data Tables and Written Narrative: Data Collection and Equity Gap Analysis. CAPE Standard 1; Elements 1A, 1C. CAPE Standard 3; Element 3B.', 'Level 3 requires three different relevant qualitative sources and a clear explanation of how qualitative findings relate to quantitative findings and the equity issue. Level 5 adds responsiveness to complex context, cultural sensitivity, and diverse viewpoints.', [
      ['1', 'Candidate does not provide or analyze three qualitative data sources. OR candidate provides no or irrelevant information about the connection among qualitative and quantitative data findings and the identified student group equity issue.'],
      ['2', 'Candidate collects and minimally analyzes a range of qualitative data from at least three sources. Candidate minimally connects the qualitative data and findings to the quantitative data findings for the identified student group equity issue.'],
      ['3', 'Candidate collects and analyzes a range of relevant qualitative data from three different sources. Candidate clearly explains the relationship among findings from the analyses of the qualitative data, the quantitative data, and the identified student group equity issue.'],
      ['4', 'All of Level 3, plus: Candidate collects additional qualitative data as appropriate to deepen understanding of the chosen California state indicator and student group equity issue, and provides a complete analysis of the relationship between qualitative and quantitative findings and the identified issue.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate explains how their qualitative data collection strategy is responsive to the complex context in which they are working and demonstrates cultural sensitivity and an appreciation for diverse viewpoints.']
    ]],
    '1.3': ['Step 1: Investigate', 'How does the candidate conduct an equity gap analysis based on the chosen California state indicator to inform understanding of equity issues for the identified student group? How does this equity gap align with the school vision, mission, and/or goals?', 'Part A: Data Tables and Written Narrative: Data Collection and Equity Gap Analysis. CAPE Standard 1; Elements 1A, 1C. CAPE Standard 3; Elements 3B, 3C.', 'This rubric evaluates the combined analysis. A numerical gap alone is incomplete. The analysis should connect quantitative evidence, qualitative evidence, resources, outcomes, and the school commitment.', [
      ['1', 'Candidate identifies an equity issue with no evidence of quantitative or qualitative data analysis. OR candidate does not identify patterns and/or trends. OR candidate does not describe an equity gap for the student group. OR candidate does not identify alignment with school vision, mission, and/or goals.'],
      ['2', 'Candidate identifies an equity issue based on minimal quantitative or qualitative data analysis. Candidate identifies unclear patterns and/or trends or does not clearly describe them. Candidate provides a minimal description of an equity gap and minimally describes alignment with school vision, mission, and/or goals.'],
      ['3', 'Candidate identifies an equity issue clearly based on quantitative and qualitative data analysis for the chosen state indicator. Candidate clearly describes patterns and/or trends across the analyses and clearly identifies alignment between the equity gap and school vision, mission, and/or goals.'],
      ['4', 'All of Level 3, plus: Candidate conducts a thorough equity gap analysis, describing a clear connection from quantitative data findings to supportive qualitative data findings, and provides a sophisticated understanding of the equity disparity identified for the student group.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate cites and explains how research informs their understanding of the equity gap for the specific student group.']
    ]],
    '1.4': ['Step 2: Plan', 'How does the candidate determine contributing factors, including institutional and/or structural factors, that created or added to the identified equity gap affecting a student group and cite the research supporting their determination?', 'Part B: Written Narrative: Contributing Factors and Problem Statement. CAPE Standard 1; Element 1A. CAPE Standard 2; Element 2A. CAPE Standard 3; Element 3C.', 'The strongest responses avoid deficit assumptions. They use Step 1 evidence and research to explain plausible institutional or structural conditions.', [
      ['1', 'Candidate identifies contributing factors that are biased, superficial, or irrelevant to the equity gap analysis. OR candidate does not cite research and/or neglects to draw connections between research and contributing factors.'],
      ['2', 'Candidate identifies potential contributing factors and minimally describes how they relate to the equity gap analysis. Candidate attempts to connect research and contributing factors, but citations are not related to the equity gap.'],
      ['3', 'Candidate clearly uses the equity gap analysis and findings from quantitative and qualitative data analyses to determine contributing factors, including institutional and/or structural factors, that created or added to an equity gap affecting a student group. Candidate cites relevant research to support potential contributing factors.'],
      ['4', 'All of Level 3, plus: Candidate explains in detail, with supporting evidence from Step 1, how several contributing factors can create or add to equity differences or disparities for a student group.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate demonstrates a sophisticated, research-based understanding of the systemic, institutional, or structural causes of the identified single equity gap for a group of students at the school.']
    ]],
    '1.5': ['Step 2: Plan', 'How does the candidate use the equity gap analysis and identification of potential contributing factors to develop a feasible problem statement related to student achievement and/or well-being?', 'Part B: Written Narrative: Contributing Factors and Problem Statement. CAPE Standard 1; Elements 1A, 1C. CAPE Standard 5; Element 5B.', 'The problem statement should follow from the gap and contributing factors. It should be feasible in the school context and responsive to the selected group need.', [
      ['1', 'Candidate does not use the equity gap analysis or potential contributing factors to develop a problem statement. OR candidate problem statement is not responsive to the needs of the student group.'],
      ['2', 'Candidate attempts to use the equity gap analysis and potential contributing factors to develop a problem statement, but the connection to achievement and/or well-being is unclear. Candidate problem statement is only partially responsive to the needs of the student group.'],
      ['3', 'Candidate develops a feasible problem statement related to achievement and/or well-being of the student group that clearly draws from the equity gap analysis and potential contributing factors. Candidate problem statement is clearly responsive to the needs of the student group.'],
      ['4', 'All of Level 3, plus: Candidate explains why their problem statement is responsive and feasible for the school culture and context.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate cites relevant evidence-based practices or research on how the area of educational need has been addressed in other settings to improve achievement and/or well-being for similar student groups.']
    ]],
    '1.6': ['Step 3: Act', 'How are the proposed strategy(ies) for equitable school improvement well informed by the equity gap analysis, including contributing factors, and responsive to the problem statement? How are they aligned to school vision, mission, and/or goals?', 'Part C: Written Narrative: Planning for School Improvement and Promoting Equity. CAPE Standard 1; Element 1A. CAPE Standard 3; Element 3C. CAPE Standard 5; Element 5B.', 'A strategy should respond to the investigated condition and school goal. Level 5 adds research-based evidence for relevance and implementation for this student group and school.', [
      ['1', 'Candidate does not propose strategy(ies) for equitable school improvement informed by the findings. OR proposed strategy(ies) are not aligned with school vision, mission, and/or goals.'],
      ['2', 'Candidate proposed strategy(ies) are minimally informed by the findings and provide only general reference to the equity gap analysis, contributing factors, and/or problem statement. Proposed strategy(ies) are partially aligned with school vision, mission, and/or goals.'],
      ['3', 'Candidate proposed strategy(ies) for equitable school improvement for the student group are well informed by the equity gap analysis findings and contributing factors and are responsive to the problem statement. Proposed strategy(ies) are clearly aligned with school vision, mission, and/or goals.'],
      ['4', 'All of Level 3, plus: Candidate provides relevant strategy(ies) that strategically focus on equitable student and school improvement and represent a contextually responsive approach to addressing the equity issue or educational need.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate provides research-based evidence of the relevance of the proposed strategy(ies) and their implementation for improving achievement and/or well-being for the specific student group and school.']
    ]],
    '1.7': ['Step 3: Act', 'How does the candidate apply feedback from administrators or educational leaders familiar with school culture and context and describe next steps for educational partner buy-in and potential implications for the adjusted strategy(ies)?', 'Part C: Written Narrative: Planning for School Improvement and Promoting Equity. CAPE Standards 1, 2, 3, 5, and 6 as listed in the guide.', 'Feedback must affect the proposal. Buy-in means partners have a chance to understand, question, and shape feasibility, not just receive an announcement.', [
      ['1', 'Candidate does not apply feedback from an administrator, supervisor, or educational leader to adjust or strengthen proposed strategy(ies). OR candidate states plans to communicate with little or no explanation of steps for buy-in. OR candidate does not identify anticipated implications.'],
      ['2', 'Candidate vaguely describes feedback and makes irrelevant or inappropriate adjustments. Candidate vaguely describes plans to communicate, and it is unclear that partners will develop buy-in. Candidate does not clearly describe realistic implications related to implementation.'],
      ['3', 'Candidate clearly applies feedback to adjust or strengthen proposed strategy(ies). Candidate clearly provides relevant and appropriate next steps for creating buy-in and communicating with educational partners. Candidate clearly describes anticipated, realistic implications related to implementation.'],
      ['4', 'All of Level 3, plus: Candidate seeks additional rounds of feedback from other administrators or educational partners and develops a detailed strategic plan to communicate and share the plan with a diverse range of partners to ensure a workable and feasible approach.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate plans to coach educational partners to examine and address potential biases that could affect student learning and/or well-being due to identified equity gaps, including sources of educational disadvantage or discrimination, and is transparent about potential underlying contributing factors.']
    ]],
    '1.8': ['Step 4: Reflect', 'How did leadership feedback shape the equity-focused strategy, build educational partner buy-in, and support growth in addressing equity needs and gaps? How does the candidate reflect on current strengths and future areas for growth in equity leadership?', 'Part D: Reflective Narrative (up to 5 pages written or up to 5 minutes of video explanation). CAPE Standard 5; Elements 5A, 5B. CAPE Standard 6; Element 6A.', 'The reflection should use evidence from the cycle to analyze leadership learning. It should not merely retell the tasks completed.', [
      ['1', 'Candidate does not discuss or only mentions the selected leader and/or the importance of partner buy-in is not discussed. OR candidate does not reflect on growth as an equity-driven leader and/or does not address equity needs or gaps for the identified group. OR candidate does not refer to evidence from Steps 1, 2, and/or 3. OR candidate does not discuss strengths or future growth.'],
      ['2', 'Candidate provides limited insight into why they selected the leader for feedback and how feedback affected buy-in. Candidate vaguely reflects on growth and minimally discusses ability to address equity needs or gaps using evidence from Steps 1, 2, and/or 3. Candidate does not clearly explain strengths and/or vaguely mentions future growth.'],
      ['3', 'Candidate clearly explains the rationale for selecting the leader and how feedback affected the approach to buy-in. Candidate clearly reflects on growth as an equity-driven leader and discusses ability to address equity needs and gaps using specific, relevant evidence from Steps 1, 2, and/or 3. Candidate clearly explains strengths and identifies future growth areas.'],
      ['4', 'All of Level 3, plus: Candidate reflection demonstrates how the school context, including social, economic, or cultural contexts, affects the approach to equity-driven leadership.'],
      ['5', 'All of Levels 3 and 4, plus: Candidate uses experiences from Steps 1, 2, and 3 in confronting equity issues and gaps to describe what leadership skills were learned and how those skills may be used in the future.']
    ]]
  };

  window.CYCLE1_DETAIL = {limits, sharedFormatting, parts, rubrics};
})();
