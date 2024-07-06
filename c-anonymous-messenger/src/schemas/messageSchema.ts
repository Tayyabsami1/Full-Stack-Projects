import { z } from "zod";

export const messageSchema = z.object({
    content: z.string().min(10, { message: "Content must atleast contain 10 characters" }).max(300, { message: "Content must not cross 300 characters" }),
})