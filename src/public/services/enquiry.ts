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

export type SubmissionState = "idle" | "loading" | "success" | "error";

export async function submitEnquiry(
  data: EnquiryData,
): Promise<EnquiryResponse> {
  const apiBase =
    "https://navora-api-staging.onrender.com/api/v1";

  if (
    !data.fullName ||
    !data.workEmail ||
    !data.company ||
    !data.consent
  ) {
    return {
      ok: false,
      message: "Please fill in all required fields and accept consent.",
    };
  }

  try {
    const response = await fetch(`${apiBase}/leads/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.company,
        email: data.workEmail,
        phone: "not-provided",
        message: [data.fullName, data.businessType, data.challenge]
          .filter(Boolean)
          .join(" — "),
        utm_source: "navora",
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        message: payload.detail || "We could not save your enquiry.",
      };
    }

    return {
      ok: true,
      message: "Thank you. Your enquiry has been received.",
    };
  } catch {
    return {
      ok: false,
      message: "The enquiry service is temporarily unavailable.",
    };
  }
}