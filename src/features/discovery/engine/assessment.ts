import type {
  DiscoveryAnswer,
  DiscoverySubmission,
  AssessmentScore,
  Recommendation,
  TriggeredRule,
  IntegrationFlag,
  TradePilotBlueprint,
  ScoreLevel,
  ImplementationComplexity,
} from '../types';

const SCORE_RULES: Array<{
  id: string;
  description: string;
  condition: (answers: DiscoveryAnswer[]) => boolean;
  dimension: string;
  points: number;
  rationale: string;
}> = [
  {
    id: 'order-whatsapp-phone',
    description: 'Orders placed via WhatsApp or Phone',
    condition: (answers) => {
      const channels = answers.find((a) => a.questionId === 'orderChannels')?.value;
      if (!channels || !Array.isArray(channels)) return false;
      return channels.includes('whatsapp') || channels.includes('phone');
    },
    dimension: 'Digital Ordering',
    points: 3,
    rationale: 'Manual order channels (WhatsApp/phone) create high admin overhead and ordering errors.',
  },
  {
    id: 'order-website-no-issue',
    description: 'Website ordering exists with no major reported issue',
    condition: (answers) => {
      const channels = answers.find((a) => a.questionId === 'orderChannels')?.value;
      const problem = answers.find((a) => a.questionId === 'orderProblem')?.value as string | undefined;
      if (!channels || !Array.isArray(channels)) return false;
      const hasWebsite = channels.includes('website');
      const hasProblem = problem && problem.trim().length > 10;
      return hasWebsite && !hasProblem;
    },
    dimension: 'Digital Ordering',
    points: -1,
    rationale: 'Existing website ordering appears adequate; do not prioritise replacement.',
  },
  {
    id: 'pricing-customer-specific',
    description: 'Customer-specific pricing in use',
    condition: (answers) => {
      const pricing = answers.find((a) => a.questionId === 'pricingModel')?.value;
      return pricing === 'customer-specific';
    },
    dimension: 'Pricing Complexity',
    points: 2,
    rationale: 'Customer-specific pricing requires a structured pricing engine to avoid manual errors.',
  },
  {
    id: 'pricing-tiers',
    description: 'Price tiers in use',
    condition: (answers) => {
      const pricing = answers.find((a) => a.questionId === 'pricingModel')?.value;
      return pricing === 'tiers';
    },
    dimension: 'Pricing Complexity',
    points: 1,
    rationale: 'Price groups can be managed more consistently with tier-based rules.',
  },
  {
    id: 'stock-excel-manual',
    description: 'Stock managed in Excel or manually',
    condition: (answers) => {
      const system = answers.find((a) => a.questionId === 'stockSystem')?.value;
      return system === 'excel' || system === 'manual';
    },
    dimension: 'Inventory Intelligence',
    points: 3,
    rationale: 'Spreadsheet or manual stock control creates risk of overselling and stockouts.',
  },
  {
    id: 'stock-erp-or-software',
    description: 'Stock managed in ERP or inventory software',
    condition: (answers) => {
      const system = answers.find((a) => a.questionId === 'stockSystem')?.value;
      return system === 'erp' || system === 'inventory-software' || system === 'accounting';
    },
    dimension: 'Inventory Intelligence',
    points: 1,
    rationale: 'Existing system should be assessed for integration rather than replacement.',
  },
  {
    id: 'stock-needs-dead-stock',
    description: 'Dead stock visibility needed',
    condition: (answers) => {
      const needs = answers.find((a) => a.questionId === 'stockNeeds')?.value;
      if (!needs || !Array.isArray(needs)) return false;
      return needs.includes('dead-stock');
    },
    dimension: 'Inventory Intelligence',
    points: 2,
    rationale: 'Dead stock directly ties up cash; identifying it creates immediate value.',
  },
  {
    id: 'stock-needs-low-stock',
    description: 'Low stock or reordering visibility needed',
    condition: (answers) => {
      const needs = answers.find((a) => a.questionId === 'stockNeeds')?.value;
      if (!needs || !Array.isArray(needs)) return false;
      return needs.includes('low-stock') || needs.includes('reordering');
    },
    dimension: 'Inventory Intelligence',
    points: 2,
    rationale: 'Proactive stock alerts reduce lost sales and emergency orders.',
  },
  {
    id: 'customer-data-fragmented',
    description: 'Customer data in multiple or manual systems',
    condition: (answers) => {
      const system = answers.find((a) => a.questionId === 'customerDataSystem')?.value;
      return system === 'multiple' || system === 'whatsapp-phones' || system === 'excel';
    },
    dimension: 'Customer Management',
    points: 3,
    rationale: 'Fragmented customer data makes retention and follow-up inconsistent.',
  },
  {
    id: 'dormant-detection-wanted',
    description: 'Automatic dormant customer detection desired',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'dormantCustomerDetection')?.value;
      return val === 'yes' || val === 'maybe';
    },
    dimension: 'Customer Retention',
    points: 2,
    rationale: 'Automated buying-cycle monitoring can recover revenue before customers drift away.',
  },
  {
    id: 'credit-sales',
    description: 'Sells on credit',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'sellOnCredit')?.value;
      return val === 'yes';
    },
    dimension: 'Credit Management',
    points: 2,
    rationale: 'Credit sales need structured visibility, statements, and follow-up automation.',
  },
  {
    id: 'retailer-credit-portal',
    description: 'Retailer credit portal desired',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'retailerCreditPortal')?.value;
      return val === 'yes' || val === 'maybe';
    },
    dimension: 'Credit Management',
    points: 1,
    rationale: 'Self-service credit visibility reduces admin queries and improves trust.',
  },
  {
    id: 'portal-24-7',
    description: '24/7 ordering requested in portal',
    condition: (answers) => {
      const features = answers.find((a) => a.questionId === 'portalFeatures')?.value;
      if (!features || !Array.isArray(features)) return false;
      return features.includes('place-orders');
    },
    dimension: 'Digital Ordering',
    points: 2,
    rationale: '24/7 self-service ordering captures orders outside business hours.',
  },
  {
    id: 'portal-reorder',
    description: 'Reorder previous orders requested',
    condition: (answers) => {
      const features = answers.find((a) => a.questionId === 'portalFeatures')?.value;
      if (!features || !Array.isArray(features)) return false;
      return features.includes('reorder');
    },
    dimension: 'Digital Ordering',
    points: 1,
    rationale: 'Quick reorder reduces friction for repeat purchases.',
  },
  {
    id: 'portal-invoices',
    description: 'Invoice/statement access requested',
    condition: (answers) => {
      const features = answers.find((a) => a.questionId === 'portalFeatures')?.value;
      if (!features || !Array.isArray(features)) return false;
      return features.includes('download-invoices');
    },
    dimension: 'Customer Management',
    points: 1,
    rationale: 'Self-service documents reduce accounts overhead.',
  },
  {
    id: 'portal-ai',
    description: 'AI order building requested',
    condition: (answers) => {
      const features = answers.find((a) => a.questionId === 'portalFeatures')?.value;
      if (!features || !Array.isArray(features)) return false;
      return features.includes('ai-order');
    },
    dimension: 'AI Opportunity',
    points: 1,
    rationale: 'AI-assisted ordering is valuable but may require additional integration work.',
  },
  {
    id: 'whatsapp-usage',
    description: 'WhatsApp used for orders or support',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'whatsappUsage')?.value;
      return val === 'yes';
    },
    dimension: 'Integration Complexity',
    points: 1,
    rationale: 'WhatsApp integration requires assessment of message volume and automation rules.',
  },
  {
    id: 'automation-payment-reminders',
    description: 'Payment reminders desired',
    condition: (answers) => {
      const items = answers.find((a) => a.questionId === 'automationDesires')?.value;
      if (!items || !Array.isArray(items)) return false;
      return items.includes('payment-reminders');
    },
    dimension: 'Automation Opportunity',
    points: 2,
    rationale: 'Payment reminder automation directly improves cash flow.',
  },
  {
    id: 'automation-dormant',
    description: 'Dormant customer follow-up desired',
    condition: (answers) => {
      const items = answers.find((a) => a.questionId === 'automationDesires')?.value;
      if (!items || !Array.isArray(items)) return false;
      return items.includes('dormant-followup');
    },
    dimension: 'Automation Opportunity',
    points: 2,
    rationale: 'Automated win-back campaigns recover lapsed revenue with minimal effort.',
  },
  {
    id: 'automation-low-stock',
    description: 'Low stock alerts desired',
    condition: (answers) => {
      const items = answers.find((a) => a.questionId === 'automationDesires')?.value;
      if (!items || !Array.isArray(items)) return false;
      return items.includes('low-stock-alerts');
    },
    dimension: 'Automation Opportunity',
    points: 1,
    rationale: 'Low stock alerts prevent stockouts and emergency reorders.',
  },
  {
    id: 'accounting-exists',
    description: 'Accounting software in use',
    condition: (answers) => {
      const systems = answers.find((a) => a.questionId === 'existingSystems')?.value;
      if (!systems || !Array.isArray(systems)) return false;
      return systems.includes('accounting');
    },
    dimension: 'Integration Complexity',
    points: 1,
    rationale: 'Accounting integration should be assessed for invoice and payment sync.',
  },
  {
    id: 'erp-exists',
    description: 'ERP system in use',
    condition: (answers) => {
      const systems = answers.find((a) => a.questionId === 'existingSystems')?.value;
      if (!systems || !Array.isArray(systems)) return false;
      return systems.includes('erp');
    },
    dimension: 'Integration Complexity',
    points: 2,
    rationale: 'ERP integration adds complexity and should be scoped carefully.',
  },
  {
    id: 'multiple-systems',
    description: 'Multiple systems in use',
    condition: (answers) => {
      const systems = answers.find((a) => a.questionId === 'existingSystems')?.value;
      if (!systems || !Array.isArray(systems)) return false;
      return systems.length >= 4;
    },
    dimension: 'Integration Complexity',
    points: 2,
    rationale: 'Multiple systems increase integration and data-synchronisation complexity.',
  },
];

