<?php

namespace Tests\Feature;

use App\Models\Parking;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Zone;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanGetThierOwnVehicles()
    {
        $john = User::factory()->create();
        $vehicleForJohn = Vehicle::factory()->create([
            'user_id' => $john->id
        ]);

        $adam = User::factory()->create();
        $vehicleForAdam = Vehicle::factory()->create([
            'user_id' => $adam->id
        ]);

        $response = $this->actingAs($john)->getJson('/api/v1/vehicles');

        $response->assertStatus(200)
            ->assertJsonStructure(['data'])
            ->assertJsonCount(1, ['data'])
            ->assertJsonPath('data.0.plate_number', $vehicleForJohn->plate_number)
            ->assertJsonMissing($vehicleForAdam->toArray());
    }

    public function testuserCanCreateVehicle()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/vehicles', [
            'plate_number' => 'AAA111'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['data'])
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'data' => ['0' => 'plate_number'],
            ])
            ->assertJsonPath('data.plate_number', 'AAA111');

        $this->assertDatabaseHas('vehicles', [
            'plate_number' => 'AAA111',
        ]);
    }

    public function testUserCanUpdateTheirVehicle()
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->putJson('/api/v1/vehicles/' . $vehicle->id, [
            'plate_number' => 'AAA123',
        ]);

        $response->assertStatus(202)
            ->assertJsonStructure(['plate_number'])
            ->assertJsonPath('plate_number', 'AAA123');

        $this->assertDatabaseHas('vehicles', [
            'plate_number' => 'AAA123',
        ]);
    }

    public function testUserCanDeleteTheirVehicle()
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->deleteJson('/api/v1/vehicles/' . $vehicle->id);

        $response->assertNoContent();

        $this->assertDatabaseMissing('vehicles', [
            'id' => $vehicle->id,
            'deleted_at' => NULL
        ])->assertDatabaseCount('vehicles', 1); // we have SoftDeletes, remember?
    }

    public function testUserCanStartParking()
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'user_id' => $user->id
        ]);
        $zone = Zone::first();

        $response = $this->actingAs($user)->postJson('/api/v1/parkings/start', [
            'vehicle_id' => $vehicle->id,
            'zone_id' => $zone->id,
        ]);
        $response->assertStatus(201)
            ->assertJsonStructure(['data'])
            ->assertJson([
                'data' => [
                    'start_time'  => now()->toDateTimeString(),
                    'stop_time'   => null,
                    'total_price' => 0,
                ],
            ]);

        $this->assertDatabaseCount('parkings', '1');
    }

    public function testUserCanGetOngoingParkingWithCorrectPrice()
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create(['user_id' => $user->id]);
        $zone = Zone::first();
 
        $this->actingAs($user)->postJson('/api/v1/parkings/start', [
            'vehicle_id' => $vehicle->id,
            'zone_id'    => $zone->id,
        ]);
 
        $this->travel(2)->hours();
 
        $parking = Parking::first();
        $response = $this->actingAs($user)->getJson('/api/v1/parkings/' . $parking->id);
 
        $response->assertStatus(200)
            ->assertJsonStructure(['data'])
            ->assertJson([
                'data' => [
                    'stop_time'   => null,
                    'total_price' => $zone->price_per_hour * 2,
                ],
            ]);
    }
 
    public function testUserCanStopParking()
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create(['user_id' => $user->id]);
        $zone = Zone::first();
 
        $this->actingAs($user)->postJson('/api/v1/parkings/start', [
            'vehicle_id' => $vehicle->id,
            'zone_id'    => $zone->id,
        ]);
 
        $this->travel(2)->hours();
 
        $parking = Parking::first();
        $response = $this->actingAs($user)->putJson('/api/v1/parkings/' . $parking->id);
 
        $updatedParking = Parking::find($parking->id);
 
        $response->assertStatus(200)
            ->assertJsonStructure(['data'])
            ->assertJson([
                'data' => [
                    'start_time'  => $updatedParking->start_time->toDateTimeString(),
                    'stop_time'   => $updatedParking->stop_time->toDateTimeString(),
                    'total_price' => $updatedParking->total_price,
                ],
            ]);
 
        $this->assertDatabaseCount('parkings', '1');
    }
}
