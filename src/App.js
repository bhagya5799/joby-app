import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import AllJobs from './components/AllJobes'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route path="/Not-Found" component={NotFound} />
    <Redirect to="Not-Found" />
  </Switch>
)

export default App
