import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { register, errors, loading } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()

    await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    setPassword('')
    setPasswordConfirmation('')
    // const data = { name, email, password, passwordConfirmation }
    // console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Register</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="required">
                        Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-input"
            autoComplete="name"
            disabled={loading}
          />
          <ValidationError errors={errors} field="name" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">
                        Email
          </label>
          <input
            type="email"
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

        <div className="flex flex-col gap-2 ">
          <label htmlFor="email" className="required">
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

        <div className="flex flex-col gap-2 ">
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
                        Register
          </button>
        </div>
      </div>
    </form>
  )
}

export default Register
