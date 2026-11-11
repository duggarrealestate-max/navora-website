import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Button } from '@design/components/Button';
import type { TradePilotBlueprint } from '../types';

interface InternalReportProps {
  blueprint: TradePilotBlueprint;
  onBack: () => void;
}

export function InternalReport({ blueprint, onBack }: InternalReportProps): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-error/15 text-error text-xs font-medium rounded-md mb-2">
            Internal Sales Report
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Discovery Report — {blueprint.businessName}</h1>
          <p className="text-sm text-text-secondary mt-1">
            Generated: {new Date(blueprint.generatedAt).toLocaleString('en-GB')} • Contact: {blueprint.contactName}
          </p>
        </div>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Implementation Complexity</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{blueprint.implementationComplexity}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Technical Review Required</p>
          <p className="text-2xl font-bold mt-1" style={{ color: blueprint.requiresTechnicalReview ? 'var(--color-error)' : 'var(--color-success)' }}>
            {blueprint.requiresTechnicalReview ? 'Yes' : 'No'}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Modules Recommended</p>
          <p className="text-2xl font-bold text-primary mt-1">{blueprint.recommendations.length}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Assessment Dimensions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {blueprint.scores.map((score) => (
            <div key={score.dimension} className="p-3 bg-background-secondary rounded-md">
              <p className="text-xs text-text-tertiary">{score.dimension}</p>
              <p className="text-sm font-bold text-text-primary mt-1">{score.level}</p>
              <p className="text-[10px] text-text-tertiary mt-0.5">{score.rationale}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Triggered Rules</h3>
        <div className="space-y-2">
          {blueprint.triggeredRules.map((rule) => (
            <div key={rule.ruleId} className="flex items-start gap-3 p-3 bg-background-secondary rounded-md">
              <div className="flex-1">
                <p className="text-sm text-text-primary">{rule.description}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{rule.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Integration Assessment</h3>
        <div className="space-y-2">
          {blueprint.integrationFlags.map((flag, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-background-secondary rounded-md">
              <div>
                <p className="text-sm text-text-primary">{flag.system}</p>
                <p className="text-xs text-text-tertiary">{flag.rationale}</p>
              </div>
              <Badge
                variant={flag.action === 'keep' ? 'success' : flag.action === 'connect' ? 'info' : flag.action === 'assess' ? 'warning' : 'error'}
                size="sm"
              >
                {flag.action.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Priority Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Phase 1</h4>
            <div className="space-y-2">
              {blueprint.priorityRoadmap.phase1.map((rec) => (
                <div key={rec.id} className="p-3 bg-background-secondary rounded-md border-l-2 border-primary">
                  <p className="text-sm font-medium text-text-primary">{rec.title}</p>
                  <p className="text-xs text-text-tertiary">{rec.moduleTag}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Phase 2</h4>
            <div className="space-y-2">
              {blueprint.priorityRoadmap.phase2.map((rec) => (
                <div key={rec.id} className="p-3 bg-background-secondary rounded-md border-l-2 border-secondary">
                  <p className="text-sm font-medium text-text-primary">{rec.title}</p>
                  <p className="text-xs text-text-tertiary">{rec.moduleTag}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Future</h4>
            <div className="space-y-2">
              {blueprint.priorityRoadmap.future.map((rec) => (
                <div key={rec.id} className="p-3 bg-background-secondary rounded-md border-l-2 border-border">
                  <p className="text-sm font-medium text-text-primary">{rec.title}</p>
                  <p className="text-xs text-text-tertiary">{rec.moduleTag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Missing Information</h3>
        {blueprint.missingInformation.length > 0 ? (
          <ul className="space-y-2">
            {blueprint.missingInformation.map((item, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-warning mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-tertiary">No critical gaps identified.</p>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Suggested Discovery Call Questions</h3>
        <ul className="space-y-2">
          {blueprint.suggestedDiscoveryQuestions.map((q, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              {q}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 bg-background-secondary">
        <p className="text-xs text-text-tertiary">{blueprint.disclaimer}</p>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>← Back to Discovery</Button>
        <Button onClick={() => window.print()}>Print Report</Button>
      </div>
    </div>
  );
}
