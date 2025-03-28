import { z } from "zod";

export const profileSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  companyName: z.string(),
  userEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
});
