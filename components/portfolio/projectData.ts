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
}

/**
 * Array of project data used to populate the scrolling video section.
 */
export const projects: Project[] = [
  {
    id: 'proj-1',
    videoSrc: '/videos/vid1.mp4',
    title: 'Project Alpha',
    subtitle: 'Digital Experience & Web Design',
    isLogo: false,
    customButtonText: 'View Github',
  },
  {
    id: 'proj-2',
    videoSrc: '/videos/vid2.mp4',
    title: '/logo-placeholder.png',
    subtitle: 'Brand Identity & Strategy',
    isLogo: true,
    customButtonText: 'Visit Live Site',
  },
  {
    id: 'proj-3',
    videoSrc: '/videos/vid3.mp4',
    title: 'Project Gamma',
    subtitle: 'Mobile App Development',
    isLogo: false,
    customButtonText: 'Read Article',
  },
];