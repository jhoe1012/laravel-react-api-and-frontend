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
php artisan make:controller Api/V1/ParkingController
php artisan make:resource ParkingResource
php artisan make:observer ParkingObserver --model=Parking
php artisan make:test AuthenticationTest
php artisan make:test ProfileTest
php artisan make:test ZoneTest
php artisan make:test VehicleTest
php artisan make:factory VehicleFactory --model=Vehicle
php artisan make:test ParkingTest
composer require --dev knuckleswtf/scribe
php artisan vendor:publish --tag=scribe-config
php artisan scribe:generate

npm init vite@latest

✔ Project name: … React-Car-Parking-App-Demo
✔ Select a framework: › React
✔ Select a variant: › JavaScript
 
Scaffolding project in ./React-Car-Parking-App-Demo...
 
Done.

cd React-Car-Parking-App-Demo
npm install
npm run dev

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm install -D eslint eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
npm run lint
npm install react-router-dom --save
```