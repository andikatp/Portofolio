declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

let isInitialized = false;

/**
 * Initialize Google Analytics GA4 script tag dynamically if VITE_GA_MEASUREMENT_ID is provided.
 */
export const initGA = (): void => {
  if (isInitialized || typeof window === "undefined") return;

  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.log(
        "[Analytics] VITE_GA_MEASUREMENT_ID is not set. Analytics calls will be logged to console in dev mode.",
      );
    }
    isInitialized = true;
    return;
  }

  // Initialize dataLayer and gtag function stub immediately
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // We manually trigger page views on route changes
  });

  // Defer script loading so it doesn't block critical path rendering / LCP
  const loadScript = () => {
    if (document.getElementById("ga-script")) return;
    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };

  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => loadScript(), { timeout: 3000 });
  } else {
    setTimeout(loadScript, 2500);
  }

  isInitialized = true;
};

/**
 * Track page views when routes change.
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.log(
        `[Analytics Dev] Page View: ${path} ${title ? `("${title}")` : ""}`,
      );
    }
    return;
  }

  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

/**
 * Track custom user events (e.g. CV download, project click, social link click).
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.log(`[Analytics Dev] Event: ${eventName}`, params);
    }
    return;
  }

  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
};
