import React, { Component } from 'react'
import ImageAvatars from './Profile'
import ClickAway from './ClickAway'
import AlignItemsList from './AlignItemsList'

export default class Profile extends Component {
    render() {
        return (
            <div>
                <ImageAvatars />
                <ClickAway />
                <AlignItemsList />
            </div>
        )
    }
}