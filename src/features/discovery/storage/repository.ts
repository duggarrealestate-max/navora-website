import type { DiscoveryRepository, DiscoverySubmission, TradePilotBlueprint } from '../types';

const STORAGE_KEYS = {
  draft: 'trade-pilot-discovery-draft',
  submission: (id: string) => `trade-pilot-discovery-submission-${id}`,
  blueprint: (id: string) => `trade-pilot-discovery-blueprint-${id}`,
} as const;

export class LocalDiscoveryRepository implements DiscoveryRepository {
  async saveDraft(submission: Partial<DiscoverySubmission>): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(submission));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }

  async loadDraft(): Promise<Partial<DiscoverySubmission> | null> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.draft);
      if (!raw) return null;
      return JSON.parse(raw) as Partial<DiscoverySubmission>;
    } catch {
      return null;
    }
  }

  async saveSubmission(submission: DiscoverySubmission): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.submission(submission.id), JSON.stringify(submission));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }

  async loadSubmission(id: string): Promise<DiscoverySubmission | null> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.submission(id));
      if (!raw) return null;
      return JSON.parse(raw) as DiscoverySubmission;
    } catch {
      return null;
    }
  }

  async saveBlueprint(blueprint: TradePilotBlueprint): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.blueprint(blueprint.id), JSON.stringify(blueprint));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }

  async loadBlueprint(id: string): Promise<TradePilotBlueprint | null> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.blueprint(id));
      if (!raw) return null;
      return JSON.parse(raw) as TradePilotBlueprint;
    } catch {
      return null;
    }
  }
}
