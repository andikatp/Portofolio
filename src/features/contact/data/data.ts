export interface ContactLink {
  id: number;
  label: string;
  link: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 1,
    label: "hello@andikatp.dev",
    link: "mailto:hello@andikatp.dev",
  },
  {
    id: 2,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/andika-tri-prasetya-038b33177/",
  },
  {
    id: 3,
    label: "GitHub",
    link: "https://github.com/andikatp",
  },
];
