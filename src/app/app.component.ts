import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'outlook-app';

  protected _isApiSupported: WritableSignal<boolean> = signal(false);

  protected isApiSupported: Signal<boolean> = this._isApiSupported.asReadonly();

  protected _loginCounter: WritableSignal<number> = signal(0);

  protected loginCounter: Signal<number> = this._loginCounter.asReadonly();

  public async onLoginClick(): Promise<void> {
    this._isApiSupported.set(Office.context.requirements.isSetSupported('IdentityAPI', '1.3'));
    const token: string = await Office.auth.getAccessToken({
      allowConsentPrompt: true,
      allowSignInPrompt: true
    });

    const newLoginCount = this._loginCounter() + 1;
    this._loginCounter.set(newLoginCount);
    console.log(token);
  }
}
