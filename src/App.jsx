// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/App.jsx

import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx' // 💡 NEW: Import Auth component
import Journel from './pages/Journel.jsx'
import Exercises from './pages/Exercises.jsx'
import NewEntryPage from './components/ui/newentryPage.jsx'
import TimelinePage from './components/ui/timeLinePage.jsx'
import Soundscapes from './pages/Soundscapes.jsx'
import CrisesSupport from './pages/CrisesSupport.jsx'
import CrisesContent from './components/ui/CrisesContent.jsx'
import ImmediateHelp from './components/ui/ImmediateHelp.jsx'
import WarningSigns from './components/ui/WarningSigns.jsx'
import SafetyPlan from './components/ui/SafetyPlan.jsx'
import CommunitySupport from './pages/CommunitySupport.jsx'
import CommunityFeedPlaceholder from './components/ui/CommunityFeedPlaceholder.jsx'
import SupportGroupsPlaceholder from './components/ui/SupportGroupsPlaceholder.jsx'
import WeeklyTopicsPlaceholder from './components/ui/WeeklyTopicsPlaceholder.jsx'
import GuidelinesContent from './components/ui/GuidelinesContent.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import PreferencesContent from './components/ui/PreferencesContent.jsx'
import AboutContent from './components/ui/AboutContent.jsx'
import FindTherapist from './pages/FindTherapist.jsx'
import FindTherapistContent from './components/ui/FindTherapistContent.jsx' 
import TherapyTypesContent from './components/ui/TherapyTypesContent.jsx' 
import InsuranceCostsContent from './components/ui/InsuranceCostsContent.jsx' 
import AIChat from './pages/AIChat.jsx' 
import ProtectedRoute from './components/ui/ProtectedRoute.jsx' 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext' // 💡 NEW: Import AuthProvider

const router = createBrowserRouter([
  // Public Auth Routes
  { path: '/login', element: <Auth key="login"/> },
  { path: '/signup', element: <Auth key="signup"/> },
  
  // WRAP PROTECTED ROUTES
  {
    path: '/',
    element: <ProtectedRoute><Home/></ProtectedRoute>
  },
  {
    path: '/ai-chat',
    element: <ProtectedRoute><AIChat/></ProtectedRoute>
  },
  {
    path: '/journel',
    element: <ProtectedRoute><Journel/></ProtectedRoute>,
    children: [
      {
        path:'new-entry',
        element:<NewEntryPage/>
      },
      {
        index:true,
        element:<TimelinePage/>
      }
    ]
  },
  {
    path:'/exercises',
    element:<ProtectedRoute><Exercises/></ProtectedRoute>
  },
  {
    path:'/soundscapes',
    element:<ProtectedRoute><Soundscapes/></ProtectedRoute>
  },
  // Crises Support remains PUBLIC
  {
    path:'/crises-support',
    element:<CrisesSupport/>,
    children:[
      {
        index:true,
        element:<CrisesContent/>
      },
      {
        path:'immediate-help',
        element:<ImmediateHelp/>
      },
      {
        path:'warning-signs',
        element:<WarningSigns/>
      },
      {
        path:'safety-plan',
        element:<SafetyPlan/>
      }
    ]
  },
  {
    path: '/community-support',
    element: <ProtectedRoute><CommunitySupport /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <CommunityFeedPlaceholder />
      },
      {
        path: 'support-groups',
        element: <SupportGroupsPlaceholder /> 
      },
      {
        path: 'weekly-topics',
        element: <WeeklyTopicsPlaceholder />
      },
      {
        path: 'guidelines',
        element: <GuidelinesContent />
      },
    ]
  },
  {
    path: '/profile-settings',
    element: <ProtectedRoute><ProfileSettings /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <PreferencesContent />
      },
      {
        path: 'notifications',
        element: <h2 className='text-xl font-semibold'>Notifications Content Coming Soon!</h2>
      },
      {
        path: 'privacy',
        element: <h2 className='text-xl font-semibold'>Privacy Content Coming Soon!</h2>
      },
      {
        path: 'about',
        element: <AboutContent />
      }
    ]
  },
  {
    path: '/find-therapist',
    element: <ProtectedRoute><FindTherapist /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <FindTherapistContent /> 
      },
      {
        path: 'types-of-therapy',
        element: <TherapyTypesContent />
      },
      {
        path: 'insurance-costs',
        element: <InsuranceCostsContent />
      }
    ]
  }
])
function App() {

  return (
    <>
      {/* 💡 FIX: AuthProvider must wrap RouterProvider to ensure useNavigate is in context */}
      <AuthProvider> 
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App