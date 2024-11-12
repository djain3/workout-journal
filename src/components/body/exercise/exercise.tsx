import { RemoveCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ExerciseProps {
    setDefaultExerciseSet?: Dispatch<SetStateAction<Array<{ name: string, description?: string }>>>,
    onClick?: () => void,
    defaultExerciseSet?: Array<{ name: string, description?: string }>,
    name: string,
    description?: string,
    sets?: number,
    weighing?: number,
    index: number
}

export default function Exercise({ defaultExerciseSet, setDefaultExerciseSet, name, description, index, onClick }: ExerciseProps) {
    return <>
        <div className="flex p-6 mb-2 bg-white rounded-xl shadow-lg text-left break-all" onClick={onClick}>
            <div>
                <div className="text-xl font-medium text-black">{name}</div>
                {description && <p className="text-slate-500 text-ellipsis overflow-hidden">{description}</p>}
            </div>
            {setDefaultExerciseSet && defaultExerciseSet && <div className='ml-auto align-center content-center w-max'>
                <IconButton onClick={() => {
                    setDefaultExerciseSet(defaultExerciseSet.filter((ex, i) => i !== index))
                }} className='w-max ml-3' color='error'>
                    <RemoveCircle className='m-0' />
                </IconButton>
            </div>}
        </div>
    </>
}