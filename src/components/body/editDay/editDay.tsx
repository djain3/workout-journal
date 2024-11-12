"use client"
import { useEffect, useContext } from "react"
import { ArrowBack } from "@mui/icons-material"
import { Button } from "@mui/material"
import saveFile from "@/utils/saveFile"
import loadFile from "@/utils/loadFile"
import Exercise from "../exercise/exercise"
import { SelectedDateContext } from "./../body"
import { ScreenStateContext } from "./../body"
import { CompletedExerciseSetContext } from "./../body"

export default function EditDay() {
    const { selectedDate } = useContext(SelectedDateContext)
    const { setScreenState, setSelectedExercise } = useContext(ScreenStateContext)
    const { setCompletedExerciseSet, completedExerciseSet } = useContext(CompletedExerciseSetContext)

    useEffect(() => {
        const blob = new Blob([JSON.stringify(completedExerciseSet, null, 2)], {
            type: "application/json",
        });
        saveFile({ file: blob, name: 'completed-workout-set.json', url: '/uploadDayFile' });
    }, [completedExerciseSet]);

    const clickHandle = () => {
        if (!completedExerciseSet.length) {
            loadFile('/downloadFile')
                .then(res => {
                    const currenDate = selectedDate.toString();
                    setCompletedExerciseSet({ ...completedExerciseSet, [currenDate]: res });
                })
        };
    }

    const exerciseList = () => {
        return completedExerciseSet[selectedDate.toString()].map((exercise, i) => {
            return <Exercise onClick={() => {
                setScreenState({ status: 3 })
                setSelectedExercise(i)
            }} name={exercise.name} description={exercise.description} key={i} index={i} />
        })
    }

    return <>

        <Button
            className="text-white mb-5"
            size="large"
            fullWidth
            variant="contained"
            color="error"
            startIcon={<ArrowBack fontSize="inherit" />}
            onClick={() => setScreenState({ status: 0 })}>
            Back
        </Button>
        <hr className="mb-5" />
        {completedExerciseSet[selectedDate.toString()]?.length && exerciseList()}
        {completedExerciseSet[selectedDate.toString()]?.length && <hr className="mb-5 mt-5" />}
        <Button
            className="text-white mb-5"
            size="large"
            fullWidth
            variant="contained"
            color="success"
            onClick={() => { clickHandle() }}>
            Use Default Set
        </Button>
    </>
}