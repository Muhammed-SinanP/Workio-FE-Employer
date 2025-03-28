import { z } from "zod";

export const jobPostSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  jobStatus: z.string(),
  jobDescription: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters long"),
  jobRequirements: z
    .array(z.string().min(1, "A requirement cannot be empty"))
    .min(1, "Minimum 1 requirement is required"),
  jobExperience: z.string(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  jobType: z.string().min(1, "Job type is required"),
  workModel: z.string().min(1, "Work model is required"),
  salaryRange: z.tuple([
    z.number().min(1, "Minimum 1 LPA is required"),
    z.number().max(100, "Maximum value must be at most 100 LPA"),
  ]),
});
