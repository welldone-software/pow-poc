import {expect} from 'chai'
import documentService from '../../src/serivces/document'

import document1 from '../data/document1.json'
import document2 from '../data/document2.json'
import store1 from '../data/store1.json'
import store2 from '../data/store2.json'


describe('document service', () => {

    describe('when localstorage is empty', () => {

        beforeEach(function () {
            localStorage.removeItem('document');
        });

        it('starts with a default document', () => {
            const state = documentService.getInitialState()
            expect(state).to.be.an('object')

        })

        it('#get returns a default document', ()=> {

            const documentBefore = localStorage.getItem('document')
            const state = documentService.getInitialState()

            expect(documentBefore).to.be.a('null')
            expect(state).to.be.a('object')

        })

        it('#get saves default document to storage', ()=> {

            const documentBefore = localStorage.getItem('document')
            documentService.getInitialState()
            const documentAfter = localStorage.getItem('document')

            expect(documentBefore).to.be.a('null')
            expect(documentAfter).to.be.a('string')

        })
    })

    //describe('when localstorage is not empty', () => {
    //
    //
    //    it('starts with a default document', () => {
    //        localStorage.setItem('document', JSON.stringify(document1));
    //        const state = documentService.getInitialState()
    //        expect(state).to.equal(store1);
    //
    //    })
    //
    //})

})