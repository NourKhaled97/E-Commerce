"use client";

import { ComponentProps } from "react";
import { useFormStatus } from 'react-dom'

// create props for this component & add the ComponentProps with it
// to allow the button to take props of original buttonComponent
type FormeSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">

export default function FormeSubmitButton(
    { children, className, ...props }: FormeSubmitButtonProps
) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            className={`btn btn-primary ${className}`}
            disabled={pending}
        >
            {/* this is the loading component in case Form is loading */}
            {pending && <span className="loading loading-spinner" />}
            {children}
        </button>
    )
}