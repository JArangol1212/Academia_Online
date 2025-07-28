
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
    
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
   
    .onUploadComplete(async ({ metadata}) => {
     
      return { uploadedBy: metadata };
    }),
    chapterVideo: f({
      video:{maxFileCount:1, maxFileSize:"512GB"},
      
    }).onUploadComplete(async ({ file }) => {
      return { url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
