"use client"
import { useContext, useRef } from "react"
import { SelectedDateContext } from "../body"
import { CompletedExerciseSetContext } from "../body"
import { ScreenStateContext } from "../body"
import { Button, TextField } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

const EditedProps = ['Name', 'Description', 'Sets', 'Weighing'];

interface Exercise {
    name: string;
    description?: string;
    sets?: string;
    weighing?: string;
    [key: string]: string | undefined;
}

export default function EditExercise() {
    const { selectedDate } = useContext(SelectedDateContext);
    const { completedExerciseSet, setCompletedExerciseSet } = useContext(CompletedExerciseSetContext);
    const { selectedExercise, setScreenState } = useContext(ScreenStateContext);
    console.log(completedExerciseSet)
    interface InputRefs {
        [key: string]: HTMLInputElement
    }

    const inputs = useRef<InputRefs>({});

    const handleInputRef = (element: HTMLInputElement, prop: string) => {
        inputs.current[prop.toLowerCase()] = element;
    };

    const TextFieldList = () => {
        return EditedProps.map((prop, i) => {
            const currentDay = completedExerciseSet[selectedDate.toString()]
            const currentExercise = currentDay[selectedExercise] as Record<string, string>;

            const currentValueProp = prop.toLowerCase();
            const currentValue = currentExercise[currentValueProp];

            return <TextField
                inputRef={(element) => handleInputRef(element, prop)}
                defaultValue={currentValue}
                className="mb-3 w-full"
                label={prop}
                variant="outlined"
                type={prop == 'Sets' || prop == 'Weighing' ? 'number' : 'text'}
                key={i} />
        })
    }

    const saveHandle = () => {
        const savedExercise: Exercise = {} as Exercise;

        for (const prop in inputs.current) {
            if (!inputs.current[prop].value) continue;

            savedExercise[prop] = inputs.current[prop].value;
        }

        const completedExerciseSetCopy = [ ...completedExerciseSet[selectedDate.toString()] ]
        completedExerciseSetCopy[selectedExercise] = savedExercise

        setCompletedExerciseSet({ ...completedExerciseSet, [selectedDate.toString()]: completedExerciseSetCopy })
        setScreenState({ status: 1 })
    };

    return <>
        <Button
            className="text-white mb-5"
            size="large"
            fullWidth
            variant="contained"
            color="error"
            startIcon={<ArrowBack fontSize="inherit" />}
            onClick={() => saveHandle()}>
            Back
        </Button>
        <hr className="mb-5" />
        <TextFieldList />
    </>
}