import React, { Component } from 'react';

export default class BranchB extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='contianer'>
                <div className='block'>
                    <h1
                        onClick={() => console.log('clicked On BranchB')}
                    >BranchB</h1>
                </div>
            </div>
        )
    }
}