import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { RouteWithLayout } from './components'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts'
import {
  Dashboard as DashboardView,
  Course as CourseView,
  Tools as ToolView,
  NotFound as NotFoundView,
  Usage as UsageView
} from './views'

function Routes () {
  return (
    <Switch>
      <Redirect
        exact
        from='/'
        to='/dashboard'
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path='/dashboard'
      />
      <RouteWithLayout
        component={CourseView}
        exact
        layout={MainLayout}
        path='/course'
      />
      <RouteWithLayout
        component={ToolView}
        exact
        layout={MainLayout}
        path='/tools'
      />
      <RouteWithLayout
        component={UsageView}
        exact
        layout={MainLayout}
        path='/usage'
      />
      <RouteWithLayout
        component={CourseView}
        exact
        layout={MainLayout}
        path='/course'
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path='/not-found'
      />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default Routes
