import PropTypes from 'prop-types'
import {
  APPS_STATUS_ERROR,
  APPS_STATUS_READY,
  APPS_STATUS_LOADING,
} from './symbols'
import { isAddress } from './web3-utils'

const validatorCreator = nonRequiredFunction => {
  const validator = nonRequiredFunction

  validator.isRequired = (props, propName, componentName) => {
    const value = props[propName]

    if (value === null || value === undefined || value === '') {
      return new Error(
        `Property ${propName} is required on ${componentName}, but ${value} was given.`
      )
    }

    return nonRequiredFunction(props, propName, componentName)
  }

  return validator
}

const ethereumAddressValidator = (props, propName, componentName) => {
  const value = props[propName]

  if (value === null || value === undefined || value === '') {
    return null
  }

  if (!isAddress(value)) {
    const valueType = typeof value
    let nonAddress = null

    if (valueType !== 'object') {
      nonAddress = value.toString()
    }

    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. The provided value is not a valid ethereum address.${nonAddress &&
        ` You provided "${nonAddress}"`}`
    )
  }
}

export const EthereumAddressType = validatorCreator(ethereumAddressValidator)

export const AppType = PropTypes.shape({
  abi: PropTypes.array.isRequired,
  appId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  codeAddress: EthereumAddressType,
  functions: PropTypes.array.isRequired,
  hasWebApp: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  proxyAddress: EthereumAddressType,
  src: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  appName: PropTypes.string,
  apmRegistry: PropTypes.string,
  content: PropTypes.shape({
    location: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    })
  ),
  isForwarder: PropTypes.bool,
  kernelAddress: EthereumAddressType,
  isAragonOsInternalApp: PropTypes.bool,
  roles: PropTypes.array,
  status: PropTypes.string,
  version: PropTypes.string,
})

export const AppsStatusType = PropTypes.oneOf([
  APPS_STATUS_ERROR,
  APPS_STATUS_READY,
  APPS_STATUS_LOADING,
])

export const FavoriteDaoType = PropTypes.shape({
  name: PropTypes.string,
  address: EthereumAddressType,
  favorited: PropTypes.bool,
})

export const DaoItemType = PropTypes.shape({
  name: PropTypes.string,
  address: EthereumAddressType,
})

export const DaoAddressType = PropTypes.shape({
  address: EthereumAddressType,
  domain: PropTypes.string,
})
