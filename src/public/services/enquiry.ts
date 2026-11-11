export async function submitEnquiry(data: EnquiryData): Promise<EnquiryResponse> {
  const apiBase = (
    import.meta.env.VITE_NAVORA_API_BASE_URL ||
    "https://navora-api-staging.onrender.com/api/v1"
  ).replace(/\/$/, "");

  if (!data.fullName || !data.workEmail || !data.company || !data.consent) {
    return {
      ok: false,
      message: "Please fill in all required fields and accept consent.",
    };
  }

  try {
    const response = await fetch(`${apiBase}/leads`, {
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
        source: "website",
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