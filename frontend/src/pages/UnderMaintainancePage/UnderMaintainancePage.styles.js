import styled, { keyframes } from "styled-components";

export const flipDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const Card = styled.section`
  width: min(100%, 820px);
  padding: 1.5rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 2.5rem 2.5rem;
  }
`;

export const Illustration = styled.img`
  width: min(100%, 680px);
  max-height: 200px;
  object-fit: contain;
  margin: 0 auto 1.5rem;
  display: block;

  @media (min-width: 768px) {
    max-height: 280px;
    margin: 0 auto 1.75rem;
  }

  @media (min-width: 1024px) {
    max-height: 380px;
    margin: 0 auto 2rem;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-family: Inter;
  font-weight: 600;
  font-style: normal;
  font-size: clamp(24px, 3vw, 32px);
  leading-trim: none;
  line-height: 125%;
  letter-spacing: -1%;
  text-align: center;
  vertical-align: middle;
  color: ${({ theme }) => theme.link_sky_blue};
`;

export const Description = styled.p`
  margin: 0.75rem auto 1.5rem;
  max-width: 620px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.grey_text};

  @media (min-width: 768px) {
    margin: 1rem auto 2rem;
    font-size: 1rem;
    line-height: 1.7;
  }

  @media (min-width: 1024px) {
    margin: 1rem auto 2.5rem;
    font-size: 20px;
    line-height: 1.75;
  }
`;

export const TimerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, clamp(91px, 14vw, 440.8px));
  gap: clamp(2px, 4vw, 56px);
  justify-items: center;
  margin-top: 1rem;

  @media (min-width: 1024px) {
    display: flex;
    gap: 56px;
    width: 440.8px;
    height: 117px;
    top: 144px;
    left: 72.6px;
  }
`;

export const TimerCard = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 0.8rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    min-height: 100px;
    padding: 1rem 0.8rem;
  }

  @media (min-width: 1024px) {
    width: 440.8px;
    height: 117px;
    min-height: auto;
    padding: 1.4rem 1rem;
  }
`;

export const TimerValue = styled.span`
  display: block;
  font-family: Roboto;
  font-weight: 700;
  font-style: normal;
  font-size: clamp(32px, 4vw, 64px);
  leading-trim: none;
  line-height: 100%;
  letter-spacing: 0%;
  color: ${({ theme }) => theme.link_sky_blue};
`;

export const TimerDigit = styled.span`
  display: inline-block;
  overflow: hidden;
  height: 1em;
  animation: ${flipDown} 0.4s ease-out;
`;

export const TimerLabel = styled.span`
  margin-top: 0.55rem;
  font-family: Roboto;
  font-weight: 400;
  font-style: normal;
  font-size: clamp(12px, 1vw, 14px);
  leading-trim: none;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.secondary};
`;
