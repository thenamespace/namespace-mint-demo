import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'

export const EnsThorin = ({children}: PropsWithChildren) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      {children}
    </ThemeProvider>
  )
}