import { route } from '@/routes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useParking() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    async function startParking(data) {
        setLoading(true)
        return axios
            .post('parkings/start', data)
            .then(() => navigate(route('parkings.active')))
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    return { loading, errors, startParking }
}
