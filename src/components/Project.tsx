import type { Project } from '../api/projects'

type ProjectsProps = {
  project: Project;
}

const ProjectComponent = ({ project }: ProjectsProps) => {
  return (
    <div>
      {/* <h3>{project.slug}</h3> */}
      <div dangerouslySetInnerHTML={{ __html: project.content }} />
    </div>
  );
};

export default ProjectComponent;