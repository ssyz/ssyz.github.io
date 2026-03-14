# Frontier Model Performance on Grade-Level Accuracy

## Why independent evaluation infrastructure is becoming essential for AI in K-12

## Executive Summary

Generative AI is entering classrooms faster than its quality is being independently verified.  
This study evaluates how leading frontier models perform when generating elementary-grade instructional content, and how reliably AI systems can evaluate that content.

Across 900 structured evaluations of AI-generated 3rd-grade passages:

- Model choice produced a **38-percentage-point difference** in grade-level accuracy  
- All failures were systematically **above grade level**, not below  
- Science content was significantly harder to generate at appropriate complexity  
- AI systems showed measurable **self-evaluation bias**, underscoring the need for cross-model evaluation

These findings suggest that grade-level alignment is not a solved problem, even for frontier models. As a result, **independent evaluation infrastructure is becoming a core requirement for trustworthy AI-enabled learning products**.

This analysis is part of the OurDojo Grade Level Appropriateness (GLA) benchmark framework, which aims to make AI quality claims testable for both product teams and procurement leaders.

---

## Why this matters now

AI adoption in education is accelerating across lesson planning tools, adaptive learning systems, tutoring and content generation platforms, and assessment workflows. However, most AI quality claims remain internally validated, non-standardized, and difficult for buyers to compare.

Grade-level alignment is a foundational dimension of educational quality. When AI-generated content is systematically too complex, comprehension declines, equity gaps may widen, teachers lose trust, and procurement risk increases. Independent evaluation is therefore emerging as a **shared infrastructure need across the AI learning ecosystem**.

## Study Design

This study benchmarks the ability of three frontier language models to generate grade-appropriate instructional passages and to evaluate such passages.

### Corpus

- 100 expository passages targeting Grades 2–3  
- Subjects: Science (40), Social Studies (60)  
- Categories aligned with elementary curriculum domains

### Evaluation Matrix

Each passage was:

1. Generated independently by three frontier models  
2. Evaluated by each model acting as an AI judge

This produced a full **3×3 evaluation matrix (900 evaluations)** enabling analysis of generator performance and judge behavior. This structured multi-judge approach reflects the methodology used across the OurDojo GLA benchmark dataset.

## Key Findings

### 1\. Model choice materially affects grade-level accuracy

A 38-percentage-point gap was observed between the highest- and lowest-performing generators.

This level of variation is large enough to change the effective accessibility of AI-generated content, alter classroom usability, and introduce hidden product risk. For product teams, generator selection is therefore not purely a technical decision, but a fundamental **pedagogical design choice**.

### 2\. Grade-level failures were systematic, not random

Across all 900 evaluations every failure was categorized as “too hard”, and no content was judged “too easy”. In practice, this creates a consistent upward complexity bias that may be difficult for teachers to detect without structured evaluation.

### 3\. Science content is structurally harder to simplify

Science passages showed significantly lower grade-level accuracy than Social Studies.

- Science overall pass rate: **71.1%**  
- Social Studies overall pass rate: **83.5%**  
- Gap: **12.4 percentage points**

This reflects a multi-dimensional challenge because scientific domains require technical terminology, simplification can risk conceptual distortion, and model prompting alone may not reliably resolve this tension. For AI learning tools, this implies that subject-specific evaluation pipelines may be necessary and domain-adaptive generation strategies should be prioritized.

### 4\. AI systems evaluate content differently

Judge models varied substantially in strictness:

| Judge | Pass Rate |
| :---- | :---- |
| Gemini Judge | 87.0% |
| Claude Judge | 83.0% |
| GPT Judge | 65.7% |

This reinforces evidence that LLM-as-judge results are model-dependent and consensus-based evaluation improves reliability.

Evaluation methodology design can therefore materially shape perceived product quality.

### 5\. Self-evaluation bias is real and non-uniform

Models showed different tendencies when evaluating their own outputs. Observed patterns included: mild positive self-bias, strong negative self-bias, and near-neutral behavior. 

This confirms that cross-model evaluation should be standard practice, and that internal evaluation alone cannot ensure credibility.

## Implications for AI Product Teams

### Evaluation must become product infrastructure

Quality can only be ensured with thorough evaluation processes, including standardized benchmarks, external validation layers, and longitudinal quality monitoring.

### Grade-level alignment is a UX issue

When content is too complex, perceived product intelligence declines, teacher intervention increases, and student outcomes may be affected. Grade-level evaluation is therefore both a pedagogical safeguard and a product performance metric.

