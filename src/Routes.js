import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { RouteWithLayout } from './components'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts'

import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  Rest as RestView,
  Graph as GraphView,
  Course as CourseView
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
        component={RestView}
        exact
        layout={MainLayout}
        path='/rest'
      />
      <RouteWithLayout
        component={GraphView}
        exact
        layout={MainLayout}
        path='/graph'
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
