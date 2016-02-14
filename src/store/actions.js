//todo: sugar with  redux-act/redux-actions/makeActionCreator
//todo: move to own files



//
// document actions
//

export function setDocTitle(title){
    return {
        type: 'DOC_SET_TITLE',
        payload: {
            title
        }
    }
}

//export function addSlideFromTemplate(id){
//    return (dispath, getState) => {
//
//        dispath({
//            type: 'SLIDES_ADD_SLIDE_TPL_LOADING',
//            payload: null
//        })
//         $.get().then(() => {
//
//         }, () => {
//
//         })
//        const {currentSlide, slides} = getState()
//        const id = 'slide' + Date.now()
//        const title = 'New slide'
//        const slide = {
//            id, title, items: []
//        }
//        dispath({
//            type: 'SLIDES_ADD_SLIDE',
//            payload: slide
//        })
//        dispath({
//            type: 'UI_SLIDE_SELECT',
//            payload: slide
//        })
//    }
//}


export function addSlide(){
    return (dispath, getState) => {
        const {currentSlide, slides} = getState()
        const id = 'slide' + Date.now()
        const title = 'New slide'
        const slide = {
            id, title, items: []
        }
        dispath({
            type: 'SLIDES_ADD_SLIDE',
            payload: slide
        })
        dispath({
            type: 'UI_SLIDE_SELECT',
            payload: slide
        })
    }
}


export function removeSlide(id){
    return (dispath, getState) => {
        const {currentSlide, slides} = getState();
        if(id === currentSlide.id){
            return;
        }
        dispath({
            type: 'SLIDES_REMOVE_SLIDE',
            payload: {
                id
            }
        });
    }
}


export function repositionSlide(id, idx){
    console.log('SLIDES_REPOSITION_SLIDE', arguments);
    return {
        type: 'SLIDES_REPOSITION_SLIDE',
        payload: {
            id,
            idx
        }
    }

}

//
// UI only action, but changes the current slide
//

export function selectSlide(id){
    return {
        type: 'UI_SLIDE_SELECT',
        payload: {
            id
        }
    }
}


//
// currentSlide actions
//

export function addItem(kind, x, y){
    return {
        type: 'CURR_SLIDE_ADD_ITEM',
        payload: {
            kind,
            x,
            y
        }
    }
}


export function removeItem(id){
    return {
        type: 'CURR_SLIDE_REMOVE_ITEM',
        payload: {
            id
        }
    }
}

export function changeItem(id, props){
    return {
        type: 'CURR_SLIDE_CHANGE_ITEM',
        payload: {
            id,
            props
        }
    }
}

export function setSlideTitle(id, title){
    return (dispath, getState) => {
        dispath({
            type: 'SLIDES_SET_SLIDE_TITLE',
            payload: {
                id: id,
                title
            }
        });

        const {currentSlide} = getState();
        if(currentSlide.id === id){
            dispath({
                type: 'CURR_SLIDE_SET_TITLE',
                payload: {
                    title
                }
            });
        }
    }
}


//
// Sidebar
//

export function setSidebarOpen(side, isOpen){
    console.log('setSidebarOpen', arguments)
    return {
        type: 'SIDEBAR_SET_OPEN',
        payload: {
            side,
            isOpen
        }
    }
}
