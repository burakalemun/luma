import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema";
import { BulkImportTool } from "./sanity/tools/BulkImportTool";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r5fc2yyx";
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
  tools: (prev) => [
    ...prev,
    {
      name: "bulk-import",
      title: "⚡ Toplu Yönetim & Silme",
      component: BulkImportTool,
    },
  ],
});
