import React from 'react'
import { Link } from 'react-router-dom'
import './Toolbar.css'

const Toolbar = (props) => {
    return (
        <header className='toolbar'>
            <nav className='toolbarNav'>
                <div></div>
                <div className='toolbarLogo'> <Link to='/'> Logo </Link> </div>
                <div className='toolbarItems'>
                    <ul>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                        <Link to='/event'>Events</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/projects'>Projects</Link>
                        <Link to='/contact' title='Contacts'>Contacts</Link>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Toolbar
