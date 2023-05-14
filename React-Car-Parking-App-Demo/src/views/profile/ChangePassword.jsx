import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { usePassword } from '@/hooks/usePassword'
import { useState } from 'react'

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const { errors, loading, status, updatePassword } = usePassword()

    async function handleSubmit(event) {
        event.preventDefault()

        await updatePassword({
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirmation,
        })
        setCurrentPassword('')
        setPassword('')
        setPasswordConfirmation('')
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col mx-auto md:w-96 w-full">
                <h1 className="heading">Change Password</h1>

                {status && (
                    <div className="alert alert-success mb-4">{status}</div>
                )}

                <div className="flex flex-col gap2 mb-4">
                    <label htmlFor="current_password" className="required">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="current_password"
                        id="current_password"
                        value={currentPassword}
                        onChange={(event) =>
                            setCurrentPassword(event.target.value)
                        }
                        className="form-input"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="current_password" />
                </div>

                <div className="flex flex-col gap2 mb-4">
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
                        autoComplete="new-password"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="password" />
                </div>

                <div className="flex flex-col gap2 mb-4">
                    <label htmlFor="password_confirmation" className="required">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(event) =>
                            setPasswordConfirmation(event.target.value)
                        }
                        className="form-input"
                        autoComplete="new-password"
                        disabled={loading}
                    />
                </div>

                <div className="border-t h-[1px] my-6"></div>

                <div className="flex flex-col gap-2 mb-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading && <IconSpinner />}
                        Update Password
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword
