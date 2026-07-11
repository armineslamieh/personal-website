import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

const ProjectsPage = async () => {
    const projects = await prisma.project.findMany();
    return <ProjectsClient projects={projects} />;
};

export default ProjectsPage;