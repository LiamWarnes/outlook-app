# OutlookApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Prior to serving the application, you will first need to create and install self-signed certificates for serving with SSL (required by office addins).

**Please note: This step is not required for debugging the code on your local machine. Only follow those instructions when we need to renew expired certificates.**

[openssl](https://www.openssl.org) is used to generate the keys. [Git for Windows](https://git-scm.com/download/win) includes `openssl` and is therefore on our development machines and we can use it.

Open a `cmd` window in the **certs** folder of this project and execute the following two commands to create the Certificate Authority certificate

* `"C:\Program Files\Git\usr\bin\openssl.exe" req -x509 -nodes -new -sha256 -days 3650 -newkey rsa:4096 -keyout outlook-addin-rootca.key -out outlook-addin-rootca.pem -subj "/C=AU/CN=OutlookAddin-Root-CA"`

* `"C:\Program Files\Git\usr\bin\openssl.exe" x509 -outform pem -in outlook-addin-rootca.pem -out outlook-addin-rootca.crt`

Now execute the following command to create the Domain Certificate. Note that this command uses a configuration file from within certs/documentation

* `"C:\Program Files\Git\usr\bin\openssl.exe" req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -config self-signed-cert-config.conf -keyout outlook-addin-localhost.key -out outlook-addin-localhost.crt`

Install the new .crt files now located in the **certs** folder to your CurrentUser/Trusted Root Certificate Authorities store

Note that the name of the .crt and .key files for localhost must match the values provided in angular.json for this project

Run `ng serve` for a dev server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
