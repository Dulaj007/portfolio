import Link from 'next/link';
import { projects } from './data/projects';

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.id} className="group">
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 h-full transition-all duration-200 hover:shadow-lg hover:border-blue-500 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {project.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-gray-100 dark:bg-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}