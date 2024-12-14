import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
   doctorProfileImage: f({ image: { maxFileSize: "4MB"}})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "Dev.Pap" };
    }),
    serviceImage: f({ image: { maxFileSize: "4MB"}})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "Dev.Pap" };
    }),
    specialtyImage: f({ image: { maxFileSize: "4MB"}})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "Dev.Pap" };
    }),
    doctorProfessionDocs: f({ pdf: { maxFileSize: "4MB", maxFileCount: 4}})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "Dev.Pap" };
    }),
    additionalDocs: f({ pdf: { maxFileSize: "4MB", maxFileCount: 4}})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "Dev.Pap" };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
