import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import {
    Layout,
    Header,
    Navigation,
    Drawer,
    Content,
    Footer,
    FooterSection,
    FooterLinkList
} from "react-mdl";
import './App.css';
import './css/Style.css'
import Home from './Components/Home';
import Login from './Components/Login';
import Event from './Components/Event';
import Register from './Components/Register';
import Profile from './Components/Profile';
import { getToken } from './Helpers/jwt';
import Auth from './Components/Auth';
import NewEvent from './Components/NewEvent';
import Help from './Components/Help';
import Terms from './Components/Terms';

class App extends Component {
    render() {
        const jwt = getToken();

        if (jwt) {
            return (
                <Router>
                    <div>
                        <Layout>
                            <Header className='header' title='band.id' to='/' scroll>
                                <Navigation>
                                    <Link to='/profile'>Profile</Link>
                                    <Link to='/event'>Events</Link>
                                </Navigation>
                            </Header>
                            <Drawer title='band.id'>
                                <Navigation>
                                    <Link to='/profile'>Profile</Link>
                                    <Link to='/event'>Events</Link>
                                </Navigation>
                            </Drawer>
                            <Content>
                                <div className='page-content'>
                                    <Switch>
                                        <Route exact path='/' component={Home} />
                                        <Route path='/login' component={Login} />
                                        <Route path='/register' component={Register} />
                                        <Route path='/profile' component={Profile} />
                                        <Route exact path='/event' component={Event} />
                                        <Route path='/event/new' component={NewEvent} />
                                        <Route path='/auth' component={Auth} />
                                        <Route path='/help' component={Help} />
                                        <Route path='/terms' component={Terms} />
                                    </Switch>
                                </div>
                            </Content>
                            <Footer fixedFooter className='footer' size='mini'>
                                <FooterSection type='left' logo='band.id'>
                                    <FooterLinkList className='footer-list'>
                                        <Link to='/help'>Help</Link>
                                        <Link to='/terms'>Privacy & Terms</Link>
                                    </FooterLinkList>
                                </FooterSection>
                            </Footer>
                        </Layout>
                    </div>
                </Router>
            );
        } else {
            return (
                <Layout>
                    <Header className='header' title='band.id' to='/' scroll>
                        <Navigation>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                            <Link to='/event'>Events</Link>
                        </Navigation>
                    </Header>
                    <Drawer title='band.id'>
                        <Navigation>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                            <Link to='/event'>Events</Link>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <div className='page-content'>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/login' component={Login} />
                                <Route path='/register' component={Register} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer className='footer' size='mini'>
                        <FooterSection type='left' logo='band.id'>
                            <FooterLinkList className='footer-list'>
                                <Link to='/help'>Help</Link>
                                <Link to='/terms'>Privacy & Terms</Link>
                            </FooterLinkList>
                        </FooterSection>
                    </Footer>
                </Layout>
                // <Router>
                //     <div>
                //         <Layout style={{ background: '#141e30' }}>
                //             <Header className='header' title='band.id' to='/' scroll>
                //                 <Navigation>
                //                     <Link to='/login'>Login</Link>
                //                     <Link to='/register'>Register</Link>
                //                     <Link to='/event'>Events</Link>
                //                 </Navigation>
                //             </Header>
                //             <Drawer title='band.id'>
                //                 <Navigation>
                //                     <Link to='/login'>Login</Link>
                //                     <Link to='/register'>Register</Link>
                //                     <Link to='/event'>Events</Link>
                //                 </Navigation>
                //             </Drawer>
                //             <Content>
                //                 <div className='page-content' />
                //                 <Switch>
                //                     <Route exact path='/' component={Home} />
                //                     <Route path='/login' component={Login} />
                //                     <Route path='/register' component={Register} />
                //                     <Route exact path='/event' component={Event} />
                //                 </Switch>
                //             </Content>
                //             <Footer className='footer' size='mini'>
                //                 <FooterSection type='left' logo='pizdec.tv'>
                //                     <FooterLinkList className='footer-list'>
                //                         <Link to='/help'>Help</Link>
                //                         <Link to='/terms'>Privacy & Terms</Link>
                //                     </FooterLinkList>
                //                 </FooterSection>
                //             </Footer>
                //         </Layout>
                //     </div>

                // </Router>
            );
        }




    }
}

export default App;
