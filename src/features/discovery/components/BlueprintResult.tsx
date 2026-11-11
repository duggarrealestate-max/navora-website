import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Button } from '@design/components/Button';
import type { TradePilotBlueprint, ScoreLevel } from '../types';

const levelColors: Record<ScoreLevel, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'success',
};

interface BlueprintResultProps {
  blueprint: TradePilotBlueprint;
  onBack: () => void;
}

export function BlueprintResult({ blueprint, onBack }: BlueprintResultProps): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 text-primary text-xs font-medium rounded-md mb-4">
          TradePilot Business Blueprint
        </div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">{blueprint.businessName}</h1>
        <p className="text-sm text-text-secondary mt-2">
          Based on how your business operates today, these are the areas where TradePilot may create the most immediate value.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {blueprint.scores.slice(0, 8).map((score) => (
          <Card key={score.dimension} className="p-4">
            <p className="text-xs text-text-tertiary uppercase tracking-wider">{score.dimension}</p>
            <p className="text-lg font-bold text-text-primary mt-1">{score.level}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Current Business Signals</h3>
        <div className="space-y-3">
          {blueprint.currentSignals.map((signal, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary">{signal.label}</span>
                  <Badge variant={levelColors[signal.level]} size="sm">{signal.level}</Badge>
                </div>
                <p className="text-xs text-text-tertiary mt-0.5">{signal.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-1">Recommended TradePilot Phase 1</h3>
        <p className="text-xs text-text-tertiary mb-4">Highest-value immediate modules based on your answers.</p>
        <div className="space-y-3">
          {blueprint.priorityRoadmap.phase1.map((rec) => (
            <div key={rec.id} className="p-4 bg-background-secondary rounded-md border border-border">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-semibold text-text-primary">{rec.title}</h4>
                <Badge variant="primary" size="sm">{rec.moduleTag}</Badge>
              </div>
              <p className="text-xs text-text-secondary mb-2">{rec.description}</p>
              <p className="text-xs text-text-tertiary italic">"{rec.rationale}"</p>
            </div>
          ))}
          {blueprint.priorityRoadmap.phase1.length === 0 && (
            <p className="text-sm text-text-tertiary py-4 text-center">No Phase 1 recommendations triggered.</p>
          )}
        </div>
      </Card>

      {blueprint.priorityRoadmap.phase2.length > 0 && (
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Phase 2 — Expansion</h3>
          <p className="text-xs text-text-tertiary mb-4">Useful modules to add once core systems are live.</p>
          <div className="space-y-3">
            {blueprint.priorityRoadmap.phase2.map((rec) => (
              <div key={rec.id} className="p-4 bg-background-secondary rounded-md border border-border">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-semibold text-text-primary">{rec.title}</h4>
                  <Badge variant="outline" size="sm">{rec.moduleTag}</Badge>
                </div>
                <p className="text-xs text-text-secondary">{rec.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {blueprint.priorityRoadmap.future.length > 0 && (
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Future Enhancements</h3>
          <p className="text-xs text-text-tertiary mb-4">Optional advanced capabilities to consider later.</p>
          <div className="flex flex-wrap gap-2">
            {blueprint.priorityRoadmap.future.map((rec) => (
              <Badge key={rec.id} variant="outline">{rec.title}</Badge>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">How We Get From Here To Implementation</h3>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>1. <span className="text-text-primary font-medium">Discovery Call:</span> We review this blueprint with you to confirm priorities and answer questions.</p>
          <p>2. <span className="text-text-primary font-medium">Technical Assessment:</span> We evaluate any integrations required with your existing systems.</p>
          <p>3. <span className="text-text-primary font-medium">Proposal:</span> We provide a fixed-scope proposal and timeline based on Phase 1 modules.</p>
          <p>4. <span className="text-text-primary font-medium">Implementation:</span> We configure TradePilot, migrate data and train your team.</p>
        </div>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>← Back to Discovery</Button>
        <Button onClick={() => window.print()}>Print Blueprint</Button>
      </div>

      <p className="text-xs text-text-tertiary text-center pb-8">
        {blueprint.disclaimer}
      </p>
    </div>
  );
}
