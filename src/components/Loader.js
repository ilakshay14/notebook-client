import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const CustomLoader = ({content}) => (
        <>
            <Loader content={content} size="massive" active/>
        </>
)

export default CustomLoader;
