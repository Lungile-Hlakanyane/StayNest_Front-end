export interface ReportDTO {
  id?: number;
  landlordId: number;
  tenantId: number;
  reason: string;
  dateTime?:any;
  tenantFullName?:string;
  landlordFullName?: string;
  reportedAt?: string;
}