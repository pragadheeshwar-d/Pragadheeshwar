export const dynamic = "force-dynamic";

const PROFILE_URL = "https://api.codolio.com/profile?userKey=pragadheesh";

/* eslint-disable @typescript-eslint/no-explicit-any */

type CodolioPlatformProfile = {
  platform: string;
  userStats?: {
    stars?: number | null;
    currentRating?: number | null;
    maxRating?: number | null;
    rank?: string | null;
    maxRank?: string | null;
    handle?: string | null;
    level?: number | null;
    userLevelName?: string | null;
  };
  badgeStats?: {
    error?: any;
    badgeList?: {
      name: string;
      shortName?: string | null;
      displayName?: string | null;
      icon?: string | null;
      stars?: number | null;
    }[];
  } | null;
  platformDetails?: {
    types?: string[];
  };
  topicAnalysisStats?: {
    topicWiseDistribution?: Record<string, number>;
  } | null;
  totalQuestionStats?: {
    totalQuestionCounts?: number | null;
    easyQuestionCounts?: number | null;
    mediumQuestionCounts?: number | null;
    hardQuestionCounts?: number | null;
    basicQuestionCounts?: number | null;
  };
  contestActivityStats?: {
    contestActivityList?: {
      contestName: string;
      rating: number;
      contestDate: number;
      rank: number;
    }[];
  } | null;
  dailyActivityStatsResponse?: {
    submissionCalendar?: Record<string, number>;
    maxStreak?: number | null;
    totalActiveDays?: number | null;
  } | null;
};

function readTotalQuestions(platformProfiles: CodolioPlatformProfile[]) {
  return platformProfiles.reduce((total, p) => {
    return total + (p.totalQuestionStats?.totalQuestionCounts ?? 0);
  }, 0);
}

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const profileResponse = await fetch(PROFILE_URL, { cache: "no-store" });
    if (!profileResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch Codolio stats" }, { status: 502 });
    }

    const profileJson = await profileResponse.json();
    const platformProfiles: CodolioPlatformProfile[] =
      profileJson.data?.platformProfiles?.platformProfiles ?? [];

    // Per-platform stats
    const platforms: Record<string, number> = {};
    const difficulty: Record<string, { easy: number; medium: number; hard: number; basic: number }> = {};
    let gfgScore = 0;

    // Contest ratings per platform
    const contestRatings: Record<string, { name: string; rating: number; date: number; rank: number }[]> = {};

    // Platform ratings summary
    const platformRatings: Record<string, { current: number | null; max: number | null; rank: string | null; stars: number | null; handle: string | null; level: string | null }> = {};

    // Topic analysis (aggregated)
    const topicAnalysis: Record<string, number> = {};

    // Submission calendars (aggregated)
    const submissionCalendar: Record<string, number> = {};

    // Streaks
    const streaks: Record<string, number> = {};

    // Badges per platform
    const badges: { platform: string; name: string; displayName: string | null; icon: string | null; stars: number | null }[] = [];

    let totalEasy = 0, totalMedium = 0, totalHard = 0;

    platformProfiles.forEach((profile) => {
      const p = profile.platform;
      platforms[p] = profile.totalQuestionStats?.totalQuestionCounts ?? 0;

      // Difficulty
      if (profile.totalQuestionStats) {
        const qs = profile.totalQuestionStats;
        const d = {
          easy: qs.easyQuestionCounts ?? 0,
          medium: qs.mediumQuestionCounts ?? 0,
          hard: qs.hardQuestionCounts ?? 0,
          basic: qs.basicQuestionCounts ?? 0,
        };
        difficulty[p] = d;
        totalEasy += d.easy;
        totalMedium += d.medium;
        totalHard += d.hard;
      }

      // GFG Score
      if (p === "geeksforgeeks" && profile.totalQuestionStats) {
        const qs = profile.totalQuestionStats;
        gfgScore = ((qs.easyQuestionCounts ?? 0) * 2) + ((qs.mediumQuestionCounts ?? 0) * 4) + ((qs.hardQuestionCounts ?? 0) * 8) + (qs.basicQuestionCounts ?? 0) - 3;
      }

      // Platform ratings
      platformRatings[p] = {
        current: profile.userStats?.currentRating ?? null,
        max: profile.userStats?.maxRating ?? null,
        rank: profile.userStats?.rank ?? profile.userStats?.maxRank ?? null,
        stars: profile.userStats?.stars ?? null,
        handle: profile.userStats?.handle ?? null,
        level: profile.userStats?.userLevelName ?? null,
      };

      // Contest ratings
      if (profile.contestActivityStats?.contestActivityList?.length) {
        contestRatings[p] = profile.contestActivityStats.contestActivityList.map((c) => ({
          name: c.contestName,
          rating: c.rating,
          date: c.contestDate,
          rank: c.rank,
        }));
      }

      // Topic analysis
      if (profile.topicAnalysisStats?.topicWiseDistribution) {
        Object.entries(profile.topicAnalysisStats.topicWiseDistribution).forEach(([topic, count]) => {
          topicAnalysis[topic] = (topicAnalysis[topic] || 0) + count;
        });
      }

      // Submission calendar (aggregate all platforms)
      if (profile.dailyActivityStatsResponse?.submissionCalendar) {
        Object.entries(profile.dailyActivityStatsResponse.submissionCalendar).forEach(([ts, count]) => {
          submissionCalendar[ts] = (submissionCalendar[ts] || 0) + count;
        });
      }

      // Streaks
      if (profile.dailyActivityStatsResponse?.maxStreak) {
        streaks[p] = profile.dailyActivityStatsResponse.maxStreak;
      }

      // Badges
      if (profile.badgeStats?.badgeList?.length) {
        profile.badgeStats.badgeList.forEach((b) => {
          let iconUrl = b.icon ?? null;
          if (iconUrl && iconUrl.startsWith('/static/')) {
            iconUrl = `https://leetcode.com${iconUrl}`;
          }
          badges.push({
            platform: p,
            name: b.name,
            displayName: b.displayName ?? b.shortName ?? b.name,
            icon: iconUrl,
            stars: b.stars ?? null,
          });
        });
      }
    });

    return NextResponse.json({
      totalQuestions: readTotalQuestions(platformProfiles),
      platforms,
      difficulty,
      dsaAggregate: { easy: totalEasy, medium: totalMedium, hard: totalHard },
      gfgScore: gfgScore > 0 ? gfgScore : null,
      contestRatings,
      platformRatings,
      topicAnalysis,
      submissionCalendar,
      streaks,
      badges,
    });
  } catch {
    return NextResponse.json({
      totalQuestions: 0,
      platforms: {},
      difficulty: {},
      dsaAggregate: { easy: 0, medium: 0, hard: 0 },
      gfgScore: null,
      contestRatings: {},
      platformRatings: {},
      topicAnalysis: {},
      submissionCalendar: {},
      streaks: {},
      badges: [],
    }, { status: 500 });
  }
}