import React, { Component } from 'react';
import LeafA from './LeafA';

export default class BranchA extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='contianer'>
                <div className='block'>
                    <h1
                        traceKey='BranchA'
                        onClick={() => console.log('clicked On BranchA')}
                    >BranchA</h1>
                </div>
                <LeafA />
            </div>
        )
    }
}