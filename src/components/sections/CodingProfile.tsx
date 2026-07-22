"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { codingStats } from "@/data/content";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef, SiCodeforces, SiHackerrank } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

// ─── Types ───────────────────────────────────────────────────────────────────

type LiveStats = {
  totalQuestions: number;
  platforms: Record<string, number>;
  dsaAggregate: { easy: number; medium: number; hard: number };
  gfgScore: number | null;
  contestRatings: Record<string, { name: string; rating: number; date: number; rank: number }[]>;
  platformRatings: Record<string, { current: number | null; max: number | null; rank: string | null; stars: number | null; handle: string | null; level: string | null }>;
  topicAnalysis: Record<string, number>;
  submissionCalendar: Record<string, number>;
  streaks: Record<string, number>;
  badges: { platform: string; name: string; displayName: string | null; icon: string | null; stars: number | null }[];
};

const defaultStats: LiveStats = {
  totalQuestions: parseInt(codingStats.totalSolved as string) || 0,
  platforms: {},
  dsaAggregate: { easy: 0, medium: 0, hard: 0 },
  gfgScore: null,
  contestRatings: {},
  platformRatings: {},
  topicAnalysis: {},
  submissionCalendar: {},
  streaks: {},
  badges: [],
};

// ─── Platform Icons ──────────────────────────────────────────────────────────

const platformIcons: Record<string, React.ReactNode> = {
  LeetCode: <SiLeetcode className="w-7 h-7 text-orange-500" />,
  GeeksforGeeks: <SiGeeksforgeeks className="w-7 h-7 text-emerald-500" />,
  CodeChef: <SiCodechef className="w-7 h-7 text-amber-600" />,
  Codeforces: <SiCodeforces className="w-7 h-7 text-blue-500" />,
  HackerRank: <SiHackerrank className="w-7 h-7 text-emerald-400" />,
  CodingNinjas: <TbBrandCpp className="w-7 h-7 text-orange-400" />,
};

const platformKeyToName: Record<string, string> = {
  leetcode: "LeetCode",
  geeksforgeeks: "GeeksforGeeks",
  codechef: "CodeChef",
  codeforces: "Codeforces",
  hackerrank: "HackerRank",
  codestudio: "CodingNinjas",
};

const platformColors: Record<string, string> = {
  leetcode: "#f59e0b",
  codechef: "#d97706",
  codeforces: "#3b82f6",
  codestudio: "#f97316",
  geeksforgeeks: "#10b981",
};

// ─── Donut Chart ─────────────────────────────────────────────────────────────