const RECOMMENDATION_RULES: Array<{
  id: string;
  condition: (answers: DiscoveryAnswer[]) => boolean;
  recommendation: Omit<Recommendation, 'id'>;
}> = [
  {
    id: 'rec-digital-ordering',
    condition: (answers) => {
      const channels = answers.find((a) => a.questionId === 'orderChannels')?.value;
      if (!channels || !Array.isArray(channels)) return false;
      return channels.includes('whatsapp') || channels.includes('phone') || channels.includes('in-store');
    },
    recommendation: {
      category: 'ordering',
      title: 'Digital Ordering & Retailer Portal',
      description: 'Enable customers to browse, price and order through a dedicated B2B portal.',
      rationale: 'Recommended because your customers currently place orders mainly through WhatsApp, phone or in-store, and you selected 24/7 ordering capabilities.',
      priority: 'Phase 1',
      moduleTag: 'B2BCommerce + RetailerPortal',
    },
  },
  {
    id: 'rec-website-ordering',
    condition: (answers) => {
      const channels = answers.find((a) => a.questionId === 'orderChannels')?.value;
      if (!channels || !Array.isArray(channels)) return false;
      return channels.includes('website');
    },
    recommendation: {
      category: 'ordering',
      title: 'Website Ordering Assessment',
      description: 'Evaluate whether your existing website ordering can be enhanced rather than replaced.',
      rationale: 'You already have website ordering. We recommend assessing integration before replacement.',
      priority: 'Phase 2',
      moduleTag: 'WebsiteIntegrationAssessment',
    },
  },
  {
    id: 'rec-customer-pricing',
    condition: (answers) => {
      const pricing = answers.find((a) => a.questionId === 'pricingModel')?.value;
      return pricing === 'customer-specific';
    },
    recommendation: {
      category: 'pricing',
      title: 'Customer-Specific Pricing Engine',
      description: 'Manage individual customer prices, minimums and deals in one place.',
      rationale: 'Recommended because you confirmed customers receive different prices.',
      priority: 'Phase 1',
      moduleTag: 'CustomerPricingEngine',
    },
  },
  {
    id: 'rec-pricing-tiers',
    condition: (answers) => {
      const pricing = answers.find((a) => a.questionId === 'pricingModel')?.value;
      return pricing === 'tiers';
    },
    recommendation: {
      category: 'pricing',
      title: 'Pricing Tiers',
      description: 'Define and manage trade price groups with clear rules.',
      rationale: 'Recommended because you use different price groups or tiers.',
      priority: 'Phase 1',
      moduleTag: 'PricingTiers',
    },
  },
  {
    id: 'rec-inventory-replacement',
    condition: (answers) => {
      const system = answers.find((a) => a.questionId === 'stockSystem')?.value;
      return system === 'excel' || system === 'manual';
    },
    recommendation: {
      category: 'inventory',
      title: 'TradePilot Inventory Management',
      description: 'Centralised stock control with automated alerts and reorder suggestions.',
      rationale: 'Recommended because you currently manage stock in Excel or manually, creating risk of overselling and stockouts.',
      priority: 'Phase 1',
      moduleTag: 'TradePilotInventoryManagement',
    },
  },
  {
    id: 'rec-inventory-intelligence',
    condition: (answers) => {
      const needs = answers.find((a) => a.questionId === 'stockNeeds')?.value;
      if (!needs || !Array.isArray(needs)) return false;
      return needs.includes('dead-stock');
    },
    recommendation: {
      category: 'inventory',
      title: 'Inventory Intelligence',
      description: 'Identify fast movers, slow movers, dead stock and overstock with actionable recommendations.',
      rationale: 'Recommended because you selected dead stock visibility as a priority.',
      priority: 'Phase 1',
      moduleTag: 'InventoryIntelligence',
    },
  },
  {
    id: 'rec-stock-alerts',
    condition: (answers) => {
      const needs = answers.find((a) => a.questionId === 'stockNeeds')?.value;
      if (!needs || !Array.isArray(needs)) return false;
      return needs.includes('low-stock') || needs.includes('reordering');
    },
    recommendation: {
      category: 'inventory',
      title: 'Stock Alerts & Reorder Management',
      description: 'Automated alerts when stock hits safety levels, with suggested reorder quantities.',
      rationale: 'Recommended because you want better visibility over low stock or reordering.',
      priority: 'Phase 1',
      moduleTag: 'StockAlerts',
    },
  },
  {
    id: 'rec-customer-crm',
    condition: (answers) => {
      const system = answers.find((a) => a.questionId === 'customerDataSystem')?.value;
      return system === 'multiple' || system === 'whatsapp-phones' || system === 'excel';
    },
    recommendation: {
      category: 'customers',
      title: 'Customer CRM',
      description: 'Centralised customer records, order history, segments and account notes.',
      rationale: 'Recommended because your customer data is currently fragmented across multiple systems.',
      priority: 'Phase 1',
      moduleTag: 'CustomerCRM',
    },
  },
  {
    id: 'rec-retention',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'dormantCustomerDetection')?.value;
      return val === 'yes' || val === 'maybe';
    },
    recommendation: {
      category: 'retention',
      title: 'Retention Engine',
      description: 'Automatically detect customers slipping from their normal buying cycle and trigger follow-up workflows.',
      rationale: 'Recommended because you want to know automatically when a regular customer slows down or stops ordering.',
      priority: 'Phase 1',
      moduleTag: 'RetentionEngine',
    },
  },
  {
    id: 'rec-credit',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'sellOnCredit')?.value;
      return val === 'yes';
    },
    recommendation: {
      category: 'credit',
      title: 'Credit Visibility & Management',
      description: 'Track outstanding balances, credit limits and repayment behaviour in one place.',
      rationale: 'Recommended because you sell customers on credit.',
      priority: 'Phase 1',
      moduleTag: 'CreditVisibility',
    },
  },
  {
    id: 'rec-retailer-account',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'retailerCreditPortal')?.value;
      return val === 'yes' || val === 'maybe';
    },
    recommendation: {
      category: 'portal',
      title: 'Retailer Account Centre',
      description: 'Let retailers view invoices, statements, outstanding balances and credit limits.',
      rationale: 'Recommended because you want retailers to access credit and account information themselves.',
      priority: 'Phase 2',
      moduleTag: 'RetailerAccountCentre',
    },
  },
  {
    id: 'rec-whatsapp',
    condition: (answers) => {
      const val = answers.find((a) => a.questionId === 'whatsappUsage')?.value;
      return val === 'yes';
    },
    recommendation: {
      category: 'integration',
      title: 'WhatsApp Integration Assessment',
      description: 'Assess how WhatsApp order and support messages can be structured or automated.',
      rationale: 'Recommended because you currently use WhatsApp for customer orders or support.',
      priority: 'Phase 2',
      moduleTag: 'WhatsAppIntegrationAssessment',
    },
  },
  {
    id: 'rec-payment-automation',
    condition: (answers) => {
      const items = answers.find((a) => a.questionId === 'automationDesires')?.value;
      if (!items || !Array.isArray(items)) return false;
      return items.includes('payment-reminders');
    },
    recommendation: {
      category: 'automation',
      title: 'Payment Reminder Automation',
      description: 'Automated reminders for overdue or upcoming payments.',
      rationale: 'Recommended because you selected payment reminders as an automation priority.',
      priority: 'Phase 1',
      moduleTag: 'CreditAutomation',
    },
  },
  {
    id: 'rec-retention-automation',
    condition: (answers) => {
      const items = answers.find((a) => a.questionId === 'automationDesires')?.value;
      if (!items || !Array.isArray(items)) return false;
      return items.includes('dormant-followup');
    },
    recommendation: {
      category: 'automation',
      title: 'Retention Automation',
      description: 'Automated follow-up sequences for dormant or at-risk customers.',
      rationale: 'Recommended because you selected dormant customer follow-up as an automation priority.',
      priority: 'Phase 1',
      moduleTag: 'RetentionAutomation',
    },
  },
  {
    id: 'rec-accounting-integration',
    condition: (answers) => {
      const systems = answers.find((a) => a.questionId === 'existingSystems')?.value;
      if (!systems || !Array.isArray(systems)) return false;
      return systems.includes('accounting');
    },
    recommendation: {
      category: 'integration',
      title: 'Accounting Integration Assessment',
      description: 'Assess sync between TradePilot and your existing accounting software.',
      rationale: 'Recommended because you already use accounting software and integration may reduce double-entry.',
      priority: 'Phase 2',
      moduleTag: 'AccountingIntegrationAssessment',
    },
  },
  {
    id: 'rec-ai-assistant',
    condition: (answers) => {
      const features = answers.find((a) => a.questionId === 'portalFeatures')?.value;
      if (!features || !Array.isArray(features)) return false;
      return features.includes('ai-order');
    },
    recommendation: {
      category: 'ai',
      title: 'AI Sales Assistant (Optional)',
      description: 'AI-powered basket building and product recommendations.',
      rationale: 'You expressed interest in AI-assisted ordering. This is an optional enhancement that can be added later.',
      priority: 'Future',
      moduleTag: 'AISalesAssistant',
    },
  },
];

