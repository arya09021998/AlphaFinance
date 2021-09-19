import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex } from 'penguinfinance-uikit2'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.8);
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: #363266;
  background: ${({ theme }) => theme.colors[theme.isDark ? 'darkCard' : 'lightCard']};

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: ${({ theme }) => theme.colors[theme.isDark ? 'white' : 'black']};
`

const Text = styled(Heading)`
  color: ${({ theme }) => theme.colors[theme.isDark ? 'white' : 'black']};
`

const BurnedPefiCard = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const percentage = (100 * getBalanceNumber(burnedBalance)) / getBalanceNumber(totalSupply) || 0

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Text size="md">{TranslateString(534, 'A total of')}</Text>
        <CardMidContent>{percentage.toFixed(2)}% of PEFI</CardMidContent>
        <Flex justifyContent="space-between">
          <Text size="md">{TranslateString(534, 'has been burned forever!')}</Text>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default BurnedPefiCard
