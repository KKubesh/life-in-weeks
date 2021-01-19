import { FC, useState } from 'react';
import './App.css';
import { DateTime, Interval } from "luxon";
import { WeekContainer } from './components/WeekContainer';

const weeksDiff = (startYear: DateTime, endYear: DateTime) => Math.round(Interval.fromDateTimes(startYear, endYear).length("weeks"));
const yearsDiff = (startYear: DateTime, endYear: DateTime) => Math.round(Interval.fromDateTimes(startYear, endYear).length("years"));
const endDate = (startYear: DateTime, years: number) => startYear.plus({ years: years });
const getDateOccurrance = (startDate: DateTime, endDate: DateTime) => {
  return startDate > endDate;
}

const weeksFromYearDate = (todayISO: DateTime, currentYearDate: DateTime, currentYear: number) => {
  // check if date has occurred for this given year
  const hasDateOccurred = getDateOccurrance(todayISO, currentYearDate);
  // if date has not occurred, you must back date it a year
  const adjustedDate = currentYearDate.set({ year: currentYear - 1 });
  return weeksDiff((hasDateOccurred ? currentYearDate : adjustedDate), todayISO);
}

const getWeeksThisYear = (todayISO: DateTime, startDateISO: DateTime) => {
  const currentYear = todayISO.toFormat("y");
  const currentYearDate = startDateISO.set({ year: currentYear });
  const weeksSinceYearDate = weeksFromYearDate(todayISO, currentYearDate, currentYear);
  return weeksSinceYearDate;
}
const getWeeks = (todayISO: DateTime, startDateISO: DateTime) => {
  const weeksSince = yearsDiff(startDateISO, todayISO) * 52;
  const weeksThisYear = getWeeksThisYear(todayISO, startDateISO);
  const totalWeeks = weeksSince + weeksThisYear;
  return totalWeeks;
}

export const App: FC = () => {
  const [startDate, setStartDate] = useState<string>();
  const [years, setYears] = useState<number>(0);
  const [lived, setLived] = useState<number>();
  const [unlived, setUnlived] = useState<number>();

  const updateStartDate = (event) => {
    setStartDate(event.target.value);
  }

  const updateYears = (event) => {
    setYears(Number(event.target.value));
  }

  const updateCalculatedValues = (years, startStringDate) => {
    const startDateISO = DateTime.fromISO(startStringDate);
    const endDateISO = endDate(startDateISO, years);
    const todayISO = DateTime.local();
    const livedWeeks = getWeeks(todayISO, startDateISO);
    const unlivedWeeks = getWeeks(endDateISO, todayISO) - 52;
    if (startDate && years) {
      setLived(livedWeeks);
      // calculation rounding error causes an extra week, total weeks should always be even
      setUnlived(((livedWeeks + unlivedWeeks) % 2 == 0) ? unlivedWeeks : unlivedWeeks - 1);
    }
  }

  return (
    <div className="App">
      <div className="FormContainer">
        <input type="date" placeholder="Role Start Date" onChange={e => updateStartDate(e)} />
        <input type="number" placeholder="90" onChange={e => updateYears(e)} />
        <button onClick={() => updateCalculatedValues(years, startDate)}>Calculate</button>
      </div>
      <h1>
        Life in Weeks
      </h1>
      {(lived || unlived) ?
        <WeekContainer lived={lived} unlived={unlived} years={years} />
        : <p className="InfoText">I believe how we approach our everyday is based on the perspective
        in which you view your life. This chart always interest me because it often felt like a
        different approach. I recall seeing this chart a while back and I recently pulled it back up.
        Printed my paper out and started coloring in the squares. I made it about 5 years in and
        decided I would build this tool myself. Read the original article and get the original chart
        by <a href="https://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a></p>
      }
    </div>
  );
}
