export type LeadStatus = 'new' | 'enriching' | 'ready' | 'in_cadence' | 'qualified' | 'disqualified';
export type DealStage = 'discovery' | 'qualified' | 'meeting_scheduled' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  jobTitle: string;
  email: string;
  whatsapp: string;
  industry: string;
  employees: string;
  icpScore: number;
  status: LeadStatus;
  channels: {
    emailVerified: boolean;
    whatsappActive: boolean;
    linkedinFound: boolean;
  };
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  closer: string;
  probability: number;
  nextStep: string;
}

export interface CampaignMetric {
  id: string;
  name: string;
  channel: 'Email' | 'WhatsApp' | 'Omnichannel';
  sent: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  status: 'active' | 'paused' | 'draft';
}

export interface AuditGateItem {
  id: string;
  action: string;
  details: string;
  requestedBy: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
