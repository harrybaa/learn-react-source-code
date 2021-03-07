import React, { Component } from 'react';

export default class LeafA extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='contianer'>
                <div className='block'>
                    <h1
                        onClick={() => console.log('clicked On LeafA')}
                    >LeafA</h1>
                </div>
            </div>
        )
    }
}