import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// 1. Make the function async and type params as a Promise
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  // 2. Await the params before using them
  const resolvedParams = await params;
  
  // 3. Now we can safely check the slug
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <Link 
        href="/projects" 
        className="text-blue-500 hover:underline mb-8 inline-flex items-center gap-2"
      >
        &larr; Back to all projects
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
      
      <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-gray-200 dark:border-gray-800">
        {project.techStack.map((tech) => (
          <span 
            key={tech} 
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium text-sm px-4 py-1.5 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          {project.fullCaseStudy}
        </p>
      </article>
    </main>
  );
}