# Karatak opis aplikacije 
Ova aplikacija je namenjena za upravljanje avionskim letovima, rezervacijama i kartama, sa posebnim funkcionalnostima za korisnike i administratore. Korišćenjem React-a za frontend i axios biblioteke za HTTP zahteve, aplikacija omogućava korisnicima jednostavan i intuitivan način za pregled i upravljanje letovima i rezervacijama.
# Uputstvo za preuzimanje 

## Instalacija 
Za potrebe ovog projekta je potrebno instalirati sledeće
1. git
2. laravel (composer..)
3. node js
4. xampp
5. vs code
## Preuzimanje projekta

      git clone https://github.com/elab-development/internet-tehnologije-projekat-prodajaaviokarata_2020_0128.git
## Pokretanje laravel projekta 

      cd laravelapp
      composer install
      cp .env.example .env
      php artisan key:generate
      php artisan migrate:fresh --seed
      php artisan serve
## Pokretanje react projekta

    cd reactapp
    npm install
    npm start
