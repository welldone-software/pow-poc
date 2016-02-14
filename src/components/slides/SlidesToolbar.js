import React from 'react'

/**
 *
 * Slides toolbar with actions (e.g minimize bar, add slide)
 *
 */
const SlidesToolbar = ({isOpen, onClose, addSlide}) => (
    <div className="slides-actions">
        <button className="slides-actions-close" style={{display: isOpen ? '' : 'none'}} onClick={onClose}><i className="fi-list"></i></button>
        <button className="slides-actions-add" onClick={addSlide}><i className="fi-plus"></i></button>
    </div>
)


export default SlidesToolbar