import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSubject$ = new BehaviorSubject<any>({});
  public config$ = this.configSubject$.asObservable();

  constructor() {}

  setConfig(val: any): void {
    console.log('debug-config', val);
    this.configSubject$.next(val);
  }

  get config(): any {
    return this.configSubject$.value;
  }
}
