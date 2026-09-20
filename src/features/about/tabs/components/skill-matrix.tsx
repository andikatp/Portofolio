import { SKILL_CATEGORIES } from "../../data/data";

export function AboutSkillMatrix() {
  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
        SKILLS & TECHNOLOGIES
      </p>
      <div className="space-y-5 text-sm">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-4"
          >
            <span className="text-xs font-semibold text-slate-900 tracking-wider w-full sm:w-2/5 uppercase">
              {cat.title}
            </span>
            <span className="text-slate-600 font-normal w-full sm:w-3/5 text-sm leading-relaxed">
              {cat.skills.join(" • ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutSkillMatrix;
