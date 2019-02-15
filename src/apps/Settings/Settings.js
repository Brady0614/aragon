import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  AppView,
  Button,
  DropDown,
  Field,
  TextInput,
  Viewport,
  font,
} from '@aragon/ui'
import MenuButton from '../../components/MenuPanel/MenuButton'
import { defaultEthNode, ipfsDefaultConf } from '../../environment'
import {
  getSelectedCurrency,
  setDefaultEthNode,
  setIpfsGateway,
  setSelectedCurrency,
} from '../../local-settings'
import { AppType, DaoAddressType, EthereumAddressType } from '../../prop-types'
import DaoSettings from './DaoSettings'
import Option from './Option'
import Note from './Note'

// Only USD for now
const AVAILABLE_CURRENCIES = ['USD']

// If the currency isn’t available, get the first available instead.
const filterCurrency = currency => {
  currency = currency.toUpperCase()
  return AVAILABLE_CURRENCIES.indexOf(currency) > -1
    ? currency
    : AVAILABLE_CURRENCIES[0]
}

class Settings extends React.Component {
  static propTypes = {
    account: EthereumAddressType,
    apps: PropTypes.arrayOf(AppType).isRequired,
    daoAddress: DaoAddressType.isRequired,
    onMessage: PropTypes.func.isRequired,
    onOpenApp: PropTypes.func.isRequired,
    walletNetwork: PropTypes.string.isRequired,
    walletWeb3: PropTypes.object.isRequired,
  }
  static defaultProps = {
    account: '',
  }
  state = {
    defaultEthNode,
    ipfsGateway: ipfsDefaultConf.gateway,
    currencies: AVAILABLE_CURRENCIES,
    selectedCurrency: filterCurrency(getSelectedCurrency()),
  }
  handleSelectedCurrencyChange = (index, currencies) => {
    setSelectedCurrency(currencies[index])
    this.setState({ selectedCurrency: currencies[index] })
  }
  handleDefaultEthNodeChange = event => {
    this.setState({ defaultEthNode: event.target.value })
  }
  handleIpfsGatewayChange = event => {
    this.setState({ ipfsGateway: event.target.value })
  }
  handleNodeSettingsSave = () => {
    const { defaultEthNode, ipfsGateway } = this.state
    setDefaultEthNode(defaultEthNode)
    setIpfsGateway(ipfsGateway)
    // For now, we have to reload the page to propagate the changes
    window.location.reload()
  }
  handleRefreshCache = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  handleMenuPanelOpen = () => {
    this.props.onMessage({
      data: { from: 'app', name: 'menuPanel', value: true },
    })
  }

  render() {
    const {
      account,
      apps,
      daoAddress,
      onOpenApp,
      walletNetwork,
      walletWeb3,
    } = this.props
    const {
      defaultEthNode,
      ipfsGateway,
      currencies,
      selectedCurrency,
    } = this.state
    return (
      <AppView
        appBar={
          <AppBar
            title={
              <React.Fragment>
                <Viewport>
                  {({ below }) =>
                    below('medium') && (
                      <StyledMenuButton onClick={this.handleMenuPanelOpen} />
                    )
                  }
                </Viewport>
                <Title>Settings</Title>
              </React.Fragment>
            }
          />
        }
      >
        <Content>
          <DaoSettings
            apps={apps}
            account={account}
            daoAddress={daoAddress}
            onOpenApp={onOpenApp}
            walletNetwork={walletNetwork}
            walletWeb3={walletWeb3}
          />
          {currencies.length > 1 && selectedCurrency && (
            <Option
              name="Currency"
              text={`
                This will be the default currency for displaying purposes.
                It will be converted to ETH under the hood.
              `}
            >
              <Field label="Select currency">
                <DropDown
                  active={currencies.indexOf(selectedCurrency)}
                  items={currencies}
                  onChange={this.handleSelectedCurrencyChange}
                />
              </Field>
            </Option>
          )}
          <Option
            name="Node settings (advanced)"
            text={`
              Change which Ethereum and IPFS clients this app is connected to
            `}
          >
            <Field label="Ethereum node">
              <TextInput
                onChange={this.handleDefaultEthNodeChange}
                wide
                value={defaultEthNode}
              />
            </Field>
            <Field label="IPFS gateway">
              <TextInput
                onChange={this.handleIpfsGatewayChange}
                wide
                value={ipfsGateway}
              />
            </Field>
            <Button mode="secondary" onClick={this.handleNodeSettingsSave}>
              Save settings
            </Button>
          </Option>
          <Option
            name="Troubleshooting"
            text={`
              Press this button to refresh the cache of the application in your
              browser.
            `}
          >
            <div>
              <Button mode="secondary" onClick={this.handleRefreshCache}>
                Clear application cache
              </Button>
            </div>
            <Note>
              This will only delete the data stored in your browser to make the
              app load faster. No data related to the organization itself will
              be altered.
            </Note>
          </Option>
        </Content>
      </AppView>
    )
  }
}

const Content = styled.div`
  max-width: 600px;
`

const StyledMenuButton = styled(MenuButton)`
  margin-right: 16px;
`

const Title = styled.span`
  ${font({ size: 'xxlarge' })};
`

export default Settings