### Model improvements will not fully solve alignment

Frontier model progress alone is unlikely to eliminate domain-specific complexity challenges, evaluation bias dynamics, or curriculum alignment gaps. Systematic evaluation complements, rather than replaces, model innovation.

## Implications for Districts and Procurement Leaders

### AI quality claims require independent verification

Model-dependent variability means that vendor-reported performance may not generalize, evaluation methodology transparency is essential, and cross-tool comparability is currently limited.

### Grade-level alignment is a measurable dimension of risk

Misaligned content may affect accessibility, instructional coherence, and implementation success. Structured benchmarks provide a way to compare tools consistently, inform adoption decisions, and support accountability frameworks.

## The Role of Shared Evaluation Infrastructure

As AI becomes embedded in core learning workflows, the ecosystem is beginning to converge on the need for common quality metrics, reproducible evaluation protocols, and trusted third-party evidence.

The OurDojo Grade Level Appropriateness benchmark program helps define this emerging layer by operationalizing research-informed evaluation frameworks, conducting cross-tool benchmarking studies, and publishing structured datasets for ecosystem use. The GLA benchmark dataset currently includes standardized evaluations of frontier language models, teacher-facing AI platforms, and curriculum support tools. Additional benchmarks are forthcoming.

## Conclusion

Generating grade-appropriate educational content remains a non-trivial challenge, even for leading frontier models.

Variation across generators, evaluators, and subject domains suggests that AI learning quality cannot be assumed, that evaluation design materially affects conclusions, and that independent evidence layers will play an increasing role in the sector.

As AI adoption accelerates, systematic evaluation is a foundational component of responsible deployment \- supporting both product innovation and informed decision-making.

OurDojo GLA Framework Attribution Statement  
This evaluation applies the open-source Grade Level Appropriateness Evaluator developed by Learning Commons; OurDojo independently designed the study protocol, operationalized the framework at scale, and conducted the cross-tool benchmarking analysis presented here.

## Appendix A. Generator Performance Detail

The most striking finding is the 38-percentage-point gap between the best and worst generator. Gemini 2.5 Pro achieved near-perfect grade-level accuracy at 98.7%, while Claude 4.6 Opus landed at 60.7%, which is a gap large enough to meaningfully affect classroom outcomes.

| Generator | Claude Judge | Gemini Judge | GPT-5.1 Judge | Average |
| :---- | :---- | :---- | :---- | :---- |
| **Gemini 2.5 Pro** | 100.0% | 100.0% | 96.0% | **98.7%** |
| **GPT-5.1** | 81.0% | 86.0% | 62.0% | **76.3%** |
| **Claude 4.6 Opus** | 68.0% | 75.0% | 39.0% | **60.7%** |

Every single failure across all 900 evaluations was categorized as "Too Hard". No passage was ever judged too easy. Moreover, all 193 failed passages still fell within the alternative-or-target grade band (K–3), meaning failures represent content that is above grade level but not wildly so. The challenge is typically elevated vocabulary or complex sentence structure, not fundamentally misaligned content.

## Appendix B. Judge Behavior and Agreement Detail

### Judge Severity

Judges varied substantially in how strictly they applied grade-level standards, with a 21.3-percentage-point spread between the most lenient and most strict.

| Judge | Pass Rate (across all generators) | Characterization |
| :---- | :---- | :---- |
| Gemini 2.5 Pro | 87.0% (261/300) | Most lenient |
| Claude 4.6 Opus | 83.0% (249/300) | Moderate |
| GPT-5.1 | 65.7% (197/300) | Strictest |

GPT-5.1 applied notably higher standards, failing more than a third of all content it reviewed. This severity was consistent across generators: GPT-5.1 gave the lowest pass rate to every generator's content.

### Judge Agreement

When all three judges evaluated the same content, agreement patterns varied dramatically by generator.

| Generator Content | Unanimous Pass | Unanimous Fail | Split Decision |
| :---- | :---- | :---- | :---- |
| Gemini 2.5 Pro | 96% | 0% | 4% |
| GPT-5.1 | 58% | 8% | 34% |
| Claude 4.6 Opus | 37% | 20% | 43% |

Gemini's content achieved near-total consensus with 96% of passages approved by all three judges. Claude's content, by contrast, produced a unanimous pass on only 37% of passages, with 43% triggering split decisions where judges disagreed. This suggests that lower-performing generators produce content that sits closer to the grade-level boundary, where reasonable evaluators can disagree.