// mixins are ([k: any]): string | null, return value for the link address 

// an example mixin that omits a link when ?from query parameter matches `ref`
export const hideWhenRef = (ref, link) => () => {
    if (window.location != window.parent.location) {
        const from = (new URLSearchParams(window.location.search)).get('from')
        if (from === 'nextcloud') return null
    }
    return 'https://nextcloud.oakleaf.duckdns.org'
}