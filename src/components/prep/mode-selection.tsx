import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";

interface ModeSelectionProps {
    onSelect: (mode: 'INTERVIEW' | 'WORK') => void;
    title?: string;
    subtitle?: string;
    theme?: 'emerald' | 'indigo' | 'blue' | 'amber';
    layout?: 'cards' | 'training';
}

export function ModeSelection({ onSelect, title, subtitle, theme = 'emerald', layout = 'cards' }: ModeSelectionProps) {
    const colors = {
        emerald: {
            title: "text-trust-navy",
            iconBg: "bg-emerald-50 group-hover:bg-emerald-100",
            iconBorder: "border-emerald-100 group-hover:border-emerald-200",
            iconColor: "text-emerald-600",
            iconBg2: "bg-teal-50 group-hover:bg-teal-100",
            iconBorder2: "border-teal-100 group-hover:border-teal-200",
            iconColor2: "text-teal-600",
        },
        indigo: {
            title: "text-slate-900",
            iconBg: "bg-indigo-50 group-hover:bg-indigo-100",
            iconBorder: "border-indigo-100 group-hover:border-indigo-200",
            iconColor: "text-indigo-600",
            iconBg2: "bg-violet-50 group-hover:bg-violet-100",
            iconBorder2: "border-violet-100 group-hover:border-violet-200",
            iconColor2: "text-violet-600",
        },
        blue: {
            title: "text-slate-900",
            iconBg: "bg-blue-50 group-hover:bg-blue-100",
            iconBorder: "border-blue-100 group-hover:border-blue-200",
            iconColor: "text-blue-600",
            iconBg2: "bg-sky-50 group-hover:bg-sky-100",
            iconBorder2: "border-sky-100 group-hover:border-sky-200",
            iconColor2: "text-sky-600",
        },
        amber: {
            title: "text-amber-900",
            iconBg: "bg-amber-50 group-hover:bg-amber-100",
            iconBorder: "border-amber-100 group-hover:border-amber-200",
            iconColor: "text-amber-600",
            iconBg2: "bg-orange-50 group-hover:bg-orange-100",
            iconBorder2: "border-orange-100 group-hover:border-orange-200",
            iconColor2: "text-orange-600",
        }
    };

    const c = colors[theme];

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-4 drop-shadow-sm ${c.title}`}>
                {title || "어떤 상황을 준비하고 계신가요?"}
            </h2>
            {subtitle && (
                <p className="text-xl text-slate-600 text-center mb-12">
                    {subtitle}
                </p>
            )}
            <div className={`grid ${layout === 'training' ? 'grid-cols-1 gap-4 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 gap-8'} ${!subtitle ? "mt-12" : ""}`}>
                {/* Interview Mode */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('INTERVIEW')}
                    className={`flex ${layout === 'training' ? 'flex-row items-center p-6 text-left' : 'flex-col items-center p-12 text-center'} bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all group duration-300 border border-slate-200 relative overflow-hidden`}
                >
                    <div className={`${layout === 'training' ? 'w-16 h-16 mr-6' : 'w-24 h-24 mb-8'} rounded-full flex items-center justify-center flex-shrink-0 border transition-colors shadow-sm ${c.iconBg} ${c.iconBorder}`}>
                        <GraduationCap className={`${layout === 'training' ? 'w-8 h-8' : 'w-12 h-12'} transition-colors ${c.iconColor}`} />
                    </div>
                    <div>
                        <h3 className={`${layout === 'training' ? 'text-xl' : 'text-2xl'} font-bold text-slate-800 mb-2`}>비즈니스 보고 / 기안</h3>
                        <p className={`text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors ${layout === 'training' ? 'text-sm' : ''}`}>
                            핵심 전략 보고, 투자 제안 등<br className={layout === 'training' ? 'hidden sm:block' : ''} />
                            자신의 기획과 논리를 설득해야 하는 순간
                        </p>
                    </div>
                </motion.button>

                {/* Work Mode */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('WORK')}
                    className={`flex ${layout === 'training' ? 'flex-row items-center p-6 text-left' : 'flex-col items-center p-12 text-center'} bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all group duration-300 border border-slate-200 relative overflow-hidden`}
                >
                    <div className={`${layout === 'training' ? 'w-16 h-16 mr-6' : 'w-24 h-24 mb-8'} rounded-full flex items-center justify-center flex-shrink-0 border transition-colors shadow-sm ${c.iconBg2} ${c.iconBorder2}`}>
                        <BookOpen className={`${layout === 'training' ? 'w-8 h-8' : 'w-12 h-12'} transition-colors ${c.iconColor2}`} />
                    </div>
                    <div>
                        <h3 className={`${layout === 'training' ? 'text-xl' : 'text-2xl'} font-bold text-slate-800 mb-2`}>이메일 / 메신저</h3>
                        <p className={`text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors ${layout === 'training' ? 'text-sm' : ''}`}>
                            업무 요청, 결과 공유 등<br className={layout === 'training' ? 'hidden sm:block' : ''} />
                            명확하고 간결한 커뮤니케이션이 필요할 때
                        </p>
                    </div>
                </motion.button>
            </div>
        </div>
    );
}
