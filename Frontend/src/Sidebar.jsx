import React from 'react';
import "./Sidebar.css"
function Sidebar() {
    return (<section className='sidebar'>
        {/* new chat button */}
        <button>
            <img src="src/assets/Gptlogo.png" alt="Gpt Logo" className='logo'/>
            <span> <i className="fa-solid fa-pen-to-square"></i></span>
        </button>
        {/* history */}
        <ul className='history'>
        <li>History1</li>
        <li>History1</li>
        <li>History1</li>
        </ul>
        {/* sign */}
        <div className='sign'>
            <p>By apna collage</p>
        </div>
    </section> );
}

export default Sidebar;