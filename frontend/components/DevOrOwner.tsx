import React from 'react'
import { Row } from 'web3uikit'

const DevOrOwner = ({ children }) => {
  return (
    <Row alignItems="center" justifyItems="center" lg={24} md={24} sm={16} xs={8}>
      {children}
    </Row>
  )
}

export default DevOrOwner
