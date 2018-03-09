import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private endroitSubject: BehaviorSubject<string> = new BehaviorSubject(
    'Tunisia'
  );

  private providersSubject = new Subject<any>();

  private languageSubject = new Subject<string>();

  private mapGenerateurSubject = new Subject<any>();

  languages = [
    {
      language: 'Francais',
      title: 'Modélisation des données multidimensionnelles',
      barToolTip: 'Afficher la list de navigation',
      paletToolTip: 'Changer le thémé de couleur',
      email: 'Adresse emaail',
      password: 'Mot de pass'
    },
    {
      language: 'English',
      title: 'Modeling multidimensional data',
      barToolTip: 'View the navigation list',
      paletToolTip: 'Change the theme of color',
      email: 'Email adress',
      password: 'Password'
    }
  ];
  constructor(private _http: Http) {}
  getData(url) {
    return this._http
      .get(url)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'server error');
  }

  sendEndroit(endroit: string) {
    this.endroitSubject.next(endroit);
  }

  getEndroit(): Observable<string> {
    return this.endroitSubject.asObservable();
  }

  sendProviders(obj: any) {
    this.providersSubject.next(obj);
  }

  getProviders(): Observable<any> {
    return this.providersSubject.asObservable();
  }

  sendMapGenerateur(data: any) {
    this.mapGenerateurSubject.next(data);
  }

  getMapGenerateur(): Observable<any> {
    return this.mapGenerateurSubject.asObservable();
  }

  sendLanguage(language: string) {
    this.languageSubject.next(language);
  }

  getLanguage(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  getTextOf(key, language) {
    for (const lang of this.languages) {
      if (lang.language === language) {
        return lang[key];
      }
    }
  }
}
