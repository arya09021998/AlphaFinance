import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, CardBody, Heading, Skeleton } from 'penguinfinance-uikit2'
import { useTotalSupply } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { Pool } from 'state/types'

const StyledTotalValueLockedCard = styled(Card)`
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.8);
  align-items: center;
  display: flex;
  flex: 1;
  background: #d4444c;
  background: ${({ theme }) => theme.colors[theme.isDark ? 'darkCard' : 'lightCard']};
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: ${({ theme }) => theme.colors[theme.isDark ? 'white' : 'black']};
`

const Title = styled(Heading)`
  color: ${({ theme }) => theme.colors[theme.isDark ? 'white' : 'black']};
`
interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PercentagePefiStakedNests: React.FC<HarvestProps> = ({ pool }) => {
  const totalSupply = useTotalSupply()

  const { totalStaked } = pool

  const TranslateString = useI18n()
  if (totalStaked) {
    const percentageStaked = (getBalanceNumber(totalStaked) / getBalanceNumber(totalSupply)) * 100
    return (
      <StyledTotalValueLockedCard>
        <CardBody>
          <Title size="md">{TranslateString(762, 'A total of')}</Title>
          <CardMidContent>
            {parseInt(percentageStaked.toString()) ? (
              `${parseInt(percentageStaked.toString())}% ${TranslateString(736, 'of PEFI')}`
            ) : (
              <Skeleton animation="pulse" variant="rect" height="44px" />
            )}
          </CardMidContent>
          <Title size="md">{TranslateString(764, 'Staked in Penguin Nests')}</Title>
        </CardBody>
      </StyledTotalValueLockedCard>
    )
  }
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Title size="md">{TranslateString(762, 'Stake your PEFI now!')}</Title>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default PercentagePefiStakedNests