export function buildScores(answers: DiscoveryAnswer[]): AssessmentScore[] {
  const dimensions: Record<string, { points: number; max: number; rationale: string }> = {};

  for (const rule of SCORE_RULES) {
    if (!dimensions[rule.dimension]) {
      dimensions[rule.dimension] = { points: 0, max: 5, rationale: '' };
    }
    if (rule.condition(answers)) {
      dimensions[rule.dimension].points += rule.points;
      if (rule.points > 0) {
        dimensions[rule.dimension].rationale = rule.rationale;
      }
    }
  }

  return Object.entries(dimensions).map(([dimension, data]) => {
    const clamped = Math.max(0, Math.min(data.points, data.max));
    let level: ScoreLevel = 'Low';
    if (clamped >= 4) level = 'High';
    else if (clamped >= 2) level = 'Medium';

    return {
      dimension,
      level,
      rawScore: clamped,
      maxScore: data.max,
      rationale: data.rationale || 'No specific signals identified for this dimension.',
    };
  });
}

export function buildRecommendations(answers: DiscoveryAnswer[]): Recommendation[] {
  const recs: Recommendation[] = [];
  const seen = new Set<string>();

  for (const rule of RECOMMENDATION_RULES) {
    if (rule.condition(answers) && !seen.has(rule.recommendation.moduleTag)) {
      seen.add(rule.recommendation.moduleTag);
      recs.push({
        id: rule.id,
        ...rule.recommendation,
      });
    }
  }

  return recs.sort((a, b) => {
    const order: Record<string, number> = { 'Phase 1': 0, 'Phase 2': 1, Future: 2 };
    return order[a.priority] - order[b.priority];
  });
}

