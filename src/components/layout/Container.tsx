import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 992px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 10px;
    padding-right: 10px;
  }
`

export default Container
