import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, useNavigate, Navigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

import { Login } from './components/Login';
import { WorkLogBoard } from './components/WorkLogBoard';
import { CreateWorkLog } from './components/CreateWorkLog';
import { MonthlyReport } from './components/MonthlyReport';
import { MonthlyReportView } from './components/MonthlyReportView';
import { TeamMonthlyReport } from './components/TeamMonthlyReport';
import { MonthlyReportDetail } from './components/MonthlyReportDetail';

const supabaseUrl = `https://${projectId}.supabase.co`;
export const supabase = createClient(supabaseUrl, publicAnonKey);

function AuthWrapper() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ session }} />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: AuthWrapper,
    children: [
      {
        index: true,
        Component: WorkLogBoard,
      },
      {
        path: "create",
        Component: CreateWorkLog,
      },
      {
        path: "monthly-report",
        Component: MonthlyReport,
      },
      {
        path: "monthly-report/view",
        Component: MonthlyReportView,
      },
      {
        path: "team-monthly-report",
        Component: TeamMonthlyReport,
      },
      {
        path: "monthly-report-detail",
        Component: MonthlyReportDetail,
      }
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
}