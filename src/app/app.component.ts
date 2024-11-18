import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createNestablePublicClientApplication, IPublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'outlook-app';

  private pca: IPublicClientApplication | undefined;

  public async login(): Promise<void> {
    if (Office.context.requirements.isSetSupported('NestedAppAuth', '1.1')) {
      console.log('NestedAppAuth is supported');

      if (!this.pca) {
        this.pca = await createNestablePublicClientApplication({
          cache: {
            cacheLocation: 'localStorage',
          },
          auth: {
            clientId: '5375418b-f2d2-460d-97bb-07d0fb552357',
            redirectUri: `${window.location.origin}/auth.html`,
            postLogoutRedirectUri: `${window.location.origin}/index.html`,
          }
        });
      }

      try {
        const authResult = await this.pca.acquireTokenSilent({
          scopes: ['openid', 'profile']
        });

        console.log('Successfully acquired token via NAA');
        console.log(authResult);
      } catch (error) {
        console.log('Failed to acquire token via NAA');
        console.error(error);
      }
      
    }  
  }
}
