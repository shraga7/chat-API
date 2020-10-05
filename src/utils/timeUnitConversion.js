export const convertDaysToMiliseconds = (days) => {
  const DAY_HOURS = 24;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const ONE_SECOND_IN_MILISECONDS = 1000;
  return (
    days *
    DAY_HOURS *
    SECONDS_IN_MINUTE *
    MINUTES_IN_HOUR *
    ONE_SECOND_IN_MILISECONDS
  );
};
