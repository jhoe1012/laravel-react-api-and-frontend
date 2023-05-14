import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const { login, errors, loading } = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()

        await login({ email, password })

        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col mx-auto md:w-96 w-full">
                <h1 className="heading">Login</h1>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="required">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-input"
                        autoComplete="email"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="email" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password" className="required">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-input"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="password" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label
                        htmlFor="remember"
                        className="flex gap-2 items-center hover:cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            value={remember}
                            onChange={() =>
                                setRemember((previous) => !previous)
                            }
                            className="w-4 h-4"
                            disabled={loading}
                        />
                        <span className="select-none">Remember me</span>
                    </label>
                </div>
                <div className="border-t h-[1px] my-6"></div>
                <div className="flex flex-col gap-2 mb-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading && <IconSpinner />}
                        Login
                    </button>
                
                </div>
            </div>
        </form>
    )
}

export default Login
