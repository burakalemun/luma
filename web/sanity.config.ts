import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "v8f9h3k2"; // Geçiçi ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "The Luma CMS",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
});
