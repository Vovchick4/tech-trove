"use client"

import { useMemo } from "react"
import Spinner from "./spinner"

interface VariantType {
    solid: ColorType,
    outline: ColorType,
    ghost: ColorType,
    soft: ColorType,
    white: string,
    link: string
}

interface ColorType {
    success: string,
    danger: string,
    warning: string,
    info: string,
    blacked: string,
    blackedOpacity: string,
    white: string,
}

export interface SizeType {
    small: string,
    default: string,
    large: string,
}

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
    variant?: keyof VariantType,
    color?: keyof ColorType,
    size?: keyof SizeType,
    roundedFull?: boolean,
    fullWidth?: boolean,
    isLoading?: boolean,
    isDisabled?: boolean,
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    className?: string,
    children?: React.ReactNode,
}

const VariantTypes: VariantType = {
    solid: {
        success: "border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        danger: "border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        warning: "border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        info: "border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        white: "border border-transparent font-semibold bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        blacked: "border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800",
        blackedOpacity: "border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800",
    },
    outline: {
        success: "border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        danger: "border-2 border-red-200 font-semibold text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        warning: "border-2 border-yellow-200 font-semibold text-yellow-500 hover:text-white hover:bg-yellow-500 hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        info: "border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        white: "border-2 border-gray-100 font-semibold text-gray-400 hover:bg-white hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        blacked: "border-2 border-gray-200 font-semibold text-gray-500 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 dark:hover:bg-gray-600 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800",
        blackedOpacity: "border-2 border-gray-900 font-semibold text-gray-800 hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:hover:bg-gray-900 dark:border-gray-900 dark:hover:border-gray-900 dark:text-white dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800",
    },
    ghost: {
        success: "border border-transparent font-semibold text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm dark:focus:ring-offset-gray-800",
        danger: "border border-transparent font-semibold text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        warning: "border border-transparent font-semibold text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        info: "border border-transparent font-semibold text-blue-400 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        white: "border border-transparent font-semibold text-white hover:bg-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        blackedOpacity: "border border-transparent font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:text-white dark:hover:bg-gray-900 dark:hover:border-gray-900 dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800",
        blacked: "border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800",
    },
    soft: {
        success: "bg-green-100 border border-transparent font-semibold text-green-500 hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        danger: "bg-red-100 border border-transparent font-semibold text-red-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        warning: "bg-yellow-100 border border-transparent font-semibold text-yellow-500 hover:text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        info: "bg-blue-100 border border-transparent font-semibold text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        white: "bg-white/[.1] border border-transparent font-semibold text-gray-100 hover:text-gray-600 hover:bg-white focus:outline-none focus:ring-2 ring-offset-white focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        blackedOpacity: "bg-gray-100 border border-transparent font-semibold text-gray-800 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-800 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white",
        blacked: "bg-gray-100 border border-transparent font-semibold text-gray-500 hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:focus:ring-offset-gray-800",
    },
    link: "border-transparent bg-transparent hover:bg-transparent text-blue-500 hover:text-blue-700 border border-transparent font-semibold focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2",
    white: "border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800",
}

const ColorTypes: ColorType = {
    success: "border-2 border-green-500 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
    danger: "border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm dark:focus:ring-offset-gray-800",
    warning: "border-2 border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
    info: "border-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
    blacked: "border-2 border-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800",
    blackedOpacity: "border-2 border-gray-800 bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800",
    white: "border-2 border-gray-600 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800"
}

const SizeTypes: SizeType = {
    small: "py-2 px-3 text-sm",
    default: "py-3 px-4 text-sm",
    large: "py-3 px-4 text-sm sm:p-5",
}

export default function Button({
    variant = "solid",
    color = "info",
    size = "default",
    roundedFull = false,
    fullWidth = false,
    isLoading = false,
    isDisabled = false,
    leftIcon,
    rightIcon,
    className = "",
    children,
    ...rest }: IButton) {
    const styles = useMemo(() => {
        const classes: string[] = [];
        classes.push(SizeTypes[size]);
        if (typeof VariantTypes[variant] !== "string") {
            classes.push((VariantTypes[variant] as ColorType)[color]);
        } else {
            classes.push(ColorTypes[color]);
            classes.push(VariantTypes[variant] as string);
        }

        if (roundedFull) {
            classes.push("rounded-full");
        } else {
            classes.push("rounded-md");
        }

        if (fullWidth) {
            classes.push("w-full");
        }

        if (isDisabled) {
            classes.push("bg-blue-500 hover:bg-blue-500 outline-none border-transparent font-medium shadow-sm align-middle cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600");
        }

        return classes.join(" ");
    }, [size, color, variant, fullWidth, isDisabled, roundedFull])

    return (
        <button
            disabled={isDisabled}
            className={'inline-flex justify-center items-center gap-2 transition-all ' + styles + ` ${className}`}
            {...rest}
        >
            {leftIcon && leftIcon}
            {isLoading && <Spinner />}
            {children && !isLoading && children}
            {rightIcon && rightIcon}
        </button>
    )
}
