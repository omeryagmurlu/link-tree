import { sites, name } from './sites.js'

const toggleVisibility = (elem, toggle, classTarget) => {
    if (toggle) {
        classTarget.classList.add('active')
        elem.classList.add('active')
        return
    }
    classTarget.classList.remove('active')
    elem.classList.remove('active')
}

const hider = (elem, key, target) => {
    let toggle = JSON.parse(window.localStorage.getItem(key))
    return () => {
        toggle = !toggle
        window.localStorage.setItem(key, toggle)
        toggleVisibility(elem, toggle, target)
    }
}

const entry = (key, link) => {
    if (typeof link === 'function') {
        link = link()
        if (link === null) return null
    }
    const a = document.createElement('a')
    a.href = link
    a.innerHTML = key

    // fetch(link).then(res => { // some funny cors stuff, don't care that much about it
    //     if (res.status === 401) a.style.textDecoration = 'strikethrough'
    // })

    return a
}

const compose = (key, children, level) => {
    const section = document.createElement('section')

    const header = document.createElement('header')
    header.className = `header-level${level}`
    header.innerHTML = key
    section.appendChild(header)
    
    const ul = document.createElement('ul')
    for (const c of children) {
        const li = document.createElement('li')
        li.appendChild(c)
        ul.appendChild(li)
    }
    section.appendChild(ul)

    let toggle = JSON.parse(window.localStorage.getItem(key))
    if (toggle === null) {
        toggle = true
        window.localStorage.setItem(key, toggle)
    }
    toggleVisibility(ul, toggle, header)

    header.addEventListener('click', hider(ul, key, header))

    return section
}

const tree = (arr, level) => Object.entries(arr).map(([key, val]) => {
    if (typeof val !== 'object') return entry(key, val)
    return compose(key, tree(val, level + 1), level)
}).filter(x => x)

window.addEventListener('load', () => {
    if (window.location != window.parent.location) {
        const from = (new URLSearchParams(window.location.search)).get('from')
        if (from) document.documentElement.classList.add(from)
    }

    const title = document.createElement('title')
    title.innerHTML = name
    document.head.appendChild(title)

    document.getElementById('inject').appendChild(compose(name, tree(sites, 1), 0))
})

const time = () => {
    const d = new Date()
    // const s = d.getSeconds()
    const m = d.getMinutes()
    const h = d.getHours()
    return ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2)// + ":" + ("0" + s).substr(-2)
  }

window.addEventListener('load', () => {
    const clock = document.getElementById('clock')

    clock.innerHTML = time();
    setInterval(() => {
        clock.innerHTML = time();
    }, 1000)
})