import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*  Shared zod schemas for auth flows                                         */
/* -------------------------------------------------------------------------- */

export const loginSchema = z.object({
  email: z
    .string({ message: "Email wajib diisi." })
    .trim()
    .toLowerCase()
    .email({ message: "Format email tidak valid." }),
  password: z
    .string({ message: "Password wajib diisi." })
    .min(1, { message: "Password wajib diisi." }),
});

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Nama wajib diisi." })
      .trim()
      .min(2, { message: "Nama minimal 2 karakter." })
      .max(80, { message: "Nama maksimal 80 karakter." }),
    email: z
      .string({ message: "Email wajib diisi." })
      .trim()
      .toLowerCase()
      .email({ message: "Format email tidak valid." }),
    password: z
      .string({ message: "Password wajib diisi." })
      .min(8, { message: "Password minimal 8 karakter." })
      .regex(/[A-Za-z]/, { message: "Password harus berisi huruf." })
      .regex(/\d/, { message: "Password harus berisi angka." }),
    confirmPassword: z.string({ message: "Konfirmasi password wajib diisi." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
