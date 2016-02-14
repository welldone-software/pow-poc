import { combineReducers } from 'redux';
import update from 'react/lib/update';
import documentService from '../serivces/document'

/**
 * Document title edits
 */
export function title(state = '', action) {
    const {type, payload} = action;
    switch (type) {
        case 'DOC_SET_TITLE':
            return payload.title;
        default:
            return state;
    }
}

/**
 * Changes the left and right sidebar state (open/close)
 */
export function sidebars(state = {left: true, right: true}, action) {
    const {type, payload} = action;
    switch (type) {
        case 'SIDEBAR_SET_OPEN':
            return {
                ...state,
                [payload.side]: payload.isOpen
            }
        default:
            return state;
    }
}




/**
 * Operation on the slide list (slide order, add/remove etc.)
 */
export function slides(state = [], action) {
    const {type, payload} = action;
    switch (type) {
        case 'SLIDES_ADD_SLIDE': {
            const {title, id} = payload;
            validateNewSlideId(state, id)
            validateNoneEmptyString(title)
            return [
                ...state,
                {
                    id,
                    title
                }
            ]
        }
        case 'SLIDES_REMOVE_SLIDE':
        {
            const {id} = payload;
            const index = state.findIndex(s => s.id === id)
            validateExistingSlideId(state, id)
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]

        }
        case 'SLIDES_SET_SLIDE_TITLE':
        {
            const {id, title} = payload;
            validateExistingSlideId(state, id)
            validateNoneEmptyString(title)
            return state.map(i=> i.id === id ? {...i, title} : i)
        }
        case 'SLIDES_REPOSITION_SLIDE':
        {
            const {idx, id} = payload
            const hoverIndex = idx
            const dragIndex = state.findIndex(s => s.id === id)
            const slide = state[dragIndex]

            return update(state, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, slide]
                ]
            })

        }
        default:
            return state
    }
}


/**
 * Operations the change the current slide and set its content (add/remove items, change title etc.)
 */
export function currentSlide(state = null, action) {
    const {type, payload} = action

    switch (type) {
        case 'UI_SLIDE_SELECT':
        {
            const {id} = payload;
            validateNoneEmptyString(id)
            return documentService.getSlide(id)
        }

        case 'CURR_SLIDE_SET_TITLE':
            return {
                ...state,
                title: payload.title
            }

        case 'CURR_SLIDE_ADD_ITEM':
        {
            return {
                ...state,
                items: [
                    ...state.items,
                    createItem(payload)
                ]
            }
        }
        case 'CURR_SLIDE_REMOVE_ITEM':
        {
            const {items} = state
            const index = items.findIndex(i => i.id === payload.id)
            return {
                ...state,
                items: [
                    ...items.slice(0, index),
                    ...items.slice(index + 1)
                ]
            }
        }

        case 'CURR_SLIDE_CHANGE_ITEM':
        {
            //debugger
            const {items} = state
            const {id, props} = payload
            const item = items.filter(i => id === i.id)[0]
            return {
                ...state,
                items: items.map(i=> i.id === id ? {...i, ...props} : i)
            }
        }
        default:
            return state
    }
}

function createItem({kind, x, y}) {

    const props = {circle: {r: 30}, rect: {h: 60, w: 60}}
    return {
        kind,
        id: `item${Date.now()}`,
        color: 'red',
        x: x,
        y: y,
        ...props[kind]
    }
}

function validateNoneEmptyString(str){
    if(typeof str !== 'string' || str.trim() === ''){
        throw new Error('None empty string required')
    }

}

function validateNewSlideId(slides, id){
    if(slides.find(s => s.id === id)){
        throw new Error('Slide id allready exists ' + id)
    }
    validateNoneEmptyString(id)
}

function validateExistingSlideId(slides, id){
    if(!slides.find(s => s.id === id)){
        throw new Error('Slide id does not exists ' + id)
    }
    validateNoneEmptyString(id)
}

function validateTitle(state, title){
    return validateNoneEmptyString(title)
}

const rootReducer = combineReducers({sidebars, title, slides, currentSlide})

export default rootReducer