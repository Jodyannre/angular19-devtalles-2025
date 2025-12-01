import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { __makeTemplateObject } from 'tslib';
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Joddie',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada'
}

const client2 = {
  name: 'Mary',
  gender: 'female',
  age: 27,
  address: 'New York, USA'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    Card,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {
  // i18nSelect pipe
  client = signal(client1)
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  // i18nPlural pipe

  clientsMap = signal({
    '=0': 'No tenemos ningún cliente esperando.',
    '=1': 'Tenemos un cliente esperando.',
    'other': 'Tenemos # clientes esperando.'
  });

  clients = signal(['Maria', 'Pedro', 'Juan', 'Ana', 'Luis', 'Carmen', 'Diego']);

  deleteClient() {
    this.clients.update(currentClients => currentClients.slice(1));
  }

  // KeyValue Pipe
  profile = {
    name: 'Joddie',
    age: 39,
    address: 'Ottawa, Canada'
  }

  // Async Pipe
  promiseValue = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de la promesa');
      console.log('Promise resolved');
    }, 3500);
  });

  myObservableTime = interval(2000).pipe(
    map(value => value + 1),
    tap(value => console.log('Observable emit:', value))
  )
}
