// Define the shape of your project data
export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullCaseStudy: string;
  techStack: string[];
}

// Export your array of projects
export const projects: Project[] = [
  {
    id: '1',
    slug: 'e-commerce-dashboard',
    title: 'E-Commerce Dashboard',
    shortDescription: 'A comprehensive admin dashboard for managing online store sales, inventory, and users.',
    fullCaseStudy: 'This case study covers the design and development of a full-stack dashboard. I built this to solve the problem of fragmented inventory management. The hardest part was implementing real-time data syncing, which I solved using...',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Prisma'],
  },
  {
    id: '2',
    slug: 'weather-app',
    title: 'Real-time Weather App',
    shortDescription: 'A sleek, minimalist weather application providing real-time forecasting data.',
    fullCaseStudy: 'Built to solve the problem of clunky weather interfaces. I integrated the OpenWeather API to fetch live data. Performance optimization was key here...',
    techStack: ['React', 'TypeScript', 'Framer Motion'],
  }
];