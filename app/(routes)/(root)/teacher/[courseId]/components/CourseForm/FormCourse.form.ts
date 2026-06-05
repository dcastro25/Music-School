import { z } from "zod";


export const formSchema = z.object({
    courseName: z.string().min(1),
    category: z.string().min(1),
    description: z.string().min(10),
    
    price: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().min(0)
    ),
    
    duration: z.string(),
    level: z.string().min(1),
    imageUrl: z.string().nullable().optional(),
    slug: z.string().min(1),
});


export type FormValues = z.infer<typeof formSchema>;