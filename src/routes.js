import KlantenPage from './components/KlantenPage'
import AangiftenPage from './components/AangiftenPage'
import ServiceberichtenPage from './components/ServiceberichtenPage'

export default [
  { path: '/', component: KlantenPage },
  { path: '/klanten', component: KlantenPage },
  { path: '/aangiften', component: AangiftenPage },
  { path: '/serviceberichten', component: ServiceberichtenPage },
]