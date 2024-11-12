import { useEffect, useState, useContext } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';
import { Dayjs } from 'dayjs';
import { SelectedDateContext } from '../body';
import { ScreenStateContext } from '../body';
import { CompletedExerciseSetContext } from '../body';

export default function Calendar() {
    const { setSelectedDate } = useContext(SelectedDateContext)
    const { setScreenState } = useContext(ScreenStateContext)
    const { completedExerciseSet } = useContext(CompletedExerciseSetContext)
    
    const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

    useEffect(() => {
        if (Object.keys(completedExerciseSet).length) {
            const tempArray: number[] = Object.keys(completedExerciseSet).map(day => {
                const parsedDate = Date.parse(day);
                const returnedDate: number = new Date(parsedDate).getDate();
                return returnedDate;
            })
            setHighlightedDays(tempArray)
        }
    }, [completedExerciseSet]);

    const changeDateHandler = (value: Date) => {
        setSelectedDate(value);
        setScreenState({ status: 1 })
    }

    const ServerDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) => {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '🌚' : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    return (
        <DateCalendar
            onChange={(newValue) => changeDateHandler(newValue)}
            slots={{
                day: ServerDay,
            }}
            slotProps={{
                day: {
                    highlightedDays,
                } as object,
            }} />
    )
}