export function buildTriggeredRules(answers: DiscoveryAnswer[]): TriggeredRule[] {
  const triggered: TriggeredRule[] = [];

  for (const rule of SCORE_RULES) {
    if (rule.condition(answers)) {
      triggered.push({
        ruleId: rule.id,
        description: rule.description,
        condition: `Condition matched for dimension "${rule.dimension}" (+${rule.points})`,
      });
    }
  }

  return triggered;
}

export function buildIntegrationFlags(answers: DiscoveryAnswer[]): IntegrationFlag[] {
  const flags: IntegrationFlag[] = [];

  const stockSystem = answers.find((a) => a.questionId === 'stockSystem')?.value as string | undefined;
  if (stockSystem && ['erp', 'inventory-software', 'accounting'].includes(stockSystem)) {
    flags.push({
      system: stockSystem === 'erp' ? 'ERP' : stockSystem === 'inventory-software' ? 'Inventory Software' : 'Accounting Software',
      action: 'connect',
      rationale: 'Existing system should be assessed for data integration rather than replacement.',
    });
  } else if (stockSystem && ['excel', 'manual'].includes(stockSystem)) {
    flags.push({
      system: 'Spreadsheet / Manual Stock',
      action: 'replace',
      rationale: 'Current approach creates operational risk; TradePilot inventory management is recommended.',
    });
  }

  const customerSystem = answers.find((a) => a.questionId === 'customerDataSystem')?.value as string | undefined;
  if (customerSystem && ['multiple', 'whatsapp-phones', 'excel'].includes(customerSystem)) {
    flags.push({
      system: 'Customer Records',
      action: 'connect',
      rationale: 'Customer data should be migrated or synchronised into a central CRM.',
    });
  }

  const existingSystems = answers.find((a) => a.questionId === 'existingSystems')?.value as string[] | undefined;
  if (existingSystems?.includes('whatsapp-business')) {
    flags.push({
      system: 'WhatsApp Business',
      action: 'assess',
      rationale: 'Assess whether WhatsApp messaging should be integrated for order confirmations and support.',
    });
  }
  if (existingSystems?.includes('website')) {
    flags.push({
      system: 'Website',
      action: 'assess',
      rationale: 'Assess whether the website should integrate with TradePilot for pricing, stock or ordering.',
    });
  }
  if (existingSystems?.includes('accounting')) {
    flags.push({
      system: 'Accounting Software',
      action: 'connect',
      rationale: 'Assess invoice, payment and customer sync with accounting.',
    });
  }

  return flags;
}

