import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Badge, Viewport, breakpoint } from '@aragon/ui'
import { AppType, EthereumAddressType } from '../../prop-types'
import { shortenAddress } from '../../web3-utils'
import AppIcon from './AppIcon'

class AppInstanceLabel extends React.PureComponent {
  static propTypes = {
    app: AppType.isRequired,
    proxyAddress: EthereumAddressType.isRequired,
    showIcon: PropTypes.bool,
  }

  render() {
    const { app, proxyAddress, showIcon = true } = this.props
    return (
      <Main>
        <Viewport>
          {({ above }) =>
            above('medium') && showIcon && <AppIconInRow app={app} />
          }
        </Viewport>
        <AppName>{app ? app.name : 'Unknown'}</AppName>
        <StyledBadge title={proxyAddress}>
          {(app && app.identifier) || shortenAddress(proxyAddress)}
        </StyledBadge>
      </Main>
    )
  }
}

const Main = styled.div`
  margin: auto;

  ${breakpoint(
    'medium',
    `
      display: flex;
      align-items: center;
      text-align: left;
      margin: unset;
    `
  )}
`

const AppIconInRow = styled(AppIcon)`
  height: 0;
  margin-right: 10px;
  margin-top: -1px;
`

const StyledBadge = styled(Badge.App)`
  display: inline-block;

  ${breakpoint(
    'medium',
    `
      display: inline;
    `
  )}
`

const AppName = styled.span`
  display: block;

  ${breakpoint(
    'medium',
    `
      display: inline;
      margin-right: 10px;
    `
  )}
`

export default AppInstanceLabel
