# COMMANDS USED

```bash

php artisan make:model Vehicle -m
php artisan make:model Zone -m
php artisan make:model Parking -m
php artisan migrate
php artisan make:controller Api/V1/Auth/RegisterController
php artisan make:controller Api/V1/Auth/LoginController
php artisan make:controller Api/V1/Auth/ProfileController
php artisan make:controller Api/V1/Auth/PasswordUpdateController
php artisan make:controller Api/V1/Auth/LogoutController
php artisan make:controller Api/V1/VehicleController --resource --api --model=Vehicle
php artisan make:resource VehicleResource
php artisan make:controller Api/V1/ZoneController
php artisan make:resource ZoneResource
```