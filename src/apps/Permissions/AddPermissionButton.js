import React from 'react'
import { Button, ButtonIcon, IconPlus, Viewport } from '@aragon/ui'

export default props => (
  <Viewport>
    {({ below }) =>
      below('medium') ? (
        <ButtonIcon {...props}>
          <IconPlus />
        </ButtonIcon>
      ) : (
        <Button mode="strong" {...props}>
          Add permission
        </Button>
      )
    }
  </Viewport>
)
