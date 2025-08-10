export interface CommentDTO {
  id?: number;
  propertyId: number;
  comment: string;
  dateTime?: string;
  userId: number;
  fullName?: string;
}