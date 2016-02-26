import defaultDocument from './defaultDocument.json'


const documentStorage = {
  get(){
    if(!localStorage.document){
      localStorage.document = JSON.stringify(defaultDocument)
    }
    return JSON.parse(localStorage.document)
  },
  set(doc){
    localStorage.document = JSON.stringify(doc)
  }
}

function getSlideItems(slideId, document){
  const doc = document.slides.find(s => s.id === slideId) || {items: []}
  return doc.items
}

export default {

  getInitialState(){
    const document = documentStorage.get()
    return {
      title: document.title,
      slides: document.slides.map(s => ({id: s.id, title: s.title, snapshot: s.snapshot})),
      currentSlide: document.slides[0]
    }
  },

  getSlideItems(slideId){
    const document = documentStorage.get()
    return getSlideItems(slideId, document)
  },

  getSlide(slideId){
    const document = documentStorage.get()
    return document.slides.find(s => s.id === slideId)
  },

  updateFromState(state){
        //document.slides.map(s => s.id === state.currentSlide.id ? state.currentSlide : s);

    const document = documentStorage.get()
    const currentSlideId = state.currentSlide.id

    const newDocument = {
      title: state.title,
      slides: state.slides.map(s =>
                s.id === currentSlideId ?
                    state.currentSlide :
                    {...s, items: getSlideItems(s.id, document)}
            )
    }
    documentStorage.set(newDocument)

  }
}


