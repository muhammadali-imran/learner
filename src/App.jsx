import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import SidebarProvider from './contexts/SidebarProvider'   
import ThemeProvider from './contexts/ThemeProvider'       
import { ToastProvider } from './components/NotificationContext' 
// import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'

// ... rest of page imports

// Public pages
import LandingPage              from './pages/LandingPage'
import LoginPage                from './pages/LoginPage'
import RegisterPage             from './pages/RegisterPage'
import ForgetPasswordPage       from './pages/ForgetPasswordPage'
import ResetPasswordPage        from './pages/ResetPasswordPage'
import EmailVerificationPage    from './pages/EmailVerificationPage'
import OnboardingPage           from './pages/OnboardingPage'
import AboutPage                from './pages/AboutPage'
import PrivacyPolicyPage        from './pages/PrivacyPolicyPage'
import TermsofServicePage       from './pages/TermsofServicePage'
import SupportPage              from './pages/SupportPage'
import NotFoundPage             from './pages/NotFoundPage'

// Protected pages
import Dashboard                from './pages/LearningManagementDashboard'
import CourseListPage           from './pages/CourseListPage'
import CoursePage               from './pages/CoursePage'
import EnrolledCoursePage       from './pages/EnrolledCoursePage'
import ClassroomPage            from './pages/ClassroomPage'
import LecturePage              from './pages/LecturePage'
import LectureHistory           from './pages/LectureHistory'
import ELearningPage            from './pages/ELearningPage'
import QuizPage                 from './pages/QuizPage'
import QuizHistory              from './pages/QuizHistory'
import ResultPage               from './pages/ResultPage'
import AssignmentListPage       from './pages/AssignmentListPage'
import AssignmentPage           from './pages/AssignmentPage'
import AttendancePage           from './pages/AttendancePage'
import GradesPage               from './pages/GradesPage'
import SchedulePage             from './pages/SchedulePage'
import DigitalLibrary           from './pages/DigitalLibrary'
import DiscussionPage           from './pages/DiscussionPage'
import FeePage                  from './pages/FeePage'
import PaymentPage              from './pages/PaymentPage'
import PaymentHistoryPage       from './pages/PaymentHistoryPage'
import ProfilePage              from './pages/ProfilePage'
import Settings                 from './pages/Settings'
import FeedbackPage             from './pages/FeedbackPage'
import BookmarkPage             from './pages/BookmarkPage'
import PDFViewer                from './pages/PDFViewer'
import './index.css'

/*
function Protected({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
*/

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <ToastProvider>
              <Routes>
                {/* ── Public ── */}
                <Route path="/"                  element={<LandingPage />} />
                <Route path="/login"             element={<LoginPage />} />
                <Route path="/register"          element={<RegisterPage />} />
                <Route path="/forgot-password"   element={<ForgetPasswordPage />} />
                <Route path="/reset-password"    element={<ResetPasswordPage />} />
                <Route path="/verify-email"      element={<EmailVerificationPage />} />
                <Route path="/onboarding"        element={<OnboardingPage />} />
                <Route path="/about"             element={<AboutPage />} />
                <Route path="/privacy"           element={<PrivacyPolicyPage />} />
                <Route path="/terms"             element={<TermsofServicePage />} />
                <Route path="/support"           element={<SupportPage />} />

                {/* ── Protected (inside sidebar layout) ── */}
                <Route element={<MainLayout/>/*<Protected><MainLayout /></Protected>*/}> 
                  <Route index path="/dashboard"          element={<Dashboard />} />
                  <Route path="/courses"                  element={<CourseListPage />} />
                  <Route path="/courses/:id"              element={<CoursePage />} />
                  <Route path="/my-courses"               element={<EnrolledCoursePage />} />
                  <Route path="/classroom"                element={<ClassroomPage />} />
                  <Route path="/classroom/:id"            element={<ClassroomPage />} />
                  <Route path="/lectures/:id"             element={<LecturePage />} />
                  <Route path="/lecture-history"          element={<LectureHistory />} />
                  <Route path="/elearning"                element={<ELearningPage />} />
                  <Route path="/quizzes"                  element={<QuizHistory />} />
                  <Route path="/quizzes/:id"              element={<QuizPage />} />
                  <Route path="/quizzes/:id/result"       element={<ResultPage />} />
                  <Route path="/assignments"              element={<AssignmentListPage />} />
                  <Route path="/assignments/:id"          element={<AssignmentPage />} />
                  <Route path="/attendance"               element={<AttendancePage />} />
                  <Route path="/grades"                   element={<GradesPage />} />
                  <Route path="/schedule"                 element={<SchedulePage />} />
                  <Route path="/library"                  element={<DigitalLibrary />} />
                  <Route path="/library/:id"              element={<PDFViewer />} />
                  <Route path="/discussions"              element={<DiscussionPage />} />
                  <Route path="/fees"                     element={<FeePage />} />
                  <Route path="/fees/pay"                 element={<PaymentPage />} />
                  <Route path="/fees/history"             element={<PaymentHistoryPage />} />
                  <Route path="/profile"                  element={<ProfilePage />} />
                  <Route path="/settings"                 element={<Settings />} />
                  <Route path="/feedback"                 element={<FeedbackPage />} />
                  <Route path="/bookmarks"                element={<BookmarkPage />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ToastProvider>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
