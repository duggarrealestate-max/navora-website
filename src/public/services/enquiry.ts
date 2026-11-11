export interface EnquiryData {
  fullName: string;
  workEmail: string;
  company: string;
  businessType: string;
  challenge: string;
  consent: boolean;
}

export interface EnquiryResponse {
  ok: boolean;
  message?: string;
}

export type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export async function submitEnquiry(data: EnquiryData): Promise<EnquiryResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  if (!data.fullName || !data.workEmail || !data.consent) {
    return { ok: false, message: 'Please fill in all required fields and accept the consent.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.workEmail)) {
    return { ok: false, message: 'Please enter a valid work email address.' };
  }

  return { ok: true, message: 'Thank you. We will be in touch within one working day.' };
}
