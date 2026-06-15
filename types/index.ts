export type SetupEffort = 'quick' | 'moderate' | 'investment';
export type PricingModel = 'free' | 'freemium' | 'paid' | 'trial';

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  workflows: string[];
  pricingModel: PricingModel;
  startingPrice: string;
  bestFor: string;
  whyHere: string;
  pros: string[];
  cons: string[];
  setupEffort: SetupEffort;
  website: string;
  featured: boolean;
  dateAdded: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
}

export interface Workflow {
  slug: string;
  name: string;
  icon: string;
}
