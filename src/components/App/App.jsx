import { useState } from 'react';
import { Container } from './App.styled';
import { Section } from '../Section/Section';
import { Feedback } from '../Feedback/Feedback';
import { Statistics } from '../Statistics/Statistics';
import { Notification } from '../Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const { good, neutral, bad } = feedback;

  const countTotalFeedback = () => good + neutral + bad;
  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = () =>
    Math.round((good / total) * 100) || 0;

  const stateNames = Object.keys(feedback);
  const totalFeedback = countTotalFeedback();
  const totalPercentage = countPositiveFeedbackPercentage();

  return (
    <Container>
      <Section title="Please leave feedback">
        <Feedback onLeaveFeedback={onLeaveFeedback} options={stateNames} />
      </Section>
      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={totalPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};

export default App;
