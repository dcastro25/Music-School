import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    }).onUploadComplete(async ({ metadata }) => {
        return { uploadedBy: metadata };
    }),
    chapterVideo: f({
        video: { maxFileCount: 1, maxFileSize: "512GB" },
    }).onUploadComplete(({ file }) => {
        // file.url es el formato legacy (utfs.io) y puede no resolver
        // correctamente. file.ufsUrl es el campo recomendado y estable
        // (formato https://<APP_ID>.ufs.sh/f/<key>).
        const url = file.ufsUrl ?? file.url;
        return { url, ufsUrl: url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;