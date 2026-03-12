import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-app');
}

//dati due utenti , uno fornisce un calendario popolato, l'altro prenota: m utenti e calendari, n prenotazioni
//modello ER
//utilizzo kafka per il microservizio
