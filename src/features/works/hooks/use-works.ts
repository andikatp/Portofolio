import { useEffect, useState } from "react";
import { WORKS, type WorkItem } from "../data/work-data";
import { fetchWorksFromContentful } from "../services/work-service";

let cachedWorks: WorkItem[] | null = null;
let fetchPromise: Promise<WorkItem[]> | null = null;

export function useWorks() {
  const [works, setWorks] = useState<WorkItem[]>(cachedWorks || WORKS);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedWorks);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedWorks) {
      return;
    }

    let isMounted = true;
    if (!fetchPromise) {
      fetchPromise = fetchWorksFromContentful();
    }

    fetchPromise
      .then((data) => {
        cachedWorks = data;
        if (isMounted) {
          setWorks(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load works");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { works, isLoading, error };
}
