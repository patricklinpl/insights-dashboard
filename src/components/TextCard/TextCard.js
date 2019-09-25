import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'

import { Error, Spinner } from '../../components'

const TextCard = (IconComponent, ContentComponent) => props => {
  const { classes = {}, error, loading = true, ...rest } = props

  return (
    <Card className={classes.card}>
      { error ? (
        <Error />
      ) : loading ? (
        <Spinner />
      ) : (
        <ContentComponent
          Icon={IconComponent}
          classes={classes}
          {...rest}
        />
      )}
    </Card>
  )
}

TextCard.defaultProp = {
  classes: {},
  error: null,
  loading: true
}

TextCard.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.any,
  loading: PropTypes.bool
}

export default TextCard
