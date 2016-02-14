import {expect} from 'chai'
import {slides} from '../../src/store/reducers'
import * as actions from '../../src/store/actions'
import store1 from '../data/store1.json'

describe('slides reducer', () => {

    describe('when handling setSlideTitle action', ()=> {


        it('throws for null id', () => {
            expect(function(){
                slides(store1.slides, {
                    type: 'SLIDES_SET_SLIDE_TITLE',
                    payload: {
                        id: null,
                        title: 'good title'
                    }
                })
            }).to.throw(Error)
        })

        it('throws for empty string id', () => {
            expect(function(){
                slides(store1.slides, {
                    type: 'SLIDES_SET_SLIDE_TITLE',
                    payload: {
                        id: '',
                        title: 'good title'
                    }
                })
            }).to.throw(Error)
        })

        it('throws for spaces only id', () => {
            expect(function(){
                slides(store1.slides, {
                    type: 'SLIDES_SET_SLIDE_TITLE',
                    payload: {
                        id: '          ',
                        title: 'good title'
                    }
                })
            }).to.throw(Error)
        })


        it('throws for non-existing id', () => {
            expect(function(){
                slides(store1.slides, {
                    type: 'SLIDES_SET_SLIDE_TITLE',
                    payload: {
                        id: 'NO SUCH ID %67676764#@!',
                        title: 'good title'
                    }
                })
            }).to.throw(Error)
        })

        it('throws for empty title', () => {
            expect(function(){
                slides(store1.slides, {
                    type: 'SLIDES_SET_SLIDE_TITLE',
                    payload: {
                        id: store1.slides[0].id,
                        title: ''
                    }
                })
            }).to.throw(Error)
        })
    })

})




