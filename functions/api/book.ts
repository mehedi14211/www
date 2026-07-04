export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const { 
      videoCount, 
      userName, 
      businessName, 
      userEmail, 
      whyNeeded, 
      howCanHelp, 
      endGoal, 
      selectedDate, 
      selectedTime,
      country,
      timezone
    } = body;

    // Validate mandatory fields
    if (!userName || !businessName || !userEmail) {
      return new Response(JSON.stringify({ error: "Name, Business Name, and Email are mandatory." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Prioritize Formspree if FORMSPREE_FORM_ID is configured
    const formspreeFormId = env.FORMSPREE_FORM_ID || "xwvdaoyn";
    if (formspreeFormId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            subject: `🚨 NEW STRATEGY LEAD: ${userName} (${businessName})`,
            name: userName,
            email: userEmail,
            businessName: businessName,
            videoCount: videoCount,
            country: country || "Not provided",
            timezone: timezone || "Not provided",
            whyNeeded: whyNeeded || "Not provided",
            howCanHelp: howCanHelp || "Not provided",
            endGoal: endGoal || "Not provided",
            selectedDate: selectedDate ? `July ${selectedDate}, 2026` : "Flexible Call",
            selectedTime: selectedTime || "Flexible Time"
          })
        });

        const fsContentType = response.headers.get("content-type");
        const isFsJson = fsContentType && fsContentType.includes("application/json");

        if (!response.ok) {
          if (isFsJson) {
            const errBody: any = await response.json().catch(() => ({}));
            throw new Error(errBody.error || `Formspree returned status code ${response.status}`);
          } else {
            throw new Error(`Formspree returned status code ${response.status}`);
          }
        }

        return new Response(JSON.stringify({ success: true, mode: "formspree" }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (fError: any) {
        console.error("Formspree submission error on Cloudflare Pages:", fError);
        return new Response(JSON.stringify({ error: `Formspree Error: ${fError.message}` }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return new Response(JSON.stringify({ error: "Booking email delivery is not configured. Please supply FORMSPREE_FORM_ID in Cloudflare environment settings." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Booking API error on Cloudflare:", error);
    return new Response(JSON.stringify({ error: error.message || "An error occurred while saving booking details." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
