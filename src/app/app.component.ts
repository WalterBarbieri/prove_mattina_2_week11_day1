import { HttpClient} from '@angular/common/http'
import { Component } from '@angular/core';
import { Users } from './interface/users.interface';
import { UsersService } from './service/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prove_mattina_2_week11_day1';

  newUser: {
    first_name: string,
    last_name: string
  } = {
    first_name: '',
    last_name: ''
  }

  sub!: Subscription;
  users: Users[] = [];

  constructor (private http: HttpClient, private userSrv: UsersService) {}

  ngOnInit(): void {
    this.recuperaUtenti()
  }

  recuperaUtenti() {
    this.sub = this.userSrv.recupera().subscribe((lista) =>{
      console.log(lista);
      this.users = lista;
    })
  }

  creaUtente() {
    this.sub = this.userSrv.nuovoUtente(this.newUser).subscribe((utente) => {
      console.log(utente);
      this.users.push(utente);

    })

  }

  cancellaUtente(id: number) {
    this.sub =  this.userSrv.cancella(id).subscribe(() => {
      this.users = this.users.filter((utente) => utente.id != id);
      console.log(`Utente ${id} cancellato!`);

    })
  }

}
