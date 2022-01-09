import { FamilyStatus } from './family-status.enum';

export interface Family {
  id: string;
  meetFrequency: number;
  paymentDueDate: number;
  possibleDateSelectDay: number;
  status: FamilyStatus;
  cohabitParentId: string;
  separateParentId: string;
  supporterId: string;
  supportOrganizationId: string;
}
