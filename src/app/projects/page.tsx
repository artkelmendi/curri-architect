import type { Metadata } from "next";
import ProjectsView from "./ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected residential, commercial and cultural projects by Curri Architect.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
