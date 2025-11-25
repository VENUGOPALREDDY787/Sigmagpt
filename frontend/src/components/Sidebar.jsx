import React from 'react';
import "./Sidebar.css"
    
function Sidebar() {
    return ( 
        <>
        <section className='sidebar'>
            {/* new chat button */}
            <button>
                <img src='src/assets/download.png' alt='gpt logo' className='logo'></img>
               <span> <i className="fa-solid fa-pen-to-square"></i> </span>
            </button>

            {/* history */}
            <ul className="history">
                <li></li>
            </ul>

            {/* Signup */}
            <div className="sign">
                <p>by venu gopal</p>
            </div>
            </section>
        </>
     );
}

export default Sidebar;