import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { useVehicle } from '@/hooks/useVehicle'
import { route } from '@/routes'
import { useNavigate } from 'react-router-dom'

function CreateVehicle() {
  const { vehicle, createVehicle } = useVehicle()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    await createVehicle(vehicle.data)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Add Vehicle</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="plate_number" className="required">
                        License Plate
          </label>
          <input
            id="plate_number"
            name="plate_number"
            type="text"
            value={vehicle.data.plate_number ?? ''}
            onChange={(event) =>
              vehicle.setData({
                ...vehicle.data,
                plate_number: event.target.value,
              })
            }
            className="form-input plate"
            disabled={vehicle.loading}
          />
          <ValidationError
            errors={vehicle.errors}
            field="plate_number"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="description" className="required">
                        Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={vehicle.data.description ?? ''}
            onChange={(event) =>
              vehicle.setData({
                ...vehicle.data,
                description: event.target.value,
              })
            }
            className="form-input"
            disabled={vehicle.loading}
          />
          <ValidationError
            errors={vehicle.errors}
            field="description"
          />
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={vehicle.loading}
            className="btn btn-primary w-full"
          >
            {vehicle.loading && <IconSpinner />}
                        Save Vehicle
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={vehicle.loading}
            onClick={() => navigate(route('vehicles.index'))}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateVehicle
