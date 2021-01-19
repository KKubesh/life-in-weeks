import { FC } from 'react';
import { WeekBox } from './WeekBox';
import { XAxisValues } from './XAxisValues';
import { YAxisValues } from './YAxisValues';

type WeekContainerProps = {
    lived?: number;
    unlived?: number;
    years?: number;
}

export const WeekContainer: FC<WeekContainerProps> = ({ lived, unlived, years }) => {
    const livedWeeks: number[] = Array.from(Array(lived).keys());
    const unlivedWeeks: number[] = Array.from(Array(unlived).keys());

    return (
        <div className={"DisplayFlex"}>
            <XAxisValues />
            <div className="YAxisContainer">
                <YAxisValues length={years} />
                {<div className={"WeekContainer"}>
                    {livedWeeks.map((index) => {
                        return <WeekBox key={`lived-${index}`} lived={true} />
                    })}
                    {unlivedWeeks.map((index) => {
                        return <WeekBox key={`unlived-${index}`} lived={false} />
                    })}
                </div>}
            </div>
        </div>
    )
};

