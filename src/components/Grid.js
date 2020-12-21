import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import PostCard from './PostCard'

const ThreeColumnGrid = ({ heading, data }) => (
    <Grid columns={3}>
        <Grid.Row className="page-title">
            <h1>{heading}</h1>
        </Grid.Row>
        <Grid.Row>
            {
                data.map(value =>
                    <Grid.Column key={value.id} style={{ marginBottom: 20 }}>
                        <PostCard {...value}/>
                    </Grid.Column>
                )
            }

        </Grid.Row>
    </Grid>
)

export default ThreeColumnGrid