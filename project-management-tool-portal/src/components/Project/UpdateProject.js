import React, { Component } from 'react';
import { getProject, createProject } from '../../actions/projectActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

class UpdateProject extends Component {

    constructor() {
        super()

        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getProject(id, this.props.history);
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.errors) {
            return ({ errors: nextProps.errors });
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.project !== prevProps.project) {
          this.setState(this.props.project);
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const updateProject = {
            ...this.state
        }
        
        this.props.createProject(updateProject, this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Update Project form</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.projectName
                                            })}  
                                            placeholder="Project Name"
                                            name="projectName"
                                            value={this.state.projectName}
                                            onChange={this.onChange}
                                        />
                                        {errors.projectName && (
                                            <div className="invalid-feedback">{errors.projectName}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.projectIdentifier
                                            })}  
                                            placeholder="Unique Project ID"
                                            name="projectIdentifier"
                                            value={this.state.projectIdentifier}                
                                            disabled 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.description
                                            })}  
                                            placeholder="Project Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.onChange}
                
                                        ></textarea>
                                        {errors.projectName && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input 
                                            type="date" 
                                            className="form-control form-control-lg" 
                                            value={this.state.start_date} 
                                            onChange={this.onChange}               
                                            name="start_date" 
                                        />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input 
                                            type="date" 
                                            className="form-control form-control-lg" 
                                            value={this.state.end_date}
                                            onChange={this.onChange}                
                                            name="end_date"                                             
                                        />
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project:state.project.project,
    errors: state.errors
})

export default connect(mapStateToProps, {getProject, createProject})(UpdateProject);
