export type AnswerValue =
  | string
  | string[]
  | number
  | boolean
  | undefined;

export interface DiscoveryAnswer {
  questionId: string;
  sectionId: string;
  value: AnswerValue;
}

export type QuestionType =
  | 'text'
  | 'email'
  | 'phone'
  | 'select'
  | 'multiselect'
  | 'textarea'
  | 'radio';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface DiscoveryQuestion {
  id: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: QuestionOption[];
  maxSelections?: number;
  conditionalOn?: {
    questionId: string;
    value: string | string[];
  };
}

export interface DiscoverySection {
  id: string;
  title: string;
  description?: string;
  questions: DiscoveryQuestion[];
}

export interface QuestionnaireDefinition {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  sections: DiscoverySection[];
}

export interface DiscoverySubmission {
  id: string;
  submittedAt: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  wholesaleCategory: string;
  answers: DiscoveryAnswer[];
}

export type ScoreLevel = 'Low' | 'Medium' | 'High';

export interface AssessmentScore {
  dimension: string;
  level: ScoreLevel;
  rawScore: number;
  maxScore: number;
  rationale: string;
}

export type RecommendationCategory =
  | 'ordering'
  | 'pricing'
  | 'inventory'
  | 'customers'
  | 'retention'
  | 'credit'
  | 'portal'
  | 'automation'
  | 'integration'
  | 'ai';

export interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  description: string;
  rationale: string;
  priority: 'Phase 1' | 'Phase 2' | 'Future';
  moduleTag: string;
}

export interface TriggeredRule {
  ruleId: string;
  description: string;
  condition: string;
}

export interface IntegrationFlag {
  system: string;
  action: 'keep' | 'connect' | 'assess' | 'replace';
  rationale: string;
}

export type ImplementationComplexity = 'Low' | 'Medium' | 'High';

export interface TradePilotBlueprint {
  id: string;
  submissionId: string;
  generatedAt: string;
  businessName: string;
  contactName: string;
  scores: AssessmentScore[];
  recommendations: Recommendation[];
  triggeredRules: TriggeredRule[];
  integrationFlags: IntegrationFlag[];
  implementationComplexity: ImplementationComplexity;
  requiresTechnicalReview: boolean;
  currentSignals: Array<{
    label: string;
    level: ScoreLevel;
    detail: string;
  }>;
  priorityRoadmap: {
    phase1: Recommendation[];
    phase2: Recommendation[];
    future: Recommendation[];
  };
  missingInformation: string[];
  suggestedDiscoveryQuestions: string[];
  disclaimer: string;
}

export interface DiscoveryRepository {
  saveDraft(submission: Partial<DiscoverySubmission>): Promise<void>;
  loadDraft(): Promise<Partial<DiscoverySubmission> | null>;
  saveSubmission(submission: DiscoverySubmission): Promise<void>;
  loadSubmission(id: string): Promise<DiscoverySubmission | null>;
  saveBlueprint(blueprint: TradePilotBlueprint): Promise<void>;
  loadBlueprint(id: string): Promise<TradePilotBlueprint | null>;
}
