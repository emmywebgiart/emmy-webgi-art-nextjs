import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(req) {
  try {
    const { fullName, attendeeType, confirmation, message } = await req.json();

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    );

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      Date: new Date().toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
      }),
      Name: fullName,
      AttendeeType: attendeeType,
      Confirmation: confirmation,
      Message: message,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}