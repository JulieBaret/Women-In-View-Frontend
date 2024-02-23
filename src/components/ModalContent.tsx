import React, { useState } from 'react';

// Lottie
import Lottie from 'react-lottie';
import SuccessLottie from '../lottie/success.json';

// Type
import { Movie } from './SearchResults';

// Component
import Button from './Button';
import Heading from './Heading';

// Flowbite
import { Modal } from 'flowbite-react';
import Stepper from './Stepper';


type Props = {
    movie: Movie;
    onClose: () => void;
}

type FormQuestion = {
    isChecked: boolean;
    setIsChecked: (boolean) => void;
    label: string;
    isEligible: boolean;
}

const BECHDEL_QUESTIONS = ["Does this movie have at least two women in it?", "Do those women talk to each other?", "Does those talks refer to something else than a man?"];

const FormQuestion = ({ isChecked, setIsChecked, label, isEligible }: FormQuestion) => {
    // TODO: handle isEligible
    return (
        <span className="flex items-center justify-between">
            <p>{label}</p>
            <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    className='sr-only'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    disabled={!isEligible}
                />
                <span className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm ${isChecked ? 'text-primary font-bold bg-[#f4f7ff]' : 'text-body-color'}`}>YES</span>
                <span className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm ${!isChecked ? 'text-primary font-bold bg-[#f4f7ff]' : 'text-body-color'}`}>NO</span>
            </label>
        </span>
    )
}

const FirstStep = ({ movie }) => {
    return (
        <div className="flex flex-col gap-4">
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop}`} className='rounded-md' alt={movie.title} />
            <p className="text-base leading-relaxed text-gray-500">
                {movie.overview}
            </p>
        </div>
    )
}

const SecondStep = () => {
    const [resp, setResp] = useState({
        0: false,
        1: false,
        2: false
    });

    return (
        <div className="flex flex-col gap-4">
            <Heading variant="medium">Let's start the Bechdel Test!</Heading>
            <div className="py-6">
                {BECHDEL_QUESTIONS.map((question, index) =>
                    <FormQuestion isChecked={resp[index]} setIsChecked={() => {
                        setResp({
                            ...resp,
                            [index]: !resp[index]
                        })
                    }} label={question} isEligible={index === 0 || (index > 0 && resp[index - 1] === true)} />
                )}
            </div>
        </div>
    )
}

const LastStep = ({ movieTitle, moviePoster }) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: SuccessLottie,
    }

    return (
        <div className="flex gap-8 relative">
            <img alt={movieTitle} src={`https://image.tmdb.org/t/p/original/${moviePoster}`} className="h-80 w-auto rounded-md" />
            <div className="flex flex-col justify-center">
                <p>According to your answers...</p>
                <Heading variant="medium">this movie pass the Bechdel Test!</Heading>
            </div>
            <div className="absolute top-64 left-40">
                <Lottie options={defaultOptions} height={100} width={100} />
            </div>
        </div>
    )
}

const ModalContent = ({ movie, onClose }: Props) => {
    const [step, setStep] = useState(0);
    const [rating, setRating] = useState(null);

    const modalState = (movie) => {
        switch (step) {
            case 0:
                return <FirstStep movie={movie} />;
            case 1:
                return <SecondStep />;
            case 2:
                return <LastStep movieTitle={movie.title} moviePoster={movie.poster} />;
            default:
                return <FirstStep movie={movie} />;
        }
    }

    const handleClick = () => {
        if (step < 2) {
            setStep(step + 1)
        } else {
            onClose()
        }
    }

    const stepToButton = {
        0: "Start Bechdel Test",
        1: "Next",
        2: "Validate my answers"
    }

    return (
        <Modal.Body>
            <div className="space-y-6 flex flex-col">
                <div className="flex justify-between h-20">
                    <Heading variant="large">{movie.title}</Heading>
                    <button onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                {modalState(movie)}
                <div className="flex self-end gap-2">
                    {step > 0 && <Button type="button" variant="secondary" value="Back" onClick={() => setStep(step - 1)} />}
                    <Button type="button" variant="primary" value={stepToButton[step]} onClick={handleClick} />
                </div>
            </div>
        </Modal.Body>
    );
};

export default ModalContent;