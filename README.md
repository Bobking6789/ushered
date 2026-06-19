<div align="center">

# Ushered

### A family health advocacy platform for the people who can't advocate for themselves.

**[Live Demo →](https://bobking6789.github.io/ushered/)**

*Daily check-ins · Medication adherence · Pain triage · AI-assisted health insights*

</div>

---

## The Problem

Chronic conditions like hypertension are called *silent killers* for a reason. They are largely asymptomatic until the moment they are catastrophic. An estimated **1.28 billion adults worldwide live with high blood pressure, and nearly half do not know they have it** (WHO, 2023). Among those who are diagnosed, long-term medication adherence for chronic disease hovers around **50%** (WHO) — and the consequences fall hardest on elderly patients who live alone, distrust their diagnosis, or simply insist they feel "fine."

The clinical gap is not always knowledge. It is **advocacy**: the daily, unglamorous work of someone noticing a missed dose, a low mood, a new pain, and acting on it before it becomes an emergency room visit.

Ushered is built to close that gap by turning a family member into a low-friction, always-on health advocate.

## The Story Behind It

> My grandfather passed away from high blood pressure, which he refused to treat because he thought he was fine. My grandmother had a similar denial — but this time my family stepped in and got her treatment. She is alive today.
>
> The only difference between them was that someone advocated for her. Ushered exists so that every grandparent can have that someone, before a silent condition becomes a life-changing emergency.

## What It Does

Ushered is a single application with two coordinated experiences sharing one source of truth.

### Elder Mode — designed for low-friction, low-vision, low-tech-literacy use
- **One-tap daily check-in** on a five-point mood scale with emoji and bilingual labels
- **Medication tracking** against a personalized regimen, with dosage times
- **Pain triage** capturing location and a 1–5 severity scale, with automatic escalation prompts at severe levels
- **Emergency button** that surfaces clear, calm next-steps and notifies family
- Large tap targets, high contrast, and **full English + Hindi (Devanagari) bilingual UI** to lower the barrier for immigrant elders

### Family Mode — a caregiver dashboard
- **Status at a glance**: last check-in time, current mood, medication adherence ratio, pain level
- **Tiered alerting** that distinguishes informational, warning, and critical signals (e.g. *missed check-in > 24h*, *severe pain reported*, *sustained low mood*)
- **Activity timeline** aggregating check-ins, doses, and pain reports chronologically
- **Customizable "Watch For" rules** so families can encode condition-specific warning signs
- **AI Health Advocate** — summarizes recent patterns into warm, specific, actionable guidance (never a substitute for professional care)

## Design Principles

| Principle | How it shows up |
|-----------|-----------------|
| **Accessibility first** | Oversized controls, high-contrast palette, emoji-anchored choices, bilingual copy |
| **Low cognitive load** | One primary action per screen; progressive setup; no jargon |
| **Trust & safety** | Severity-aware escalation; AI explicitly framed as advisory, not diagnostic |
| **Zero-friction deployment** | Pure client-side app — no install, no account, runs from a single file |

## Technical Overview

Ushered is intentionally built as a **dependency-free, single-file web application** — a deliberate engineering constraint that makes it trivially portable, auditable, and deployable anywhere a browser exists.

- **Stack**: vanilla HTML, CSS, and JavaScript — no frameworks, no build step
- **Persistence**: client-side `localStorage`, keeping all health data on-device by default (privacy-preserving by design)
- **Architecture**: a lightweight single-page screen router toggles between Setup, Elder, Family, Settings, and Story views from one DOM tree
- **State model**: two serialized stores — `config` (identity, regimen, conditions, custom rules) and `data` (check-ins, doses, pain reports) — with derived views computed on render
- **AI layer**: integrates the Anthropic Messages API to convert structured longitudinal data into natural-language caregiver guidance
- **Animation/UX**: scroll-triggered reveals and stateful panels implemented with the IntersectionObserver/transition primitives rather than libraries

### Run it locally
```bash
git clone https://github.com/bobking6789/ushered.git
cd ushered
open index.html        # or: python3 -m http.server 8000
```
No dependencies. No configuration. It just runs.

## Roadmap

- Real-time push notifications to caregivers (web push / SMS gateway)
- Multi-elder and multi-caregiver households with role-based access
- Trend analytics: blood-pressure logging, adherence streaks, mood trajectories
- Clinician-shareable summaries (PDF export) for appointments
- Optional encrypted cloud sync for cross-device continuity

## A Note on Scope

Ushered is a working prototype that takes a real, measurable clinical problem — chronic-disease non-adherence in elderly populations — and addresses it at the human layer where most digital health tools don't: the relationship between a patient and the family member who loves them. It is not a medical device and does not replace professional care. It is a tool to help people *notice in time.*

---

<div align="center">

*Built for my grandfather, my grandmother, and every family that deserves a second chance.*

</div>
