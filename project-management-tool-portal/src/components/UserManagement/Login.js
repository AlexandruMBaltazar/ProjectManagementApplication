import React, { Component } from 'react';
import {login} from '../../actions/securityActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if(this.props.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.security.validToken !== prevProps.security.validToken) {
          this.props.history.push("/dashboard");
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.errors) {
            return ({ errors: nextProps.errors });
        }

        return null;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    

    onSubmit(e) {
        e.preventDefault();

        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(loginRequest);
    }


    render() {
        const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email" 
                                        placeholder="Email Address - Username" 
                                        name="username" 
                                        value={this.state.username}
                                        onChange={this.onChange} 
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.username
                                        })}                                         
                                     />
                                     {errors.username && (
                                         <div className="invalid-feedback">{errors.username}</div>
                                     )}                                     
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        placeholder="Password" 
                                        name="password" 
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.password
                                        })}  
                                    />
                                     {errors.password && (
                                         <div className="invalid-feedback">{errors.password}</div>
                                     )}                                      
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(mapStateToProps, {login})(Login);
