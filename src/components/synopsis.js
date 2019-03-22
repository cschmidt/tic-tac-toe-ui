import React from 'react'
import PropTypes from 'prop-types'


const Synopsis = ({ synopsis }) => {
  return (<div className='ticTacToeSynopsis'>{synopsis}</div>)
}

Synopsis.propTypes = {
  synopsis: PropTypes.string
}

export default Synopsis
