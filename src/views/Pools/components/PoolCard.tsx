import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useHistory } from 'react-router-dom'
import { Button, Text, Flex, Heading, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import { useERC20, useXPefi } from 'hooks/useContract'
// import { useV2NestContract } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import { useNestApr, useNestApy } from 'state/hooks'
import { Pool } from 'state/types'
import Card from './Card'

const StyledCard = styled(Card)<{ isNestPage?: boolean; isMobile?: boolean }>`
  min-width: ${({ isMobile }) => (isMobile ? '100%' : '350px')};
  border-radius: 32px;
  @media (min-width: 640px) {
    transform: ${(props) => props.isNestPage && 'scale(1.3)'};
    margin-top: ${(props) => props.isNestPage && '60px'};
    margin-bottom: ${(props) => props.isNestPage && '60px'};
  }
`
// YEP
const StyledHeading = styled(Heading)`
  font-weight: 800;
`

const CardContent = styled.div`
  padding: 24px;

  border-radius: 32px;
`

const Block = styled.div`
  width: 50%;
`

const CardImage = styled.img`
  margin-right: 20px;
  width: 64px;
  height: 64px;
`

interface Props {
  pool: Pool
  isMainPool: boolean
  isNestPage?: boolean
  isHomePage?: boolean
}

const PoolCard: React.FC<Props> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    penguinNestsGuideLink,
    tokenDecimals,
    poolCategory,
    totalStaked,
    totalSupply,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool

  const [handsOnPenalty, setHandsOnPenalty] = useState(6)
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const xPefiContract = useXPefi()
  const history = useHistory()
  // const { sousId, tokenName, isFinished, userData } = pool
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isCardActive = isFinished && accountHasStakedBalance

  const displayedNestApr = (useNestApr() * 100).toFixed(2)
  const displayedNestApy = (useNestApy() * 100).toFixed(2)
  // const displayedNestApy = (pool.apr.toNumber() * 100).toFixed(2)

  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const fetchHandsOnPenalty = useCallback(async () => {
    const perHandsPenalty = await xPefiContract.methods.paperHandsPenalty().call()
    setHandsOnPenalty(perHandsPenalty)
  }, [xPefiContract])

  useEffect(() => {
    // fetchHandsOnPenalty()
  }, [fetchHandsOnPenalty])

  const getXPefiToPefiRatio = () => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toNumber()
      : 1
  }

  const xPefiToPefiRatio = getXPefiToPefiRatio()

  const handleMovetoNestV2 = () => {
    history.push('/nest-v2')
  }

  const handleMigrationGuide = () => {
    const nestMigrationUrl =
      'https://docs.penguinfinance.io/summary/penguin-nests-staking-and-fee-collection/ipefi-migration-guide'
    window.open(nestMigrationUrl, '_blank')
  }

  const handleViewNestsGitbook = () => {
    window.open(
      'https://penguin-finance.gitbook.io/penguin-finance/summary/penguin-nests-staking-and-fee-collection',
      '_blank',
    )
  }

  return (
    <StyledCard isMobile={isMobile} isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <CardContent>
        <Flex justifyContent="space-between" mb="24px" alignItems="center">
          <StyledHeading size="xl" color="primary">
            {`i${tokenName}`} {TranslateString(348, 'Nest')}
          </StyledHeading>
          <InfoIconWrapper onClick={handleViewNestsGitbook}>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/info.svg`} width="25px" height="25px" />
          </InfoIconWrapper>
        </Flex>
        <Flex mt="12px" mb="32px">
          <CardImage src="/images/Awolf.png" alt="iPefi logo" width={64} height={64} />
          <Content>
            <Flex mb="24px">
              <Block>
                <Label>{TranslateString(544, 'iPEFI in Wallet')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${getBalanceNumber(stakedBalance).toFixed(2)}`}
                </Text>
              </Block>
              <Block>
                <Label>{TranslateString(546, `Yesterday's APY: `)}</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${getNumberWithCommas(100/* displayedNestApy */)}%`}
                </Text>
              </Block>
            </Flex>
            <Flex ml={isMobile && '-84px'}>
              <Block>
                <Label>{TranslateString(544, 'Paper Hands Penalty')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${Number(handsOnPenalty).toFixed(2)}% PHP`}
                </Text>
              </Block>
              <Block>
                <Label>{TranslateString(546, 'iPEFI/PEFI Ratio')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${Number(xPefiToPefiRatio.toFixed(2))} PEFI`}
                </Text>
              </Block>
            </Flex>
          </Content>
        </Flex>
        {account ? (
          <Flex justifyContent="space-between">
            <StyledButton onClick={handleMovetoNestV2}>
              Go to the Nest
              <StyledNavLink exact activeClassName="active" to="/nests" id="farm-apy-cta">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width="25px" height="25px" />
              </StyledNavLink>
            </StyledButton>
            <StyledButton onClick={handleMigrationGuide}>Migration Guide</StyledButton>
          </Flex>
        ) : (
          <UnlockButton fullWidth isHomeButton />
        )}
      </CardContent>
    </StyledCard>
  )
}

const Label = styled(Text).attrs({ color: 'red' })`
  line-height: 1;
  font-size: 14px;
`

const Content = styled.div`
  width: 100%;
`

const StyledNavLink = styled(NavLink)`
  margin-left: 16px;
  svg {
    path {
      fill: white;
    }
  }
`

const InfoIconWrapper = styled.div`
  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
    }
  }
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => (theme.isDark ? 'red' : 'white')};
  width: 48%;
  white-space: nowrap;
`

export default PoolCard
