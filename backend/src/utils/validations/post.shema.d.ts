import { z } from "zod";
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type PostInput = z.infer<typeof postSchema>;
//# sourceMappingURL=post.shema.d.ts.map