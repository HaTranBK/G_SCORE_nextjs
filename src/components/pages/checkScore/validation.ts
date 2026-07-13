import * as z from "zod";

export const searchSchema = z.object({
  sbd: z
    .string()
    .min(1, "Registration number (SBD) is required")
    .regex(/^\d+$/, "Registration number must contain digits only")
    .min(6, "Registration number must be at least 6 digits")
    .max(12, "Registration number must be at most 12 digits"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
