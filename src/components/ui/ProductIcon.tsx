import {
  Film,
  Brain,
  Cloud,
  Palette,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Send,
  Music,
  Wind,
  Code2,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductIconProps {
  slug: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

const iconSize = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
  xl: "h-9 w-9",
};

const YoutubeMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.121 2.136c1.872.504 9.377.504 9.377.504s7.505 0 9.376-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    />
  </svg>
);

const GithubMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.79.56 4.57-1.52 7.86-5.83 7.86-10.91C23.5 5.65 18.35.5 12 .5z"
    />
  </svg>
);

const config: Record<
  string,
  { gradient: string; render: (cls: string) => React.ReactNode }
> = {
  netflix: {
    gradient: "from-red-600 via-red-700 to-black",
    render: (cls) => (
      <span className={cn(cls, "font-black tracking-tighter text-white")}>
        N
      </span>
    ),
  },
  "youtube-premium": {
    gradient: "from-red-500 to-red-700",
    render: (cls) => <YoutubeMark className={cn(cls, "text-white")} />,
  },
  "chatgpt-plus": {
    gradient: "from-emerald-600 to-emerald-800",
    render: (cls) => (
      <span className={cn(cls, "font-bold text-white")}>GPT</span>
    ),
  },
  "digitalocean-vcc": {
    gradient: "from-blue-500 to-blue-700",
    render: (cls) => <Cloud className={cn(cls, "text-white")} />,
  },
  canva: {
    gradient: "from-cyan-400 via-blue-500 to-purple-500",
    render: (cls) => <Palette className={cn(cls, "text-white")} />,
  },
  "discord-nitro": {
    gradient: "from-indigo-500 to-indigo-700",
    render: (cls) => <MessageSquare className={cn(cls, "text-white")} />,
  },
  "gemini-ai": {
    gradient: "from-blue-500 via-violet-500 to-purple-500",
    render: (cls) => <Sparkles className={cn(cls, "text-white")} />,
  },
  vpn: {
    gradient: "from-emerald-500 to-teal-700",
    render: (cls) => <ShieldCheck className={cn(cls, "text-white")} />,
  },
  "x-twitter-account": {
    gradient: "from-gray-700 to-black",
    render: (cls) => (
      <svg
        viewBox="0 0 24 24"
        className={cn(cls, "fill-current text-white")}
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  "grok-super": {
    gradient: "from-orange-500 to-red-600",
    render: (cls) => (
      <span className={cn(cls, "font-bold text-white")}>xG</span>
    ),
  },
  "twitter-verified": {
    gradient: "from-blue-400 to-blue-600",
    render: (cls) => <BadgeCheck className={cn(cls, "fill-white text-blue-600")} />,
  },
  "telegram-premium": {
    gradient: "from-sky-400 to-blue-600",
    render: (cls) => <Send className={cn(cls, "text-white")} />,
  },
  "github-student": {
    gradient: "from-gray-700 to-gray-900",
    render: (cls) => <GithubMark className={cn(cls, "text-white")} />,
  },
  spotify: {
    gradient: "from-green-500 to-green-700",
    render: (cls) => <Music className={cn(cls, "text-white")} />,
  },
  "windsurf-pro": {
    gradient: "from-cyan-500 to-teal-600",
    render: (cls) => <Wind className={cn(cls, "text-white")} />,
  },
  "github-copilot-pro": {
    gradient: "from-gray-600 to-black",
    render: (cls) => <GithubMark className={cn(cls, "text-white")} />,
  },
};

const fallback = {
  gradient: "from-cyan-500 to-blue-600",
  render: (cls: string) => <Zap className={cn(cls, "text-white")} />,
};

export default function ProductIcon({
  slug,
  size = "md",
  className,
}: ProductIconProps) {
  const cfg = config[slug] ?? fallback;
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
        cfg.gradient,
        sizeMap[size],
        className
      )}
    >
      {cfg.render(iconSize[size])}
    </div>
  );
}

const categoryConfig: Record<
  string,
  { gradient: string; render: (cls: string) => React.ReactNode }
> = {
  hiburan: {
    gradient: "from-red-500 to-orange-500",
    render: (cls) => <Film className={cn(cls, "text-white")} />,
  },
  "ai-tools": {
    gradient: "from-emerald-500 to-cyan-500",
    render: (cls) => <Brain className={cn(cls, "text-white")} />,
  },
  developer: {
    gradient: "from-blue-500 to-indigo-500",
    render: (cls) => <Code2 className={cn(cls, "text-white")} />,
  },
  "social-premium": {
    gradient: "from-violet-500 to-purple-500",
    render: (cls) => <MessageSquare className={cn(cls, "text-white")} />,
  },
  produktivitas: {
    gradient: "from-cyan-500 to-blue-500",
    render: (cls) => <Palette className={cn(cls, "text-white")} />,
  },
  security: {
    gradient: "from-teal-500 to-green-500",
    render: (cls) => <ShieldCheck className={cn(cls, "text-white")} />,
  },
};

export function CategoryIcon({
  slug,
  size = "md",
  className,
}: {
  slug: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const cfg = categoryConfig[slug] ?? {
    gradient: "from-cyan-500 to-blue-600",
    render: (cls: string) => <Play className={cn(cls, "text-white")} />,
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
        cfg.gradient,
        sizeMap[size],
        className
      )}
    >
      {cfg.render(iconSize[size])}
    </div>
  );
}
