import { Client } from "@notionhq/client";
import { Project } from "@/types";
import { mockProjects } from "@/lib/data/projects";

const notionSecret = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

// Client is created lazily so local dev without credentials still works.
const notionClient = notionSecret ? new Client({ auth: notionSecret }) : null;

type NotionSelect = { name?: string } | null | undefined;
type NotionRichText = { plain_text?: string } | null | undefined;

const getSelectName = (value: NotionSelect, fallback: string) =>
  value?.name ?? fallback;

const getRichText = (value?: NotionRichText[]) =>
  value?.[0]?.plain_text ?? "";

// Map a Notion page to our Project shape. Property names are placeholders and
// can be aligned to your real database columns later.
const mapPageToProject = (page: any): Project => {
  const props = page.properties || {};
  return {
    id: page.id,
    name: props.Name?.title ? getRichText(props.Name.title) : "Untitled",
    clientType: getSelectName(props["Client Type"]?.select, "Individual") as Project["clientType"],
    status: getSelectName(props.Status?.select, "Not Started") as Project["status"],
    deadline: props.Deadline?.date?.start ?? new Date().toISOString().split("T")[0],
    priority: getSelectName(props.Priority?.select, "Medium") as Project["priority"],
    budget: Number(props.Budget?.number ?? 0),
    hoursSpent: Number(props["Hours Spent"]?.number ?? 0),
    description: props.Description?.rich_text
      ? getRichText(props.Description.rich_text)
      : "",
    createdAt: page.created_time?.split("T")?.[0] ?? "",
    updatedAt: page.last_edited_time?.split("T")?.[0] ?? "",
  };
};

export async function fetchProjectsFromNotion(): Promise<Project[]> {
  if (!notionClient || !databaseId) {
    // Safe fallback for local/demo environments
    return mockProjects;
  }

  const response = await notionClient.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Name", direction: "ascending" }],
  });

  return response.results.map(mapPageToProject);
}

