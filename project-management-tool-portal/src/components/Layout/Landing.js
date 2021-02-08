import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div class="landing">
                <div class="light-overlay landing-inner text-dark">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h1 class="display-3 mb-4">Personal Project Management Tool</h1>
                                <p class="lead">
                                    Create your account to join active projects or start you own
                                </p>
                                <hr />
                                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                                    Sign Up
                                </Link>
                                <Link to="/login" class="btn btn-lg btn-secondary mr-2">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default Landing;
