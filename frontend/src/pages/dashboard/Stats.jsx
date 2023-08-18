import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import {
  Loading,
  StatsContainer,
  ChartsContainer,
} from '../../components/index.js';

const Stats = () => {
  const { showStats, monthlyApplications, isLoading } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />

      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
