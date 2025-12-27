export type Project = {
  slug: string;
  title: string;
  order: number;
  images: string[];
  content: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: string;
  href: string;
};
