/**
 * ============================================================================
 * File: E:\Projects\ydulaj\components\portfolio\projectData.ts
 * Description: Contains the TypeScript interfaces and constant data 
 * for the ProjectExpand showcase component.
 * ============================================================================
 */

/**
 * Interface defining the structure of a single project.
 * This ensures strict typing when mapping over projects in the component.
 */
export interface Project {
  id: string;
  videoSrc: string;
  title: string;
  subtitle: string;
  isLogo: boolean;
  customButtonText: string;
  caseStudyLink: string;
  liveSiteLink: string;
}

/**
 * Array of project data used to populate the scrolling video section.
 */
export const projects: Project[] = [
  {
    id: 'proj-1',
    videoSrc: '/videos/portfolio/threejstool.mp4',
    title: '/logo/portfolio/threejs.png',
    subtitle: 'WEB-BASED 3D EDITOR - NEXTJS',
    isLogo: true,
    customButtonText: 'Visit Live Site',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
  {
    id: 'proj-2',
    videoSrc: '/videos/portfolio/iphone.mp4',
    title: 'Iphone 17 Showcase',
    subtitle: '3D WEBSITE - NEXTJS',
    isLogo: false,
    customButtonText: 'Visit Live Site',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
  {
    id: 'proj-3',
    videoSrc: '/videos/portfolio/ward21game.mp4',
    title: '/logo/portfolio/ward21-logo.png',
    subtitle: 'Indie Horror Game - Unity',
    isLogo: true,
    customButtonText: 'Play Free',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
  {
    id: 'proj-4',
    videoSrc: '/videos/portfolio/auranex.mp4',
    title: 'Aura Nexus',
    subtitle: 'Full-Stack Community Website - laravel',
    isLogo: false,
    customButtonText: 'Visit Live Site',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
  {
    id: 'proj-5',
    videoSrc: '/videos/portfolio/ward21website.mp4',
    title: 'Ward21 Website',
    subtitle: 'Product Showcase Website - React',
    isLogo: false,
    customButtonText: 'Visit Live Site',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
  {
    id: 'proj-6',
    videoSrc: '/videos/portfolio/adaLanka.mp4',
    title: 'ADA LANKA NEWS',
    subtitle: 'News Website - laravel',
    isLogo: false,
    customButtonText: 'Visit Live Site',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
    {
    id: 'proj-7',
    videoSrc: '/videos/portfolio/senti.mp4',
    title: 'Sentinel 24-7',
    subtitle: 'CCTV monitoring Website - Codeigniter',
    isLogo: false,
    customButtonText: 'Visit Live Site',
    caseStudyLink: '#',
    liveSiteLink: '#'
  },
];