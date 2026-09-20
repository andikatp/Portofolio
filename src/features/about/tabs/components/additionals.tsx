import { ArrowUpRight } from "lucide-react";
import Magnetic from "../../../../components/ui/magnetic";
import { ABOUT_ADDITIONALS } from "../../data/additionals-data";

export function AboutAdditionals() {
  return (
    <div className="flex flex-row justify-between gap-3 sm:gap-8 md:gap-12">
      {ABOUT_ADDITIONALS.map((item) => (
        <div key={item.title} className="w-1/3 min-w-0">
          <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5">{item.title}</p>
          <div className="text-[10px] sm:text-xs font-medium text-slate-800 wrap-break-word">
            {item.value ? (
              <p>{item.value}</p>
            ) : item.links ? (
              <div className="flex flex-col gap-1 items-start">
                {item.links.map((link) => (
                  <Magnetic key={link.label} strength={0.9}>
                    <a
                      className="inline-flex items-center gap-1 hover:text-slate-900 break-all text-[9px] sm:text-xs leading-tight cursor-pointer"
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutAdditionals;
