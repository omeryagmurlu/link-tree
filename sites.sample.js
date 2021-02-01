// rename this file to sites.js after configuration
import { hideWhenRef } from './mixins.js'

// link tree: name is root, object keys are categories, and leaves are links
// themselves. you can nest categories however deep you want
export const name = 'example.com'
export const sites = {
    'code-server': 'https://code.example.com',
    plex: 'https://plex.example.com',
    overseerr: 'https://overseerr.example.com',
    // here's a mixin, see mixins.js (there's only this one lol but still)
    nextcloud: hideWhenRef('nextcloud', 'https://nextcloud.example.com'),
    
    media: {
        transmission: 'https://transmission.example.com',
        sonarr: 'https://sonarr.example.com',
        radarr: 'https://radarr.example.com',
        jackett: 'https://jackett.example.com',
        bazarr: 'https://bazarr.example.com',
        tautulli: 'https://tautulli.example.com',
    },

    google: 'https://www.google.com',

    services: {
        plantuml: 'https://plantuml.example.com',
        linx: 'https://linx.example.com',
    }
}

// there some more styling related options in `index.css`, I didn't
// bother wiring them here