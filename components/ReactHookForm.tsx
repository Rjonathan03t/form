'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";

const signUpSchema = z.object({
    email: z.string().email('invalid mail'),
    password: z.string().min(10 ,'password be at least 10 chars'),
    confirmPassword: z.string(), 
}).refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"]
})

type TSignUpSchema = z.infer<typeof signUpSchema>

export default function ReactHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver:zodResolver(signUpSchema)
    })

    const onSubmit = async (data: TSignUpSchema) => {
        await new Promise((re) => setTimeout(re, 1000))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center bg-white h-screen">
            <h1 className="text-[50px]">
                React Hook Form
            </h1>
            <label>email</label>
            <input
                {
                ...register('email')
                }
                type="email"
                className="bg-blue-200 rounded outline-none p-5 text-white placeholder:text-gray-500"
                placeholder="user@gmail.com"
            />
            {
                errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>
            }
            <label>password</label>
            <input
                {
                ...register('password')
                }
                type="password"
                className="bg-blue-200 rounded outline-none p-5 text-white placeholder:text-gray-500"
                placeholder="password"
            />
            {
                errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>
            }
            <label>confrim password</label>
            <input
                {
                ...register('confirmPassword')
                }
                type="password"
                className="bg-blue-200 rounded outline-none p-5 text-white placeholder:text-gray-500"
                placeholder="confirm password"
            />
            {
                errors.confirmPassword && <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
            }
            <button
                type="submit"
                disabled={isSubmitting}
                className="disabled:bg-gray-600 bg-lime-500 px-12 py-5 hover:bg-lime-600 rounded-2xl w-auto text-white "
            >
                Submit
            </button>
        </form>
    );
}
