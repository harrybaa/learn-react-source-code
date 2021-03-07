import React, { Component } from 'react';
import BranchA from './BranchA';
import BranchB from './BranchB';

export default class TreeRoot extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='contianer'>
                <div className='block'>
                    <h1>Hello React 17!</h1>
                    <span>Copy right.</span>
                </div>
                <BranchA />
                <BranchB />
            </div>
        )
    }
}