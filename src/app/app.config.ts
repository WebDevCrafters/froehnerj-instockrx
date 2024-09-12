import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideLottieOptions({ player: () => player }),
        provideCacheableAnimationLoader(),
        provideAnimations(),
        provideToastr(
            { positionClass: 'toast-bottom-left' }
        ),
        provideNgxStripe()
    ],
};
