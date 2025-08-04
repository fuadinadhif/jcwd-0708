import { HelmetOptions } from "helmet";

// Security Headers
export const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: process.env.NODE_ENV === "production",
  crossOriginResourcePolicy: { policy: "same-origin" },
  referrerPolicy: { policy: "no-referrer" },
};
