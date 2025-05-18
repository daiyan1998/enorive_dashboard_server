import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    username: z.string().optional(),
    isEmailVerified: z.boolean().optional(), // optional since default is false
    role: z.enum(["USER", "ADMIN", "MODERATOR"]).optional(), // optional since default is USER
    profileImage: z.string().url().optional(),
  });