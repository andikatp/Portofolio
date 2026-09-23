import { contentfulClient, isContentfulConfigured } from "../../../lib/contentful-client";
import { WORKS, type WorkItem } from "../data/work-data";

function getAssetUrl(asset: any, options?: { width?: number }): string | null {
  if (!asset || !asset.fields || !asset.fields.file) return null;
  const url = asset.fields.file.url;
  if (!url) return null;
  const fullUrl = url.startsWith("//") ? `https:${url}` : url;
  if (fullUrl.includes("images.ctfassets.net")) {
    const widthParam = options?.width ? `&w=${options.width}` : "";
    if (!fullUrl.includes("fm=")) {
      return fullUrl.includes("?")
        ? `${fullUrl}&fm=webp&q=80${widthParam}`
        : `${fullUrl}?fm=webp&q=80${widthParam}`;
    }
    if (options?.width && !fullUrl.includes("w=")) {
      return `${fullUrl}&w=${options.width}`;
    }
  }
  return fullUrl;
}

export async function fetchWorksFromContentful(): Promise<WorkItem[]> {
  if (!isContentfulConfigured || !contentfulClient) {
    return WORKS;
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: "work",
      order: ["fields.order", "-sys.createdAt"],
    });

    if (!response.items || response.items.length === 0) {
      return WORKS;
    }

    const fetchedWorks: WorkItem[] = response.items.map((item: any, index: number) => {
      const fields = item.fields || {};
      const thumbnailAsset = fields.thumbnail;
      const mainImage = getAssetUrl(thumbnailAsset, { width: 360 }) || "";

      let galleryImages: string[] = [];
      if (Array.isArray(fields.images)) {
        galleryImages = fields.images
          .map((imgAsset: any) => getAssetUrl(imgAsset, { width: 1080 }))
          .filter((url: string | null): url is string => Boolean(url));
      }

      const itemOrder =
        typeof fields.order === "number"
          ? fields.order
          : typeof fields.order === "string"
            ? parseInt(fields.order, 10)
            : undefined;

      return {
        id: index + 1,
        slug: fields.slug || undefined,
        title: fields.title || "Untitled Project",
        category: fields.category || "PROJECT",
        image: mainImage,
        images: galleryImages,
        description: fields.description || "",
        techstacks: Array.isArray(fields.techstacks) ? fields.techstacks : [],
        role: fields.role || "Developer",
        playStoreUrl: fields.playStoreUrl || undefined,
        appStoreUrl: fields.appStoreUrl || undefined,
        order: itemOrder,
      };
    });

    // Sort by order ascending if specified, keeping items without order at the end
    fetchedWorks.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return 0;
    });

    return fetchedWorks;
  } catch (error) {
    console.warn("Contentful fetch failed or not configured, using local works data fallback:", error);
    return WORKS;
  }
}
