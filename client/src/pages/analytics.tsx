import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Eye, Clock, ExternalLink, TrendingUp } from "lucide-react";

interface AnalyticsSummary {
  totalVisits: number;
  uniqueSessions: number;
  topPages: Array<{ path: string; visits: number }>;
  topReferrers: Array<{ referrer: string; visits: number }>;
  avgTimeSpent: number;
}

interface PageVisit {
  id: string;
  sessionId: string;
  path: string;
  referrer: string | null;
  userAgent: string | null;
  timestamp: string;
  timeSpent: string | null;
}

interface Navigation {
  id: string;
  sessionId: string;
  fromPath: string;
  toPath: string;
  timestamp: string;
}

export default function AnalyticsPage() {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV;
  
  if (!isDev) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">This page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  const { data: summary, isLoading: summaryLoading } = useQuery<AnalyticsSummary>({
    queryKey: ['/api/analytics/summary'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: visits, isLoading: visitsLoading } = useQuery<PageVisit[]>({
    queryKey: ['/api/analytics/visits'],
    refetchInterval: 30000,
  });

  const { data: navigations, isLoading: navigationsLoading } = useQuery<Navigation[]>({
    queryKey: ['/api/analytics/navigations'],
    refetchInterval: 30000,
  });

  const formatTimeSpent = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatReferrer = (referrer: string) => {
    if (!referrer) return 'Direct';
    try {
      const url = new URL(referrer);
      return url.hostname;
    } catch {
      return referrer;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CHB Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time visitor analytics and behavior tracking</p>
          <Badge variant="outline" className="mt-2">
            Development Mode Only
          </Badge>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryLoading ? '...' : summary?.totalVisits || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryLoading ? '...' : summary?.uniqueSessions || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryLoading ? '...' : formatTimeSpent(summary?.avgTimeSpent || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {visitsLoading ? '...' : (visits?.length || 0) + (navigations?.length || 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Pages
              </CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summaryLoading ? (
                  <div>Loading...</div>
                ) : summary?.topPages?.length ? (
                  summary.topPages.slice(0, 10).map((page, index) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="text-sm">{page.path}</span>
                      </div>
                      <Badge variant="secondary">{page.visits} visits</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No page data yet</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Top Referrers
              </CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summaryLoading ? (
                  <div>Loading...</div>
                ) : summary?.topReferrers?.length ? (
                  summary.topReferrers.slice(0, 10).map((referrer, index) => (
                    <div key={referrer.referrer} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="text-sm">{formatReferrer(referrer.referrer)}</span>
                      </div>
                      <Badge variant="secondary">{referrer.visits} visits</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No referrer data yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest page visits and navigation patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {visitsLoading ? (
                <div>Loading recent activity...</div>
              ) : visits?.length ? (
                visits
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .slice(0, 50)
                  .map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {visit.path}
                        </Badge>
                        {visit.referrer && (
                          <span className="text-xs text-gray-500">
                            from {formatReferrer(visit.referrer)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {visit.timeSpent && (
                          <span>{formatTimeSpent(parseInt(visit.timeSpent))}</span>
                        )}
                        <span>{new Date(visit.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-sm text-gray-500">No activity data yet</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}