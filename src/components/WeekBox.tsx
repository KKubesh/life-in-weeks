type WeekBoxProps = {
    lived: boolean;
}

export const WeekBox: React.FC<WeekBoxProps> = ({ lived }) => {

    return (
        <div className={lived ? "SolidBox" : "EmptyBox"} />
    );
};

