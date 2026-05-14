import FadeIn from "@/app/components/FadeIn";
import Image from "next/image";
import AboutMeCard from "@/app/components/AboutMeCard";
import ProjectsPage from "@/app/projects/page"


const page = () => {
  return (
      <>
          <AboutMeCard />
          <section id="projects">
              <ProjectsPage />
          </section>
      </>

  )
}

export default page