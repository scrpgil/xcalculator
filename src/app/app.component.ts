import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private ga: GoogleAnalytics,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
        this.ga.startTrackerWithId('UA-84483923-5')
        .then(() => {
            console.log('Google analytics is ready now');
            this.ga.trackView('top');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
        statusBar.styleDefault();
        splashScreen.hide();
    });
  }
}

