import React, { Component, Profiler } from 'react';
import workThroughFibers from './workThroughFibers';

class DomProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
        }
    }

    componentDidMount() {
        // console.log(this.updater)
        // this.updater.cachedenqueueSetState = this.updater.enqueueSetState
        // this.updater.enqueueSetState = (inst, ...args) => {
        //     debugger
        //     this.updater.cachedenqueueSetState(inst, ...args);
        // }
        // debugger
        setTimeout(() => this.setState({ ready: true }), 0);
    }

    componentDidUpdate() {
        // console.log(this.updater)
        // this.updater.cachedenqueueSetState = this.updater.enqueueSetState
        // this.updater.enqueueSetState = (inst, ...args) => {
        //     debugger
        //     this.updater.cachedenqueueSetState(inst, ...args);
        // }
        // debugger
    }

    render() {
        const childRender = this.props.children;
        console.log(this.state.ready, childRender);

        workThroughFibers(this);
        debugger
        // return this.state.ready ? childRender : null;
        // return childRender;
        return (
            <>
                <Profiler
                onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
                    const args = arguments;
                    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions)
                    debugger
                }}
                >
                    {childRender}
                </Profiler>
                {this.state.ready ? <div /> : null}
            </>
        )
    }
}

export default DomProvider;