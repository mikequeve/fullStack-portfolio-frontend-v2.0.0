import { LucideIcon } from 'lucide-react';

export interface PageParams {
  locale: string;
}

export interface PageProps {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image' | 'player' | 'app';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface Messages {
  MetaTags: MetaTags;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface Stack {
  name: string;
  img: string;
}

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface Project {
  projectId: string;
  imageUrl: string;
  title: string;
  description: string;
  demoLink: string;
  repoLink: string;
  stack: string;
}

export interface Certificate {
  id: number;
  imageUrl: string;
}

export interface AppContextType {
  projects: Project[];
  certificates: Certificate[];
  isModalOpen: boolean;
  selectedImg: string | null;
  loading: boolean;
  error: string | null;
  setIsModalOpen: (value: boolean) => void;
  getProjectById: (id: string) => Promise<Project>;
  openModal: (img: string) => void;
}

export interface ProjectCardProps {
  id: string;
  img: string;
  title: string;
  description: string;
  demoLink: string;
  repoLink: string;
}

export interface CertificateCardProps {
  imageUrl: string;
}

export interface ContactFormElements extends HTMLFormControlsCollection {
  user_name: HTMLInputElement;
  user_email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  imageUrl?: string;
}

export interface ContactFormElement extends HTMLFormElement {
  readonly elements: ContactFormElements;
}

export interface FormData {
  user_name: string;
  user_email: string;
  message: string;
}

export interface FormErrors {
  user_name?: string;
  user_email?: string;
  message?: string;
}