function getComplexity(answers: DiscoveryAnswer[], flags: IntegrationFlag[]): { complexity: ImplementationComplexity; needsReview: boolean } {
  let complexity = 0;

  if (flags.some((f) => f.action === 'replace')) complexity += 1;
  if (flags.some((f) => f.action === 'connect')) complexity += 1;
  if (flags.filter((f) => f.action === 'connect').length >= 3) complexity += 1;

  const systems = answers.find((a) => a.questionId === 'existingSystems')?.value as string[] | undefined;
  if (systems && systems.length >= 5) complexity += 1;

  const portalFeatures = answers.find((a) => a.questionId === 'portalFeatures')?.value as string[] | undefined;
  if (portalFeatures && portalFeatures.length >= 7) complexity += 1;

  if (complexity <= 1) return { complexity: 'Low', needsReview: false };
  if (complexity <= 3) return { complexity: 'Medium', needsReview: flags.some((f) => f.action === 'connect') };
  return { complexity: 'High', needsReview: true };
}

export function buildBlueprint(submission: DiscoverySubmission): TradePilotBlueprint {
  const answers = submission.answers;
  const scores = buildScores(answers);
  const recommendations = buildRecommendations(answers);
  const triggeredRules = buildTriggeredRules(answers);
  const integrationFlags = buildIntegrationFlags(answers);
  const { complexity, needsReview } = getComplexity(answers, integrationFlags);

  const phase1 = recommendations.filter((r) => r.priority === 'Phase 1');
  const phase2 = recommendations.filter((r) => r.priority === 'Phase 2');
  const future = recommendations.filter((r) => r.priority === 'Future');

  const currentSignals = scores
    .filter((s) => s.level === 'High' || s.level === 'Medium')
    .map((s) => ({
      label: s.dimension,
      level: s.level,
      detail: s.rationale,
    }));

  const missingInformation: string[] = [];
  if (!answers.find((a) => a.questionId === 'orderProblem')?.value) {
    missingInformation.push('No ordering pain points documented — consider a follow-up call.');
  }
  if (!answers.find((a) => a.questionId === 'systemNames')?.value) {
    missingInformation.push('No specific system names provided — useful for integration scoping.');
  }
  if (!answers.find((a) => a.questionId === 'primaryProblem')?.value) {
    missingInformation.push('No primary problem stated — useful for prioritisation.');
  }

  const suggestedDiscoveryQuestions = [
    'Can you walk us through a typical order from enquiry to dispatch?',
    'How many orders do you process per week/month?',
    'What is your current stock accuracy like?',
    'Who is involved in pricing decisions?',
    'How do you currently handle returns or order changes?',
  ];

  return {
    id: `blueprint-${Date.now()}`,
    submissionId: submission.id,
    generatedAt: new Date().toISOString(),
    businessName: submission.businessName,
    contactName: submission.contactName,
    scores,
    recommendations,
    triggeredRules,
    integrationFlags,
    implementationComplexity: complexity,
    requiresTechnicalReview: needsReview,
    currentSignals,
    priorityRoadmap: {
      phase1: phase1.slice(0, 6),
      phase2: phase2.slice(0, 6),
      future: future.slice(0, 4),
    },
    missingInformation,
    suggestedDiscoveryQuestions,
    disclaimer:
      'This is an indicative recommendation based on questionnaire answers, not a technical audit. Final scope and pricing should be confirmed after a discovery call.',
  };
}
