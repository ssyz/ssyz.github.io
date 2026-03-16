# Hidden Grade-Level Risk in AI Learning Products

## What a 900-evaluation study means for AI product teams and school procurement

## Executive Summary

Generative AI is entering classrooms faster than its quality is being independently verified.
We tested how well leading AI models actually generate grade-appropriate content for elementary classrooms — and how reliably AI systems can evaluate that content.

Across 900 structured evaluations of AI-generated 3rd-grade passages:

- Model choice produced a **38-percentage-point difference** in grade-level accuracy
- All failures were systematically **above grade level**, not below
- Science content was significantly harder to generate at appropriate complexity
- AI systems showed measurable **self-evaluation bias** — ranging from +11pp to -21.5pp — underscoring the need for cross-model evaluation

These findings suggest that grade-level alignment is not a solved problem, even for frontier models. As a result, **independent evaluation infrastructure is becoming a core requirement for trustworthy AI-enabled learning products**.

OurDojo conducted this study as part of its GLA benchmark program, which provides independent, standardized evaluation data for the AI-in-education ecosystem.

---

## Why this matters now

AI adoption in education is accelerating across lesson planning tools, adaptive learning systems, tutoring and content generation platforms, and assessment workflows. However, most AI quality claims remain internally validated, non-standardized, and difficult for buyers to compare.

Districts are making adoption decisions faster than they can verify vendor quality claims. Grade-level alignment is a foundational dimension of educational quality. When AI-generated content is systematically too complex, comprehension declines, equity gaps may widen, teachers lose trust, and procurement risk increases. Independent evaluation is therefore emerging as a **shared infrastructure need across the AI learning ecosystem**.

## Study Design

We generated 100 expository passages (Grades 2–3) across Science and Social Studies using three frontier models, then had each model judge all 300 passages — producing a full 3×3 matrix of 900 evaluations. For the complete methodology, data tables, and limitations, see [Benchmark Note #2: Frontier Model Performance on Grade-Level Accuracy](gla-frontier-accuracy.md).

## Five Risks the Data Reveals

### 1. Your model choice may be your biggest quality risk

The 38-percentage-point gap between generators is the single largest source of variation in this study. Gemini 2.5 Pro achieved 98.7% grade-level accuracy; Claude 4.6 Opus scored 60.7%. For product teams, this means generator selection is not a backend implementation detail — it is a pedagogical design decision that directly determines whether students receive appropriately leveled content.

### 2. Failures skew hard, not easy — and teachers may not catch it

Across all 900 evaluations, every failure was categorized as "too hard." No content was ever judged too easy. This creates a consistent upward complexity bias — content that looks right but reads above grade level. Without structured evaluation, this systematic drift is difficult for teachers to detect because the content is topically appropriate and only marginally too complex.

### 3. Science content is a reliability gap

Science passages showed significantly lower grade-level accuracy than Social Studies:

- Science overall pass rate: **71.1%**
- Social Studies overall pass rate: **83.5%**
- Gap: **12.4 percentage points**

Scientific domains require technical vocabulary that is difficult to simplify without distorting meaning. For AI learning products covering STEM, subject-specific evaluation is not optional — it is where the highest failure rates concentrate.

### 4. Your QA model shapes your reported quality

Judge models varied substantially in strictness:

| Judge | Pass Rate |
| :---- | :---- |
| Gemini Judge | 87.0% |
| Claude Judge | 83.0% |
| GPT Judge | 65.7% |

The 21-percentage-point spread means that if your product relies on a single AI model for quality assurance, your reported quality is an artifact of which judge you chose. Evaluation methodology design can materially shape perceived product quality.

### 5. Self-evaluation is unreliable — in both directions

Models showed measurably different tendencies when evaluating their own outputs:

- Claude self-evaluated **11 percentage points higher** than external judges rated it
- GPT self-evaluated **21.5 percentage points lower** than external judges rated it
- Gemini showed near-neutral behavior (+2pp), though its near-perfect generation rate limits the signal

Self-evaluation bias is not consistently positive or negative, which means internal evaluation alone cannot ensure credibility — the direction and magnitude of the distortion are unpredictable without cross-model validation.

## What AI Product Teams Should Do Now

### Audit your generation pipeline
- Identify which models power your content generation
- Benchmark each model against grade-level standards using independent evaluation
- Establish per-subject baselines — especially for Science and other domain-heavy content

### Build evaluation into your development process
- Treat grade-level accuracy as a product metric, not just a pedagogical concern
- Implement multi-judge evaluation to avoid single-model bias in QA
- Monitor for regression when models are updated or swapped

### Treat grade-level alignment as a UX metric
- Track grade-level accuracy alongside engagement, completion, and satisfaction
- When content is too complex, perceived product quality declines and teacher intervention increases

### Prepare for independent benchmarking
- Procurement teams are increasingly requesting third-party performance evidence
- Proactive benchmarking positions your product for vendor evaluation processes

## What Districts and Procurement Leaders Should Ask

### Questions for vendors
- What model(s) power your content generation?
- How do you evaluate grade-level accuracy, and with what tools?
- Can you provide independent evaluation data — not just internal metrics?
- What is your STEM-specific performance, and how does it compare to other subjects?
- How do model updates affect content quality, and how do you monitor for regression?

### Evaluation criteria for procurement
- Require methodology disclosure — how is "grade-appropriate" defined and measured?
- Prioritize vendors who can provide independent benchmark data
- Request subject-specific performance breakdowns, not just aggregate scores
- Include quality monitoring provisions in pilot agreements

### Risk framing
Grade-level misalignment is measurable and addressable — but only if you measure it. The 38-percentage-point variance across models means that vendor selection directly impacts instructional quality. This is not a theoretical concern; it is a quantifiable product risk.

## How OurDojo Helps

OurDojo provides the independent evaluation layer that product teams and districts need:

- **Standardized benchmark evaluations** using research-informed frameworks
- **Cross-model evaluation infrastructure** that eliminates single-judge bias
- **Published benchmark datasets** for tool-to-tool comparison
- **Ongoing monitoring** as models and products update

The GLA benchmark dataset currently includes standardized evaluations of frontier language models, teacher-facing AI platforms, and curriculum support tools. For more information, contact hello@ourdojo.org.

## Conclusion

Product teams shipping AI learning tools without independent benchmarks cannot verify the quality of what they deliver. Districts procuring AI tools without independent evidence are making consequential decisions blind.

The data is clear: a 38-percentage-point generator gap, a 21-percentage-point judge gap, and self-evaluation biases up to 21.5 percentage points mean that internal testing alone is insufficient. The tools to measure and address these risks exist now. The question is whether the ecosystem will use them before students are affected.

