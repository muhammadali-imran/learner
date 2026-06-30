import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcRoot = path.join(__dirname, '..', 'src')

const layoutComponents = new Set([
  'Sidebar', 'TopBar', 'NavBar', 'Footer', 'Breadcrumbs', 'PageHeader', 'ProtectedRoute', 'ErrorBoundary',
])

const sharedHooks = new Set([
  'useApi', 'useMutation', 'useDebounce', 'usePagination', 'useInfiniteScroll', 'useLocalStorage',
  'useMediaQuery', 'useFormSubmit', 'useTimer', 'useOnlineStatus', 'useNotification', 'useTheme', 'useSidebar',
])

const featureHooks = {
  useAuth: '@features/auth/hooks/useAuth',
  useCourse: '@features/course/hooks/useCourse',
  useCourseProgress: '@features/course/hooks/useCourseProgress',
  useEnrollment: '@features/course/hooks/useEnrollment',
  useLectures: '@features/course/hooks/useLectures',
  useQuiz: '@features/quiz/hooks/useQuiz',
  useQuizAttempts: '@features/quiz/hooks/useQuizAttempts',
  useAttendance: '@features/classroom/hooks/useAttendance',
  useProfile: '@features/profile/hooks/useProfile',
  useFileUpload: '@features/assignment/hooks/useFileUpload',
  useAssignments: '@features/assignment/hooks/useAssignments',
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.(jsx?)$/.test(entry.name)) files.push(full)
  }
  return files
}

function fixContent(content, filePath) {
  let next = content

  // Broken self-reference
  next = next.replace(
    /from ['"]\.\.\/features\/assignment\/hooks\/useAssignments['"]/g,
    "from '@features/assignment/hooks/useAssignments'",
  )

  // Toast -> NotificationContext
  next = next.replace(
    /import \{ useToast \} from ['"][^'"]*components\/Toast['"]/g,
    "import { useToast } from '@shared/contexts/NotificationContext'",
  )

  // useAuth from wrong paths in shared
  next = next.replace(
    /import useAuth from ['"]\.\.\/hooks\/useAuth['"]/g,
    "import useAuth from '@features/auth/hooks/useAuth'",
  )

  // AuthContext in useAuth hook
  next = next.replace(
    /import AuthContext from ['"]\.\.\/contexts\/AuthContext['"]/g,
    "import AuthContext from '@shared/contexts/AuthContext'",
  )

  // api axios in hooks
  next = next.replace(
    /import api from ['"]\.\.\/api\/axios['"]/g,
    "import api from '@shared/api/axios'",
  )

  // Shared hooks - relative paths
  for (const hook of sharedHooks) {
    const re = new RegExp(`from ['"][./]+hooks/${hook}['"]`, 'g')
    next = next.replace(re, `from '@shared/hooks/${hook}'`)
    const re2 = new RegExp(`from ['"]\\./${hook}['"]`, 'g')
    next = next.replace(re2, `from '@shared/hooks/${hook}'`)
  }

  // Feature hooks
  for (const [hook, alias] of Object.entries(featureHooks)) {
    const re = new RegExp(`from ['"][./]+hooks/${hook}['"]`, 'g')
    next = next.replace(re, `from '${alias}'`)
    const re2 = new RegExp(`import \\{ ${hook} \\} from ['"][./]+hooks/${hook}['"]`, 'g')
    next = next.replace(re2, `import { ${hook} } from '${alias}'`)
  }

  // Layouts
  next = next.replace(
    /from ['"][./]+layouts\/(MainLayout|AuthLayout)['"]/g,
    "from '@shared/layouts/$1'",
  )

  // Components - layout vs ui
  next = next.replace(/from ['"][./]+components\/(\w+)['"]/g, (match, name) => {
    if (layoutComponents.has(name)) {
      return `from '@shared/components/layout/${name}'`
    }
    return `from '@shared/components/ui/${name}'`
  })

  // Landing page feature components
  if (filePath.includes(`${path.sep}features${path.sep}landing${path.sep}pages${path.sep}`)) {
    for (const comp of ['HeroSection', 'SocialProof', 'FeaturesGrid', 'BenefitSimulator', 'Testimonials', 'CTASection', 'Logo', 'logo']) {
      const re = new RegExp(`from '@shared/components/ui/${comp}'`, 'g')
      next = next.replace(re, `from '@features/landing/components/${comp === 'Logo' ? 'logo' : comp}'`)
    }
  }

  const featureComponentRewrites = [
    ['features/quiz/pages', "@shared/components/ui/QuizQuestion", "@features/quiz/components/QuizQuestion"],
    ['features/quiz/pages', "@shared/components/ui/CountDownTimer", "@features/quiz/components/CountDownTimer"],
    ['features/course/pages', "@shared/components/ui/VideoPlayer", "@features/course/components/VideoPlayer"],
    ['features/assignment/pages', "@shared/components/ui/FileUpload", "@features/assignment/components/FileUpload"],
    ['features/schedule/pages', "@shared/components/ui/Calendar", "@features/schedule/components/Calendar"],
    ['features/profile/pages', "@shared/components/ui/Avatar", "@features/profile/components/Avatar"],
  ]
  for (const [segment, from, to] of featureComponentRewrites) {
    if (filePath.includes(`${path.sep}${segment.replace(/\//g, path.sep)}${path.sep}`)) {
      next = next.replaceAll(`from '${from}'`, `from '${to}'`)
    }
  }

  // Quiz CountDownTimer uses useTimer
  if (filePath.includes('CountDownTimer')) {
    next = next.replace(/from ['"][./]+hooks\/useTimer['"]/g, "from '@shared/hooks/useTimer'")
  }

  // Context hooks in shared
  next = next.replace(
    /import ThemeContext from ['"]\.\.\/contexts\/ThemeContext['"]/g,
    "import ThemeContext from '@shared/contexts/ThemeContext'",
  )
  next = next.replace(
    /import SidebarContext from ['"]\.\.\/contexts\/SidebarContext['"]/g,
    "import SidebarContext from '@shared/contexts/SidebarContext'",
  )

  // MainLayout internal imports
  next = next.replace(
    /import Sidebar from ['"]\.\.\/components\/Sidebar['"]/g,
    "import Sidebar from '@shared/components/layout/Sidebar'",
  )
  next = next.replace(
    /import TopBar from ['"]\.\.\/components\/TopBar['"]/g,
    "import TopBar from '@shared/components/layout/TopBar'",
  )
  next = next.replace(
    /import Footer from ['"]\.\.\/components\/Footer['"]/g,
    "import Footer from '@shared/components/layout/Footer'",
  )
  next = next.replace(
    /import useSidebar from ['"]\.\.\/hooks\/useSidebar['"]/g,
    "import useSidebar from '@shared/hooks/useSidebar'",
  )

  return next
}

const files = walk(srcRoot)
let changed = 0
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8')
  const updated = fixContent(original, file)
  if (updated !== original) {
    fs.writeFileSync(file, updated)
    changed++
  }
}
console.log(`Updated ${changed} files`)
