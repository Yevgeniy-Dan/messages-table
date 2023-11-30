import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { appReducers } from './state/app.state';
import { MessageEffects } from './state/messages/messages.effects';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    StoreModule.forRoot(appReducers, {}),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
        authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
        projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'],
        storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
        messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
        appId: process.env['NG_APP_FIREBASE_APP_ID'],
      })
    ),
    provideFirestore(() => getFirestore()),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([MessageEffects]),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
