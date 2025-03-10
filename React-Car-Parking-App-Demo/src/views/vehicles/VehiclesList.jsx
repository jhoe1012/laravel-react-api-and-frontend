import { useVehicle } from '@/hooks/useVehicle'
import { useVehicles } from '@/hooks/useVehicles'
import { route } from '@/routes'
import { Link } from 'react-router-dom'

useVehicle
function VehiclesList() {
    const { vehicles, getVehicles } = useVehicles()
    const { destroyVehicle } = useVehicle()

    return (
        <div className="flex flex-col mx-auto md:w-96 w-full">
            <h1 className="heading">My Vehicles</h1>

            <Link to={route('vehicles.create')} className="btn btn-primary">
                Add Vehicle
            </Link>
            <div className="border-t h-[1px] my-6"></div>
            <div className="flex flex-col gap-2">
                {vehicles.length > 0 &&
                    vehicles.map((vehicle) => {
                        return (
                            <div
                                key={vehicle.id}
                                className="flex bg-gray-100 w-full p-2 justify-between"
                            >
                                <div className="flex bg-gray-100 w-full p-2 justify-between">
                                    <div className="text-xl plate">
                                        {vehicle.plate_number}
                                    </div>
                                    <div className="font-normal text-gray-600 pl-2 grow truncate">
                                        {vehicle.description}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Link
                                        to={route('vehicles.edit', {
                                            id: vehicle.id,
                                        })}
                                        className="btn btn-secondary text-sm"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
                                        onClick={async () => {
                                            await destroyVehicle(vehicle)
                                            await getVehicles()
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default VehiclesList
