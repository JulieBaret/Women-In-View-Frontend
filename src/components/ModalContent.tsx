import React, { useEffect, useState } from 'react';

// Lottie
import Lottie from 'react-lottie';
import SuccessLottie from '../lottie/success.json';
import FailLottie from '../lottie/fail.json';

// Type
import { Movie } from './SearchResults';

// Component
import Button from './Button';
import Heading from './Heading';

// Flowbite
import { Modal } from 'flowbite-react';
import { useAuth } from '../contexts/AuthContext';

// External components
import toast, { Toaster } from 'react-hot-toast';


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

type User = {
    email: string,
    id: number,
    name: string
}

const BECHDEL_QUESTIONS = ["Does this movie have at least two women in it?", "Do those women talk to each other?", "Does those talks refer to something else than a man?"];

const FormQuestion = ({ isChecked, setIsChecked, label, isEligible }: FormQuestion) => {
    return (
        <span className="flex items-center justify-between">
            <p className={`${!isEligible && 'text-gray-300'}`}>{label}</p>
            <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    className='sr-only'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    disabled={!isEligible}
                />
                <span className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm ${!isEligible && 'text-transparent'} ${isChecked && isEligible ? 'text-primary font-bold bg-[#f4f7ff]' : 'text-body-color'} `}>YES</span>
                <span className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm ${!isEligible && 'text-transparent'} ${!isChecked && isEligible ? 'text-primary font-bold bg-[#f4f7ff]' : 'text-body-color'}`}>NO</span>
            </label>
        </span>
    )
}

const Overview = ({ movie }) => {
    return (
        <div className="flex flex-col gap-4">
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className='rounded-md' alt={movie.original_title} />
            <p className="text-base leading-relaxed text-gray-500">
                {movie.overview}
            </p>
        </div>
    )
}

const Form = ({ rating, setRating }) => {
    const [resp, setResp] = useState({
        0: false,
        1: false,
        2: false
    });

    useEffect(() => {
        console.log(resp);
        updateRating();
        console.log(rating);
    }, [resp]);

    // Update rating with resp
    const updateRating = () => {
        if (resp[0] && resp[1] && resp[2]) {
            setRating(3);
        } else if (resp[0] && resp[1]) {
            setRating(2);
        } else if (resp[0]) {
            setRating(1);
        } else {
            setRating(0);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Heading variant="medium">Let's start the Bechdel Test!</Heading>
            <div className="py-6">
                {BECHDEL_QUESTIONS.map((question, index) =>
                    <FormQuestion key={index} isChecked={resp[index]} setIsChecked={() => {
                        setResp({
                            ...resp,
                            [index]: !resp[index]
                        })
                    }} label={question}
                        isEligible={index === 0 || (index === 1 && resp[0]) || (index === 2 && resp[0] && resp[1])}
                    />
                )}
            </div>
        </div>
    )
}

const Validation = ({ movieTitle, moviePoster, rating }) => {
    const hasPassed = rating === 3;

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: hasPassed ? SuccessLottie : FailLottie,
    }

    return (
        <div className="flex gap-8 relative">
            <img alt={movieTitle} src={`https://image.tmdb.org/t/p/original/${moviePoster}`} className="h-80 w-auto rounded-md" />
            <div className="flex flex-col justify-center">
                <p>According to your answers...</p>
                <Heading variant="medium">this movie {hasPassed ? 'pass' : 'fail'} the Bechdel Test{hasPassed && '!'}</Heading>
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
    const { token, user } = useAuth();

    if (!user || !token) {
        return null
    }

    const modalState = (movie) => {
        switch (step) {
            case 0:
                return <Overview movie={movie} />;
            case 1:
                return <Form rating={rating} setRating={setRating} />;
            case 2:
                return <Validation movieTitle={movie.original_title} moviePoster={movie.poster_path} rating={rating} />;
            default:
                return <Overview movie={movie} />;
        }
    }

    const handleClick = async () => {
        if (step < 2) {
            setStep(step + 1)
        } else {
            console.log(rating);
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + 'movies', {
                    method: movie.rating ? 'PUT' : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        "tmdb_id": movie.tmdb_id,
                        "original_title": movie.original_title,
                        "poster_path": movie.poster_path,
                        "backdrop_path": movie.backdrop_path,
                        "overview": movie.overview,
                        "release_date": movie.release_date,
                        "user_id": user['id'],
                        "rating": rating
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
            } catch (error) {
                toast("Something went wrong...")
                console.log(error);
            } finally {
                toast("Your movie review has been correctly added!")
                onClose()
            }
        }
    }

    const stepToButton = {
        0: movie.rating ? "Restart Bechdel Test" : "Start Bechdel Test",
        1: "Next",
        2: "Validate my answers"
    }

    return (
        <Modal.Body>
            <Toaster />
            <div className="space-y-6 flex flex-col">
                <div className="flex justify-between items-start h-16">
                    <Heading variant="large">{movie.original_title}</Heading>
                    <button onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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