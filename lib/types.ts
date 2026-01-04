export type ProjectImage = {
  url: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  order: number;
  images: ProjectImage[];
  content: string;
};

export type NavLink = {
  label: string;
  href: string;
  newTab?: boolean;
};

export type SocialLink = {
  name: string;
  href: string;
};
