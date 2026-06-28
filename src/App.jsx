import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import SidebarProvider from './contexts/SidebarProvider'
import ThemeProvider from './contexts/ThemeProvider'
import { ToastProvider } from './components/NotificationContext'
import MainLayout from './layouts/MainLayout'
import Loading from './components/Loading'
import './index.css'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ForgetPasswordPage = lazy(() => import('./pages/ForgetPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const EmailVerificationPage = lazy(() => import('./pages/EmailVerificationPage'))
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsofServicePage = lazy(() => import('./pages/TermsofServicePage'))
const SupportPage = lazy(() => import('./pages/SupportPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const CourseListPage = lazy(() => import('./pages/CourseListPage'))
const CoursePage = lazy(() => import('./pages/CoursePage'))
const EnrolledCoursePage = lazy(() => import('./pages/EnrolledCoursePage'))
const ClassroomPage = lazy(() => import('./pages/ClassroomPage'))
const LecturePage = lazy(() => import('./pages/LecturePage'))
const LectureHistory = lazy(() => import('./pages/LectureHistory'))
const ELearningPage = lazy(() => import('./pages/ELearningPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const QuizHistory = lazy(() => import('./pages/QuizHistory'))
const ResultPage = lazy(() => import('./pages/ResultPage'))
const AssignmentListPage = lazy(() => import('./pages/AssignmentListPage'))
const AssignmentPage = lazy(() => import('./pages/AssignmentPage'))
const AttendancePage = lazy(() => import('./pages/AttendancePage'))
const GradesPage = lazy(() => import('./pages/GradesPage'))
const SchedulePage = lazy(() => import('./pages/SchedulePage'))
const DigitalLibrary = lazy(() => import('./pages/DigitalLibrary'))
const DiscussionPage = lazy(() => import('./pages/DiscussionPage'))
const FeePage = lazy(() => import('./pages/FeePage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const PaymentHistoryPage = lazy(() => import('./pages/PaymentHistoryPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const Settings = lazy(() => import('./pages/Settings'))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'))
const BookmarkPage = lazy(() => import('./pages/BookmarkPage'))
const PDFViewer = lazy(() => import('./pages/PDFViewer'))

function LazyLoad({ children }) {
  return <Suspense fallback={<Loading fullscreen />}>{children}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <ToastProvider>
              <Routes>
                <Route path="/" element={<LazyLoad><LandingPage /></LazyLoad>} />
                <Route path="/login" element={<LazyLoad><LoginPage /></LazyLoad>} />
                <Route path="/register" element={<LazyLoad><RegisterPage /></LazyLoad>} />
                <Route path="/forgot-password" element={<LazyLoad><ForgetPasswordPage /></LazyLoad>} />
                <Route path="/reset-password" element={<LazyLoad><ResetPasswordPage /></LazyLoad>} />
                <Route path="/verify-email" element={<LazyLoad><EmailVerificationPage /></LazyLoad>} />
                <Route path="/onboarding" element={<LazyLoad><OnboardingPage /></LazyLoad>} />
                <Route path="/about" element={<LazyLoad><AboutPage /></LazyLoad>} />
                <Route path="/privacy" element={<LazyLoad><PrivacyPolicyPage /></LazyLoad>} />
                <Route path="/terms" element={<LazyLoad><TermsofServicePage /></LazyLoad>} />
                <Route path="/support" element={<LazyLoad><SupportPage /></LazyLoad>} />
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<LazyLoad><Dashboard /></LazyLoad>} />
                  <Route path="/courses" element={<LazyLoad><CourseListPage /></LazyLoad>} />
                  <Route path="/courses/:id" element={<LazyLoad><CoursePage /></LazyLoad>} />
                  <Route path="/my-courses" element={<LazyLoad><EnrolledCoursePage /></LazyLoad>} />
                  <Route path="/classroom" element={<LazyLoad><ClassroomPage /></LazyLoad>} />
                  <Route path="/classroom/:id" element={<LazyLoad><ClassroomPage /></LazyLoad>} />
                  <Route path="/lectures/:id" element={<LazyLoad><LecturePage /></LazyLoad>} />
                  <Route path="/lecture-history" element={<LazyLoad><LectureHistory /></LazyLoad>} />
                  <Route path="/elearning" element={<LazyLoad><ELearningPage /></LazyLoad>} />
                  <Route path="/quizzes" element={<LazyLoad><QuizHistory /></LazyLoad>} />
                  <Route path="/quizzes/:id" element={<LazyLoad><QuizPage /></LazyLoad>} />
                  <Route path="/quizzes/:id/result" element={<LazyLoad><ResultPage /></LazyLoad>} />
                  <Route path="/assignments" element={<LazyLoad><AssignmentListPage /></LazyLoad>} />
                  <Route path="/assignments/:id" element={<LazyLoad><AssignmentPage /></LazyLoad>} />
                  <Route path="/attendance" element={<LazyLoad><AttendancePage /></LazyLoad>} />
                  <Route path="/grades" element={<LazyLoad><GradesPage /></LazyLoad>} />
                  <Route path="/schedule" element={<LazyLoad><SchedulePage /></LazyLoad>} />
                  <Route path="/library" element={<LazyLoad><DigitalLibrary /></LazyLoad>} />
                  <Route path="/library/:id" element={<LazyLoad><PDFViewer /></LazyLoad>} />
                  <Route path="/discussions" element={<LazyLoad><DiscussionPage /></LazyLoad>} />
                  <Route path="/fees" element={<LazyLoad><FeePage /></LazyLoad>} />
                  <Route path="/fees/pay" element={<LazyLoad><PaymentPage /></LazyLoad>} />
                  <Route path="/fees/history" element={<LazyLoad><PaymentHistoryPage /></LazyLoad>} />
                  <Route path="/profile" element={<LazyLoad><ProfilePage /></LazyLoad>} />
                  <Route path="/settings" element={<LazyLoad><Settings /></LazyLoad>} />
                  <Route path="/feedback" element={<LazyLoad><FeedbackPage /></LazyLoad>} />
                  <Route path="/bookmarks" element={<LazyLoad><BookmarkPage /></LazyLoad>} />
                </Route>
                <Route path="*" element={<LazyLoad><NotFoundPage /></LazyLoad>} />
              </Routes>
            </ToastProvider>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}