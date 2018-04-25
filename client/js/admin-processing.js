import { displayModal, hideModal } from './modal-display.js'
import { formUpdateButtonElement } from './modal-processing.js'

const editLink = document.getElementsByClassName('link-edit-module')

const doubleClickUpdate = (evt) => {
    if (evt.target.value === 'UPDATE(1)') {
        evt.preventDefault()
        evt.target.value = 'UPDATE(0)'
        return
    } 
    hideModal()
    evt.target.value = 'UPDATE(1)'
}

formUpdateButtonElement.addEventListener('click', doubleClickUpdate)

export const evtLinkEdit = () => {
    Array.from(editLink).forEach(e => {
        e.addEventListener('click', evt => {
            const elemt = evt.target
            const module = elemt.parentElement.parentElement.parentElement
            displayModal(module)
        })
    })
}

const cutUrlIcon = (str) => {
    const matched = str.match(/-(.*?)\./)
    return matched ? matched[1].split('-')[0] : str
}

const rgbToHex = (arrayRgb) => {
    arrayRgb = arrayRgb.map(e => Number(e))
    return "#" + ((1 << 24) + (arrayRgb[0] << 16) + (arrayRgb[1] << 8) + arrayRgb[2]).toString(16).slice(1).toUpperCase()
}

const moyenColor = (arrayRgb) => {
   return arrayRgb.reduce((x, y) => Number(x) + Number(y)) / 3
}

const rgbToArray = (rgb) => rgb.match(/([0-9]+)/g)

export const fillFormEdit = (data) => {
    
    console.log(data)
    
    document.getElementById('new-module-form-title').value = data.getElementsByClassName('title-module')[0].innerHTML
    document.getElementById('new-module-form-url').value = data.getElementsByClassName('link-url')[0].href
    // value in input ICON
    const valueIcon = cutUrlIcon(data.getElementsByClassName('icon')[0].src)
    document.getElementById('new-module-form-icon').value = valueIcon
    document.getElementById(`btn-${valueIcon}`).style.opacity = '1'
    // value in input COLOR
    const arrRgb = rgbToArray(data.style.backgroundColor)
    const colorModule = moyenColor(arrRgb) > 155 ?

    `${rgbToHex(arrRgb)}-b` : `${rgbToHex(arrRgb)}-w`
    
    document.getElementById('new-module-form-color').value = colorModule.slice(1)
    document.getElementsByName(colorModule.slice(1))[0].children[0].style.border = '3px solid #b3b3b3'

    // put value modul in input
    const idBlock = data.id.split("-")[1]
    document.getElementById('new-module-form-id').value = idBlock
}