import { ArrowUpRight } from "lucide-react";
import Magnetic from "../../../../components/ui/magnetic";
import { ABOUT_ADDITIONALS } from "../../data/additionals-data";

interface AboutAdditionalsProps {
  className?: string;
  isDark?: boolean;
}

export function AboutAdditionals({
  className = "",
  isDark = false,
}: AboutAdditionalsProps) {
  return (
    <div className={`flex flex-row justify-between gap-3 sm:gap-8 md:gap-12 ${className}`}>
      {ABOUT_ADDITIONALS.map((item) => (
        <div key={item.title} className="w-1/3 min-w-0">
          <p className={`${isDark ? "text-slate-400" : "text-slate-500"} text-[10px] sm:text-xs mb-1 font-semibold tracking-wider`}>
            {item.title}
          </p>
          <div className={`text-[10px] sm:text-xs font-medium ${isDark ? "text-slate-100" : "text-slate-800"} wrap-break-word`}>
            {item.value ? (
              <p className="leading-snug">{item.value}</p>
            ) : item.links ? (
              <div className="flex flex-col gap-1 items-start">
                {item.links.map((link) => (
                  <Magnetic key={link.label} strength={0.9}>
                    <a
                      className={`inline-flex items-center gap-1 ${
                        isDark
                          ? "text-slate-200 hover:text-white"
                          : "text-slate-700 hover:text-slate-900"
                      } transition-colors break-all text-[10px] sm:text-xs leading-tight cursor-pointer`}
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

