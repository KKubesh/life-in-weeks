import { FC } from 'react';

type YAxisValuesProps = {
    length: number;
}

export const YAxisValues: FC<YAxisValuesProps> = ({ length }) => {
    const yearFiveTicks: number[] = length && Array.from(Array((length / 5)).keys());
    return (
        <div className="YAxisValues">
            {length && yearFiveTicks.map((key) => {
                return <div key={`yAxisTick-${key * 5}`} className="YAxisValue">
                    {key * 5}
                </div>
            })}
        </div>

    )
};

