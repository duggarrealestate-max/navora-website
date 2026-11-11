import { useState, useCallback } from 'react';
import { DiscoveryForm } from '../components/DiscoveryForm';
import { BlueprintResult } from '../components/BlueprintResult';
import { InternalReport } from '../components/InternalReport';
import { buildBlueprint } from '../engine/assessment';
import { LocalDiscoveryRepository } from '../storage/repository';
import type { DiscoverySubmission, TradePilotBlueprint } from '../types';
import { useSearchParams } from 'react-router-dom';

const repository = new LocalDiscoveryRepository();

export function DiscoveryPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const [submission, setSubmission] = useState<DiscoverySubmission | null>(null);
  const [blueprint, setBlueprint] = useState<TradePilotBlueprint | null>(null);
  const [loading, setLoading] = useState(false);

  const view = searchParams.get('view');

  const handleComplete = useCallback(async (sub: DiscoverySubmission) => {
    setLoading(true);
    try {
      await repository.saveSubmission(sub);
      const bp = buildBlueprint(sub);
      await repository.saveBlueprint(bp);
      setSubmission(sub);
      setBlueprint(bp);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-text-tertiary">Generating your TradePilot Business Blueprint...</div>
      </div>
    );
  }

  if (view === 'internal' && blueprint) {
    return <InternalReport blueprint={blueprint} onBack={() => setBlueprint(null)} />;
  }

  if (blueprint && submission) {
    return <BlueprintResult blueprint={blueprint} onBack={() => { setBlueprint(null); setSubmission(null); }} />;
  }

  return <DiscoveryForm onComplete={handleComplete} />;
}
