import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountInfo, createNestablePublicClientApplication, IPublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  private nca?: IPublicClientApplication;
  private account?: AccountInfo;
  
  public constructor(){
    
  }

  public async loginClicked(): Promise<void> {
    if (!this.nca) {
      this.nca = await createNestablePublicClientApplication({
        auth: {
          clientId: '387ff2e1-e352-455b-80e2-0ea99eb9d132',
          authority: 'organizations'
        },
        cache: {
          cacheLocation: 'localStorage'
        }
      });
    }

    const tokenRequest = {
      scopes: ['openid', 'profile'],
      loginHint: '',
      account: undefined
    };

    try {
      console.log("Trying to acquire token silently...");

      //acquireTokenSilent requires an active account. Check if one exists, otherwise use ssoSilent.
      const authResult = this.account
        ? await this.nca.acquireTokenSilent(tokenRequest)
        : await this.nca.ssoSilent(tokenRequest);
      this.account = authResult.account;

      console.log("Acquired token silently.");
      console.log(`naaToken: ${this.account.idToken}`);
    } catch (error) {
      console.log(`Unable to acquire token silently: ${error}`);

      try {
        console.log("Trying to acquire token interactively...");
        const authResult = await this.nca.acquireTokenPopup(tokenRequest);
        this.account = authResult.account;
        console.log("Acquired token interactively.");
        console.log(`naaToken: ${this.account.idToken}`);
      } catch (popupError) {
        // Acquire token interactive failure.
        console.log(`Unable to acquire token interactively: ${popupError}`);
      }
    }

    

    const ssoToken = await Office.auth.getAccessToken()
    console.log(`ssoToken: ${ssoToken}`);
  }
}
