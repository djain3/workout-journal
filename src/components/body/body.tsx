"use client"
import { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

import Calendar from "./calendar/calendar";
import CreateSet from "./createSet/createSet";
import ExerciseSet from "./defaultSet/defaultSet";
import EditDay from "./editDay/editDay";
import loadFile from "@/utils/loadFile";
import EditExercise from "./editExercise/editExercise";

interface selectedDateContexProps {
    selectedDate: Date
    setSelectedDate: Dispatch<SetStateAction<Date>>
}

interface screenStateContextProps {
    screenState: { status: number },
    setScreenState: Dispatch<SetStateAction<{ status: number }>>
    selectedExercise: number
    setSelectedExercise: Dispatch<SetStateAction<number>>
}

interface completedExerciseSetContextProps {
    completedExerciseSet: {
        [key: string]: Array<{ name: string, description?: string, sets?: string, weighing?: string }>
    },
    setCompletedExerciseSet: Dispatch<SetStateAction<{
        [key: string]: Array<{ name: string, description?: string, sets?: string, weighing?: string }>
    }>>
}

const currentDate = new Date;

export const SelectedDateContext = createContext<selectedDateContexProps>({
    selectedDate: currentDate,
    setSelectedDate: () => { },
});

export const ScreenStateContext = createContext<screenStateContextProps>({
    screenState: { status: 0 },
    setScreenState: () => { },
    selectedExercise: 0,
    setSelectedExercise: () => { },
})

export const CompletedExerciseSetContext = createContext<completedExerciseSetContextProps>({
    completedExerciseSet: {},
    setCompletedExerciseSet: () => { }
})

const Body = () => {
    const [screenState, setScreenState] = useState<{ status: number }>({ status: 0 });
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

    const [selectedExercise, setSelectedExercise] = useState(0)

    const [completedExerciseSet, setCompletedExerciseSet] = useState<{
        [key: string]: Array<{ name: string, description?: string, sets?: string, weighing?: string }>
    }>({});

    useEffect(() => {
        loadFile('/downloadAllExercise')
            .then(res => {
                setCompletedExerciseSet(res);
            })
    }, [])

    const screenStateSelect = () => {
        switch (screenState.status) {
            case 0:
                return <Calendar />
            case 1:
                return <EditDay />
            case 2:
                return <ExerciseSet />
            case 3:
                return <EditExercise />
            default:
                return <></>;
        }
    }

    return <>
        <CompletedExerciseSetContext.Provider
            value={{
                completedExerciseSet,
                setCompletedExerciseSet
            }}>
            <ScreenStateContext.Provider
                value={{
                    screenState,
                    setScreenState,
                    selectedExercise,
                    setSelectedExercise
                }}>
                <SelectedDateContext.Provider
                    value={{
                        selectedDate,
                        setSelectedDate
                    }}
                >
                    <div className="container mx-auto py-5">
                        <div className="text-center flex flex-wrap align-center">
                            <div className="mx-auto w-1/3">
                                {screenStateSelect()}
                                {screenState.status === 0 && <CreateSet />}
                            </div>
                        </div>
                    </div>
                </SelectedDateContext.Provider>
            </ScreenStateContext.Provider>
        </CompletedExerciseSetContext.Provider>
    </>
}

export default Body;
