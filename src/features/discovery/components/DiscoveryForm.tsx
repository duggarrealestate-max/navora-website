import { useState, useEffect, useMemo } from 'react';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Input } from '@design/components/Input';
import { Select } from '@design/components/Select';
import { discoveryQuestionnaire } from '../data/questionnaire';
import { exampleBusiness } from '../data/example-business';
import type { DiscoverySubmission, DiscoveryAnswer, QuestionnaireDefinition } from '../types';
import { LocalDiscoveryRepository } from '../storage/repository';

const repository = new LocalDiscoveryRepository();

interface DiscoveryFormProps {
  onComplete: (submission: DiscoverySubmission) => void;
}

export function DiscoveryForm({ onComplete }: DiscoveryFormProps): JSX.Element {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<DiscoveryAnswer[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const draft = await repository.loadDraft();
      if (draft && draft.answers && !cancelled) {
        setAnswers(draft.answers);
      }
      setIsLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      repository.saveDraft({ answers } as Partial<DiscoverySubmission>);
    }
  }, [answers, isLoading]);

  const sections = discoveryQuestionnaire.sections;
  const section = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  const visibleQuestions = useMemo(() => {
      return section.questions.filter((q) => {
        if (!q.conditionalOn) return true;
        const conditionalAnswer = answers.find((a) => a.questionId === q.conditionalOn!.questionId);
        if (!conditionalAnswer) return false;
        if (Array.isArray(conditionalAnswer.value)) {
          return conditionalAnswer.value.some((v) => q.conditionalOn!.value.includes(v as string));
        }
        return q.conditionalOn.value.includes(conditionalAnswer.value as string);
      });
  }, [section, answers]);

  const handleAnswer = (questionId: string, value: DiscoveryAnswer['value']) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) => (a.questionId === questionId ? { ...a, value } : a));
      }
      return [...prev, { questionId, sectionId: section.id, value }];
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const getAnswerValue = (questionId: string): DiscoveryAnswer['value'] => {
    return answers.find((a) => a.questionId === questionId)?.value;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const q of visibleQuestions) {
      if (q.required) {
        const val = getAnswerValue(q.id);
        if (val === undefined || val === '' || (Array.isArray(val) && val.length === 0)) {
          newErrors[q.id] = 'This field is required';
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate() && currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const submission: DiscoverySubmission = {
      id: `disc-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      businessName: getAnswerValue('businessName') as string,
      contactName: getAnswerValue('contactName') as string,
      email: getAnswerValue('email') as string,
      phone: getAnswerValue('phone') as string,
      wholesaleCategory: getAnswerValue('wholesaleCategory') as string,
      answers,
    };
    onComplete(submission);
  };

  const loadExample = async () => {
    if (exampleBusiness.answers) {
      setAnswers(exampleBusiness.answers);
      await repository.saveDraft(exampleBusiness as Partial<DiscoverySubmission>);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-text-tertiary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">TradePilot Business Discovery</h1>
        <p className="text-sm text-text-secondary mt-2">
          A few questions about how your wholesale business works today. We'll use your answers to prepare a recommended TradePilot setup.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
          <span>Step {currentSection + 1} of {sections.length}</span>
          <span>{section.title}</span>
        </div>
        <div className="h-1 bg-background-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text-primary">{section.title}</h2>
          {section.description && (
            <p className="text-sm text-text-secondary mt-1">{section.description}</p>
          )}
        </div>

        <div className="space-y-5">
          {visibleQuestions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {q.label}
                {q.required && <span className="text-error ml-1">*</span>}
              </label>
              {renderInput(q, getAnswerValue(q.id), (val) => handleAnswer(q.id, val), errors[q.id])}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack} disabled={currentSection === 0}>
              ← Back
            </Button>
            <Button variant="ghost" size="sm" onClick={loadExample}>
              Load Example Business
            </Button>
          </div>

          {currentSection < sections.length - 1 ? (
            <Button onClick={handleNext}>Continue →</Button>
          ) : (
            <Button onClick={handleSubmit}>Generate Blueprint →</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function renderInput(
  question: QuestionnaireDefinition['sections'][0]['questions'][0],
  value: DiscoveryAnswer['value'],
  onChange: (val: DiscoveryAnswer['value']) => void,
  error?: string
): JSX.Element {
  if (question.type === 'text' || question.type === 'email' || question.type === 'phone') {
    return (
      <>
        <Input
          type={question.type}
          placeholder={question.placeholder}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          error={error}
        />
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </>
    );
  }

  if (question.type === 'textarea') {
    return (
      <>
        <textarea
          placeholder={question.placeholder}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all min-h-[100px]"
        />
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </>
    );
  }

  if (question.type === 'select') {
    return (
      <>
        <Select
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select...</option>
          {question.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </>
    );
  }

  if (question.type === 'radio') {
    return (
      <div className="space-y-2">
        {question.options?.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-all ${
              value === opt.value
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-border-hover'
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 border-border bg-surface text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-primary">{opt.label}</span>
          </label>
        ))}
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </div>
    );
  }

  if (question.type === 'multiselect') {
    const selected = (value as string[]) || [];
    const max = question.maxSelections || 99;
    const toggle = (optValue: string) => {
      if (selected.includes(optValue)) {
        onChange(selected.filter((v) => v !== optValue));
      } else if (selected.length < max) {
        onChange([...selected, optValue]);
      }
    };

    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {question.options?.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                disabled={!isSelected && selected.length >= max}
                className={`px-3 py-2 text-xs font-medium rounded-md border transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 text-primary'
                    : selected.length >= max
                      ? 'border-border text-text-tertiary opacity-50 cursor-not-allowed'
                      : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {max < 99 && (
          <p className="text-xs text-text-tertiary">{selected.length} of {max} selected</p>
        )}
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </div>
    );
  }

  return <div className="text-xs text-text-tertiary">Unsupported input type</div>;
}
