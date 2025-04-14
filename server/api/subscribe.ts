import crypto from "crypto";

export default defineEventHandler(async (event) => {
  if (event.method !== "PUT") {
    throw createError({
      statusCode: 405,
      statusMessage: "Méthode non autorisée",
    });
  }

  const body = await readBody(event);
  const config = useRuntimeConfig();

  const apiKey = config.MAILCHIMP_API_KEY;
  const listId = config.MAILCHIMP_AUDIENCE_ID;
  const datacenter = apiKey.split("-")[1];

  const email = body.email.toLowerCase();
  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");

  const res = await fetch(
    `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`,
    {
      method: "PUT",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          ANSWER: body.answer,
          FNAME: body.firstName,
          LNAME: body.lastName,
          GENDER: body.gender,
          COACH: body.coach,
          RELATION: body.relation,
          CONTACT: body.contact,
          PHONE: body.phone,
          EVENT: body.eventId,
        },
      }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: result.detail || "Erreur avec Mailchimp",
    });
  }

  return result;
});
