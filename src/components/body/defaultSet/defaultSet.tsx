"use client"
import { useRef, useEffect, useContext } from "react"
import { Button, TextField } from "@mui/material"
import React, { useState } from "react"
import Exercise from "../exercise/exercise"
import { Add, ArrowBack } from "@mui/icons-material"
import saveFile from "@/utils/saveFile"
import loadFile from "@/utils/loadFile"
import { ScreenStateContext } from "../body"

export default function ExerciseSet() {
    const { setScreenState } = useContext(ScreenStateContext)
    const [defaultExerciseSet, setDefaultExerciseSet] = useState<Array<{ name: string, description?: string }>>([]);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputDescrRef = useRef<HTMLInputElement>(null);

    if (!defaultExerciseSet.length) {
        loadFile('/downloadFile')
            .then(res => {
                setDefaultExerciseSet(res);
            })
    }

    useEffect(() => {
        if (!defaultExerciseSet.length) return;
        const blob = new Blob([JSON.stringify(defaultExerciseSet, null, 2)], {
            type: "application/json",
        });
        saveFile({ file: blob, name: 'default-workout-set.json', url: '/uploadfile' });
    }, [defaultExerciseSet])

    const clickHandler = () => {
        if (!inputNameRef.current?.value) return;
        interface newExerciseOptions { name: string, description?: string };

        const newExercise: newExerciseOptions = { name: inputNameRef.current?.value };
        inputNameRef.current.value = '';

        if (inputDescrRef.current?.value) {
            newExercise.description = inputDescrRef.current?.value;
            inputDescrRef.current.value = '';
        }
        setDefaultExerciseSet([...defaultExerciseSet, newExercise]);
    }

    const exerciseList = () => {
        return defaultExerciseSet.map((exercise, i) => {
            return <Exercise
                name={exercise.name}
                description={exercise.description}
                key={i}
                index={i} />
        })
    }

    return <>
        <div className="text-center flex flex-wrap align-center">
            <div className="mx-auto w-1/3">
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
                {exerciseList()}
                <hr className="mt-5 mb-5" />
                <TextField className="mt-5 mb-2" fullWidth inputRef={inputNameRef} variant="outlined" label="Exercise Name" />
                <TextField className="mb-5" fullWidth inputRef={inputDescrRef} variant="outlined" label="Description" />
                <Button className="text-white" size="large" fullWidth variant="contained" color="success" startIcon={<Add />} onClick={clickHandler} >Add</Button>
            </div>
        </div>
    </>
}