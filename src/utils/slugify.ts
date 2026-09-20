import slugifyPackage from "slugify";

export function slugify(text: string): string {
  return slugifyPackage(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}
