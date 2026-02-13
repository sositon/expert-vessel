export interface ReadinessInput {
  requiredSections: string[];
  presentSections: string[];
  generatedDraft: string;
  requiredFacts: string[];
  exemplarSimilarities: number[];
}

export interface ReadinessBreakdown {
  structure: number;
  completeness: number;
  style: number;
  total: number;
}

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(max, Math.max(min, value));

const calculateStructureScore = (required: string[], present: string[]): number => {
  if (required.length === 0) {
    return 100;
  }

  const found = required.filter((section) => present.includes(section)).length;
  return clamp((found / required.length) * 100);
};

const calculateCompletenessScore = (requiredFacts: string[], draft: string): number => {
  if (requiredFacts.length === 0) {
    return 100;
  }

  const factsPresent = requiredFacts.filter((fact) => draft.includes(fact)).length;
  const placeholderPenalty = (draft.match(/\[\[חסר:/g) ?? []).length * 8;

  return clamp((factsPresent / requiredFacts.length) * 100 - placeholderPenalty);
};

const calculateStyleScore = (similarities: number[]): number => {
  if (similarities.length === 0) {
    return 50;
  }

  const avg = similarities.reduce((sum, value) => sum + value, 0) / similarities.length;
  return clamp(avg * 100);
};

export const calculateReadinessScore = (input: ReadinessInput): ReadinessBreakdown => {
  const structure = calculateStructureScore(input.requiredSections, input.presentSections);
  const completeness = calculateCompletenessScore(input.requiredFacts, input.generatedDraft);
  const style = calculateStyleScore(input.exemplarSimilarities);

  const total = clamp(structure * 0.35 + completeness * 0.45 + style * 0.2);

  return {
    structure,
    completeness,
    style,
    total,
  };
};