const DonutChart = ({ total, segments, size = 140, strokeWidth = 12 }: {
  total: number;
  segments: { value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="currentColor" className="text-border" strokeWidth={strokeWidth} />
        {segments.map((segment, index) => {
          const dashArray = (segment.value / Math.max(total, 1)) * circumference;
          const strokeDasharray = `${Math.max(dashArray - 2, 0)} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          currentOffset += dashArray;
          return (
            <circle key={index} cx={size / 2} cy={size / 2} r={radius} fill="transparent"
              stroke={segment.color} strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" className="transition-all duration-1000 ease-in-out" />
          );
        })}
      </svg>
      <div className="absolute text-foreground font-extrabold text-2xl">{total}</div>
    </div>
  );
};

// ─── Activity Heatmap ────────────────────────────────────────────────────────

const ActivityHeatmap = ({ calendar }: { calendar: Record<string, number> }) => {
  const { weeks, months, totalSubmissions, maxStreak, currentStreak } = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 6 * 30); // ~6 months back

    const dayMs = 86400000;
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // align to Sunday

    const weeksArr: { date: Date; count: number }[][] = [];
    const monthsArr: { label: string; col: number }[] = [];
    let currentWeek: { date: Date; count: number }[] = [];
    let lastMonth = -1;
    const current = new Date(start);

    while (current <= now) {
      const ts = Math.floor(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()) / 1000).toString();
      const count = calendar[ts] || 0;

      if (current.getDay() === 0 && currentWeek.length > 0) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }

      if (current.getMonth() !== lastMonth) {
        monthsArr.push({
          label: current.toLocaleString("en", { month: "short" }),
          col: weeksArr.length,
        });
        lastMonth = current.getMonth();
      }

      currentWeek.push({ date: new Date(current), count });
      current.setTime(current.getTime() + dayMs);
    }
    if (currentWeek.length > 0) weeksArr.push(currentWeek);

    // Calculate overall stats
    const counts = Object.values(calendar);
    const total = counts.reduce((a, b) => a + b, 0);

    const timestamps = Object.keys(calendar).map(Number).sort((a, b) => a - b);
    let cStreak = 0;
    let mStreak = 0;
    
    const DAY_IN_SECONDS = 86400;
    const todayTs = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 1000);

    let activeStreak = 0;
    let tempMax = 0;
    
    if (timestamps.length > 0) {
      let prevTs = timestamps[0];
      activeStreak = 1;
      tempMax = 1;
      
      for (let i = 1; i < timestamps.length; i++) {
        const diff = timestamps[i] - prevTs;
        if (diff === DAY_IN_SECONDS) {
          activeStreak++;
        } else {
          activeStreak = 1;
        }
        if (activeStreak > tempMax) tempMax = activeStreak;
        prevTs = timestamps[i];
      }

      const lastTs = timestamps[timestamps.length - 1];
      if (lastTs === todayTs || lastTs === todayTs - DAY_IN_SECONDS) {
        cStreak = activeStreak;
      } else {
        cStreak = 0;
      }
    }
    
    mStreak = tempMax;

    return { weeks: weeksArr, months: monthsArr, totalSubmissions: total, maxStreak: mStreak, currentStreak: cStreak };
  }, [calendar]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-border/30";
    if (count <= 3) return "bg-emerald-900/60";
    if (count <= 8) return "bg-emerald-700/70";
    if (count <= 15) return "bg-emerald-500/80";
    return "bg-emerald-400";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-3 border-b border-border/50">
        <h3 className="text-xl font-bold text-foreground">Activity</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold tracking-wide">
          <span className="text-muted">Submissions <span className="text-accent-1 ml-1">{totalSubmissions}</span></span>
          <span className="text-muted">Max Streak <span className="text-accent-1 ml-1">{maxStreak}</span></span>
          <span className="text-muted">Current Streak <span className="text-accent-1 ml-1">{currentStreak}</span></span>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[600px]">
          <div className="flex gap-0.5 mb-1 ml-8">
            {months.map((m, i) => (
              <div key={i} className="text-[10px] text-slate-500" style={{ position: "relative", left: `${m.col * 13}px` }}>
                {m.label}
              </div>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] mr-1">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div key={i} className="text-[10px] text-muted h-[11px] flex items-center">{d}</div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week.find(d => d.date.getDay() === di);
                  return (
                    <div key={di}
                      className={`w-[11px] h-[11px] rounded-[2px] ${day ? getColor(day.count) : "bg-border/30"}`}
                      title={day ? `${day.date.toDateString()}: ${day.count} submissions` : ""} />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-3 justify-end">
            <span className="text-[10px] text-slate-500 mr-1">Less</span>
            {[0, 2, 5, 10, 20].map((v) => (
              <div key={v} className={`w-[11px] h-[11px] rounded-[2px] ${getColor(v)}`} />
            ))}
            <span className="text-[10px] text-slate-500 ml-1">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Contest Rating Chart (SVG) ──────────────────────────────────────────────

const TotalContestsCard = ({ contestRatings, activePlatform, setActivePlatform }: { contestRatings: LiveStats["contestRatings"], activePlatform: string, setActivePlatform: (p: string) => void }) => {
  const platformCounts = Object.entries(contestRatings)
    .map(([platform, contests]) => ({
      platform,
      count: contests.length,
    }))
    .filter(p => p.count > 0)
    .sort((a, b) => b.count - a.count);

  const totalContests = platformCounts.reduce((acc, curr) => acc + curr.count, 0);

  if (totalContests === 0) return null;

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-12 h-full">
      {/* Left: Total */}
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-muted font-semibold text-xl mb-3">Total Contests</h4>
        <span className="text-8xl font-black text-foreground drop-shadow-lg leading-none">{totalContests}</span>
      </div>

      {/* Right: Platforms List */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {platformCounts.map(({ platform, count }) => {
          const name = platformKeyToName[platform] || platform;
          const color = platformColors[platform] || "#888";
          const icon = platformIcons[name] || null;
          const isActive = activePlatform === platform;

          return (
            <div 
              key={platform} 
              onClick={() => setActivePlatform(platform)}
              className={`flex items-center justify-between rounded-xl px-5 py-3 border cursor-pointer transition-all duration-200 ${isActive ? 'bg-card border-accent-1/50 shadow-lg' : 'bg-card/40 border-border/50 hover:border-border'}`}
            >
              <div className="flex items-center gap-4">
                {icon ? (
                  <span className="text-2xl">{icon}</span>
                ) : (
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                )}
                <span className={`font-semibold tracking-wide text-lg ${isActive ? 'text-foreground' : 'text-muted'}`}>{name}</span>
              </div>
              <span className={`font-bold text-xl ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ContestRatingChart = ({ contestRatings, activePlatform }: { contestRatings: LiveStats["contestRatings"], activePlatform: string }) => {
  const platforms = Object.keys(contestRatings).filter(p => contestRatings[p].length > 0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (platforms.length === 0 || !contestRatings[activePlatform]) return null;

  const data = [...contestRatings[activePlatform]].sort((a, b) => a.date - b.date);
  if (data.length === 0) return null;

  const latest = data[data.length - 1];
  const activeContest = hoveredIndex !== null ? data[hoveredIndex] : latest;

  const color = platformColors[activePlatform] || "#f59e0b";

  const W = 700, H = 250, PAD_X = 50, PAD_Y = 20, BOTTOM_PAD = 30;
  
  const minR = Math.min(...data.map(c => c.rating)) - 50;
  const maxR = Math.max(...data.map(c => c.rating)) + 50;
  const minD = data[0].date;
  const maxD = data[data.length - 1].date;
  
  const scaleX = (d: number) => PAD_X + ((d - minD) / Math.max(maxD - minD, 1)) * (W - PAD_X * 2);
  const scaleY = (r: number) => H - BOTTOM_PAD - ((r - minR) / Math.max(maxR - minR, 1)) * (H - PAD_Y - BOTTOM_PAD);

  const points = data.map(c => ({ x: scaleX(c.date), y: scaleY(c.rating) }));

  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp2x = cp1x;
      pathD += ` C ${cp1x},${p0.y} ${cp2x},${p1.y} ${p1.x},${p1.y}`;
    }
  }

  const fillPathD = pathD ? `${pathD} L ${points[points.length - 1].x},${H - BOTTOM_PAD} L ${points[0].x},${H - BOTTOM_PAD} Z` : "";

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-6 w-full">
        <div>
          <div className="text-muted font-semibold mb-1">Rating</div>
          <div className="text-3xl font-black text-foreground">{Math.round(activeContest.rating)}</div>
        </div>
        <div className="text-right">
          <div className="text-muted text-sm mb-1">{new Date(activeContest.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <div className="text-foreground font-bold">{activeContest.name}</div>
          <div className="text-muted text-sm">Rank:{activeContest.rank}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[200px] relative w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${activePlatform}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Y Axis Grid/Labels */}
          {[0, 0.33, 0.66, 1].map((frac) => {
            const r = minR + frac * (maxR - minR);
            const y = scaleY(r);
            return (
              <g key={frac}>
                <text x={PAD_X - 10} y={y + 4} textAnchor="end" fill="#64748b" fontSize="12">{Math.round(r)}</text>
              </g>
            );
          })}

          {/* Area Fill */}
          {fillPathD && (
            <path d={fillPathD} fill={`url(#grad-${activePlatform})`} />
          )}

          {/* Line */}
          {pathD && (
            <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          )}

          {/* Interactive Overlay & Points */}
          {points.map((p, i) => (
            <g key={i} 
               onMouseEnter={() => setHoveredIndex(i)} 
               onMouseLeave={() => setHoveredIndex(null)}
               className="cursor-pointer">
              {/* Invisible larger hit area */}
              <circle cx={p.x} cy={p.y} r="15" fill="transparent" />
              {/* Visible dot, only show on hover or if it's the latest/active */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={hoveredIndex === i || (hoveredIndex === null && i === points.length - 1) ? "5" : "0"} 
                fill={color} 
                stroke="#1e293b" 
                strokeWidth="2" 
                className="transition-all duration-200"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

const ContestsSectionWrapper = ({ contestRatings }: { contestRatings: LiveStats["contestRatings"] }) => {
  const platforms = Object.keys(contestRatings).filter(p => contestRatings[p].length > 0);
  const [activePlatform, setActivePlatform] = useState<string>(platforms.includes('leetcode') ? 'leetcode' : platforms[0]);

  if (platforms.length === 0) return null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
      <div className="glass-card rounded-[20px] p-6 h-full flex flex-col justify-center">
        <TotalContestsCard contestRatings={contestRatings} activePlatform={activePlatform} setActivePlatform={setActivePlatform} />
      </div>
      <div className="glass-card rounded-[20px] p-6 h-full flex flex-col justify-center">
        <ContestRatingChart contestRatings={contestRatings} activePlatform={activePlatform} />
      </div>
    </div>
  );
};

// ─── Topic Analysis ──────────────────────────────────────────────────────────

const TopicAnalysis = ({ topics }: { topics: Record<string, number> }) => {
  const sorted = useMemo(() => {
    return Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
  }, [topics]);

  if (sorted.length === 0) return null;
  const maxVal = sorted[0][1];

  return (
    <div className="flex flex-col gap-2.5">
      {sorted.map(([topic, count]) => (
        <div key={topic} className="flex items-center gap-3">
          <span className="text-xs text-muted w-36 text-right truncate shrink-0">{topic}</span>
          <div className="flex-1 bg-background rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(count / maxVal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-accent-1 to-accent-2"
            />
          </div>
          <span className="text-xs text-foreground font-bold w-8">{count}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export function CodingProfile() {
  const [stats, setStats] = useState<LiveStats>(defaultStats);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/codolio-stats")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (isMounted && data?.platforms) setStats({ ...defaultStats, ...data });
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Problems Solved data
  const gfgSolved = stats.platforms["geeksforgeeks"] || 0;
  const hrSolved = stats.platforms["hackerrank"] || 0;
  const totalFundamentals = gfgSolved + hrSolved;

  const { easy: easyDSA, medium: mediumDSA, hard: hardDSA } = stats.dsaAggregate;
  const totalDSA = easyDSA + mediumDSA + hardDSA;

  const codechefSolved = stats.platforms["codechef"] || 0;
  const codeforcesSolved = stats.platforms["codeforces"] || 0;
  const totalCP = codechefSolved + codeforcesSolved;

  // Max streak across all platforms (calculated from the global submission calendar)
  const globalMaxStreak = useMemo(() => {
    const calendar = stats.submissionCalendar;
    if (!calendar || Object.keys(calendar).length === 0) return 0;
    const timestamps = Object.keys(calendar).map(Number).sort((a, b) => a - b);
    const DAY_IN_SECONDS = 86400;
    let activeStreak = 0;
    let tempMax = 0;
    if (timestamps.length > 0) {
      let prevTs = timestamps[0];
      activeStreak = 1;
      tempMax = 1;
      for (let i = 1; i < timestamps.length; i++) {
        const diff = timestamps[i] - prevTs;
        if (diff === DAY_IN_SECONDS) {
          activeStreak++;
        } else {
          activeStreak = 1;
        }
        if (activeStreak > tempMax) tempMax = activeStreak;
        prevTs = timestamps[i];
      }
    }
    return tempMax;
  }, [stats.submissionCalendar]);

  // Platform cards data
  const platformCards = [
    { key: "leetcode", name: "LeetCode", link: "https://leetcode.com/u/Pragadheeshwar-06/", borderColor: "border-orange-500/30", color: "from-amber-500/20 to-orange-500/20", textColor: "text-orange-400" },
    { key: "geeksforgeeks", name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/profile/pragadhees06", borderColor: "border-emerald-500/30", color: "from-green-500/20 to-emerald-500/20", textColor: "text-emerald-400" },
    { key: "codechef", name: "CodeChef", link: "https://www.codechef.com/users/pragadhees_06", borderColor: "border-yellow-600/30", color: "from-amber-700/20 to-yellow-600/20", textColor: "text-yellow-500" },
    { key: "codeforces", name: "Codeforces", link: "https://codeforces.com/profile/pragadheesh", borderColor: "border-blue-500/30", color: "from-blue-600/20 to-indigo-600/20", textColor: "text-blue-400" },
    { key: "codestudio", name: "CodingNinjas", link: "https://www.naukri.com/code360/profile/Pragadheesh", borderColor: "border-orange-500/30", color: "from-orange-600/20 to-red-500/20", textColor: "text-orange-400" },
    { key: "hackerrank", name: "HackerRank", link: "#", borderColor: "border-emerald-400/30", color: "from-emerald-600/20 to-green-500/20", textColor: "text-emerald-400" },
  ];

  const getRatingLabel = (key: string) => {
    if (key === 'geeksforgeeks' && stats.gfgScore) return `Score ${stats.gfgScore}`;
    const r = stats.platformRatings[key];
    if (!r) return null;
    if (r.max) return `Max ${r.max}`;
    if (r.stars) return `${r.stars}★`;
    return null;
  };

  return (
    <section id="coding-profile" className="py-24 px-6 relative scroll-mt-16">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] -z-10" />
      <div className="container mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Coding Profile</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Competitive Programming & Problem Solving</p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Top Section: Stats (Left) + Heatmap (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Left: Total Solved & Max Streak Cards */}
          <div className="flex flex-col gap-4 justify-center">
            {/* Total Solved Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex-1 flex flex-col items-center justify-center p-6 rounded-[20px] border border-accent-1/30 bg-card shadow-xl backdrop-blur-md relative overflow-hidden min-h-[140px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-1/10 to-accent-2/10 pointer-events-none" />
              <p className="text-foreground font-medium mb-2 relative z-10 text-lg">Total Solved</p>
              <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-1 to-accent-2 relative z-10">
                {stats.totalQuestions}
              </p>
            </motion.div>

            {/* Max Streak Card */}
            {globalMaxStreak > 0 && (
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="flex-1 flex flex-col items-center justify-center p-6 rounded-[20px] border border-accent-1/30 bg-card shadow-xl backdrop-blur-md relative overflow-hidden min-h-[140px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-1/10 to-accent-2/10 pointer-events-none" />
                <p className="text-foreground font-medium mb-2 relative z-10 text-lg">🔥 Max Streak</p>
                <p className="text-5xl font-extrabold text-accent-1 relative z-10">
                  {globalMaxStreak}
                </p>
              </motion.div>
            )}
          </div>

          {/* Right: Activity Heatmap */}
          <div className="xl:col-span-2">
            {Object.keys(stats.submissionCalendar).length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="glass-card rounded-[20px] p-6 h-full flex flex-col justify-center">
                <ActivityHeatmap calendar={stats.submissionCalendar} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Two Column: Problems Solved (left) + Platform Cards (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch mb-12">

          {/* Left: Problems Solved */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-card rounded-[20px] p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border/50 text-center">Problems Solved</h3>
            <div className="flex flex-col divide-y divide-border/50">
              {/* Fundamentals */}
              <div className="py-8 first:pt-2 last:pb-0">
                <div className="text-foreground font-semibold mb-6 flex items-center justify-center gap-2">
                  Fundamentals
                  <span className="text-muted text-[10px] flex items-center justify-center w-4 h-4 border border-border/50 rounded-full cursor-help" title="GeeksforGeeks, HackerRank">i</span>
                </div>
                <div className="flex flex-row items-center justify-center gap-8">
                  <DonutChart total={totalFundamentals} size={110} strokeWidth={10} segments={[
                    { value: gfgSolved, color: "#4ade80" }, { value: hrSolved, color: "#facc15" }
                  ]} />
                  <div className="flex flex-col gap-3 w-full max-w-[180px]">
                    <StatRow color="#4ade80" label="GFG" value={gfgSolved} />
                    <StatRow color="#facc15" label="HackerRank" value={hrSolved} />
                  </div>
                </div>
              </div>
              {/* DSA */}
              <div className="py-8 first:pt-2 last:pb-0">
                <div className="text-foreground font-semibold mb-6 text-center">DSA</div>
                <div className="flex flex-row items-center justify-center gap-8">
                  <DonutChart total={totalDSA} size={110} strokeWidth={10} segments={[
                    { value: easyDSA, color: "#4ade80" }, { value: mediumDSA, color: "#facc15" }, { value: hardDSA, color: "#f87171" }
                  ]} />
                  <div className="flex flex-col gap-2.5 w-full max-w-[180px]">
                    <StatRow color="#4ade80" label="Easy" value={easyDSA} />
                    <StatRow color="#facc15" label="Medium" value={mediumDSA} />
                    <StatRow color="#f87171" label="Hard" value={hardDSA} />
                  </div>
                </div>
              </div>
              {/* CP */}
              <div className="py-8 first:pt-2 last:pb-0">
                <div className="text-foreground font-semibold mb-6 text-center">Competitive Programming</div>
                <div className="flex flex-row items-center justify-center gap-8">
                  <DonutChart total={totalCP} size={110} strokeWidth={10} segments={[
                    { value: codechefSolved, color: "#4ade80" }, { value: codeforcesSolved, color: "#facc15" }
                  ]} />
                  <div className="flex flex-col gap-3 w-full max-w-[180px]">
                    <StatRow color="#4ade80" label="Codechef" value={codechefSolved} />
                    <StatRow color="#facc15" label="Codeforces" value={codeforcesSolved} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Platform Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platformCards.map((platform, index) => {
              const solved = stats.platforms[platform.key] || 0;
              const ratingLabel = getRatingLabel(platform.key);
              return (
                <motion.a key={platform.key} href={platform.link} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`relative overflow-hidden rounded-[20px] border ${platform.borderColor} bg-card shadow-lg backdrop-blur-md hover:scale-[1.02] transition-transform duration-300 group`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-card border border-border/50">
                        {platformIcons[platform.name] || <span className="text-xl">🚀</span>}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-accent-1 transition-colors">{platform.name}</h3>
                        {stats.platformRatings[platform.key]?.handle && (
                          <p className="text-[11px] text-muted truncate" title={`@${stats.platformRatings[platform.key]?.handle}`}>
                            @{platform.key === 'codestudio' ? 'Pragadheesh' : stats.platformRatings[platform.key]?.handle}
                          </p>
                        )}
                      </div>
                      <span className="text-muted text-sm ml-auto group-hover:text-foreground transition-colors">↗</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-background/40 rounded-xl p-3 border border-border/30">
                        <p className="text-muted text-[10px] uppercase tracking-wider mb-1">Solved</p>
                        <p className={`text-xl font-bold ${platform.textColor}`}>{solved}</p>
                      </div>
                      <div className="bg-background/40 rounded-xl p-3 border border-border/30">
                        <p className="text-muted text-[10px] uppercase tracking-wider mb-1">Rating</p>
                        <p className="text-sm font-semibold text-foreground">{ratingLabel || "—"}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Contests Section (Two Column) */}
        {Object.keys(stats.contestRatings).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border/50">Contests</h3>
            <ContestsSectionWrapper contestRatings={stats.contestRatings} />
          </motion.div>
        )}

        {/* Topic Analysis */}
        {Object.keys(stats.topicAnalysis).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-[20px] p-6 mb-12">
            <h3 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border/50">Top Topics</h3>
            <TopicAnalysis topics={stats.topicAnalysis} />
          </motion.div>
        )}

        {/* Badges */}
        {stats.badges.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-[20px] p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border/50">Badges & Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {stats.badges.map((badge, i) => (
                <div key={i} className="bg-card/40 border border-border/50 rounded-xl p-3 text-center flex flex-col items-center gap-2 hover:border-accent-1/40 transition-colors">
                  {badge.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={badge.icon} alt={badge.displayName || badge.name} className="w-12 h-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
                  ) : badge.stars ? (
                    <div className="h-12 flex items-center justify-center text-yellow-400 text-sm tracking-[0.15em] drop-shadow-sm group-hover:scale-110 transition-transform">
                      {"⭐".repeat(Math.min(badge.stars, 5))}
                    </div>
                  ) : badge.platform === 'codestudio' ? (
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${badge.name.toLowerCase() === 'achiever' ? 'from-orange-500 to-amber-500' : 'from-blue-500 to-cyan-500'} shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform`}>
                      <div className="absolute inset-[2px] bg-card/90 rounded-[10px] flex items-center justify-center">
                        <span className="text-xl">
                          {{
                            "Arrays": "📊", "Linked List": "🔗", "Recursion": "🔄", "Two Pointers": "✌️",
                            "Binary Search": "🔍", "Dynamic Programming": "🧠", "Greedy": "🤑",
                            "Hash Table": "#️⃣", "Math": "➗", "Sorting": "🔀", "Stacks & Queues": "🥞",
                            "Strings": "🔤"
                          }[badge.displayName || ""] || (badge.name.toLowerCase() === 'achiever' ? "🏆" : "🏅")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-accent-1/20 to-accent-2/20 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      🏅
                    </div>
                  )}
                  <p className="text-[11px] text-foreground font-medium leading-tight">{badge.displayName || badge.name}</p>
                  <p className="text-[10px] text-muted capitalize">{platformKeyToName[badge.platform] || badge.platform}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatRow({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex justify-between items-center bg-card/40 rounded-lg px-4 py-2 border border-border/50">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-medium" style={{ color }}>{label}</span>
      </div>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}
