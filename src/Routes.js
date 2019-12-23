import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { RouteWithLayout } from './components'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts'
import {
  Dashboard as DashboardView,
  Course as CourseView,
  NotFound as NotFoundView,
  Results as ResultsView,
  Search as SearchView,
  Tools as ToolView,
  Usage as UsageView
} from './views'

function Routes () {
  return (
    <Switch>
      <Redirect
        exact
        from='/'
        to='/overview'
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path='/overview'
      />
      <RouteWithLayout
        component={SearchView}
        exact
        layout={MainLayout}
        path='/search'
      />
      <RouteWithLayout
        component={ResultsView}
        layout={MainLayout}
        path='/results'
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
