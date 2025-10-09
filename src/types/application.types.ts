// Application/Wniosek types

export type ApplicationStatus =
  | 'draft' // Szkic
  | 'submitted' // Złożony
  | 'in_review' // W trakcie weryfikacji
  | 'approved' // Zatwierdzony
  | 'rejected' // Odrzucony
  | 'completed' // Zakończony
  | 'cancelled'; // Anulowany

export type ApplicationType = 'individual' | 'business';

export interface ApplicationData {
  // Dane osobowe
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pesel?: string;

  // Dane firmy (dla business)
  companyName?: string;
  nip?: string;
  regon?: string;

  // Adres
  street: string;
  city: string;
  postalCode: string;
  country: string;

  // Dane finansowe
  requestedAmount: number;
  purpose: string;
  monthlyIncome?: number;
}

export interface Application {
  id: string;
  type: ApplicationType;
  status: ApplicationStatus;
  data: ApplicationData;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface ApplicationFilters {
  status?: ApplicationStatus[];
  type?: ApplicationType;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface CreateApplicationDto {
  type: ApplicationType;
  data: ApplicationData;
}

export interface UpdateApplicationDto {
  data?: Partial<ApplicationData>;
  status?: ApplicationStatus;
  rejectionReason?: string;
  notes?: string;
}
