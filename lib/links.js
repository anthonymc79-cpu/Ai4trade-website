// Where the app lives. Same variable the header's "Log in" button uses.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

// Opens the app on the customer side (sign in or register, then book).
// The app reads "#customer" to show the customer portal straight away.
export const HOMEOWNER_QUOTE_HREF = `${APP_URL}/#customer`;

// Opens the app straight on the trade business sign-in screen.
export const BUSINESS_LOGIN_HREF = `${APP_URL}/#business`;
