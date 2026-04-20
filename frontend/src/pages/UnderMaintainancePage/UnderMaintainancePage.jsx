import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Illustration,
  Title,
  Description,
  TimerGrid,
  TimerCard,
  TimerValue,
  TimerDigit,
  TimerLabel,
} from "./UnderMaintainancePage.styles";

const TimerValueDisplay = ({ value }) => {
  const digits = value.split("");
  return (
    <TimerValue>
      {digits.map((digit, idx) => (
        <TimerDigit key={`${idx}-${digit}`}>{digit}</TimerDigit>
      ))}
    </TimerValue>
  );
};

export default function UnderMaintainancePage({ initialCountdown = 1545 }) {
  const [secondsLeft, setSecondsLeft] = useState(initialCountdown);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <Container>
      <Card>
        <Illustration src="/maintainance.png" alt="Maintenance illustration" />
        <Title>We'll Be Back Soon</Title>
        <Description>
          Our website is currently undergoing scheduled maintenance. We're
          improving your experience and will return shortly.
        </Description>

        <TimerGrid>
          <TimerCard>
            <TimerValueDisplay value={hours} />
            <TimerLabel>Hours</TimerLabel>
          </TimerCard>
          <TimerCard>
            <TimerValueDisplay value={minutes} />
            <TimerLabel>Minutes</TimerLabel>
          </TimerCard>
          <TimerCard>
            <TimerValueDisplay value={seconds} />
            <TimerLabel>Seconds</TimerLabel>
          </TimerCard>
        </TimerGrid>
      </Card>
    </Container>
  );
}
