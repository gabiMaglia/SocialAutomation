import React from 'react'
import Image from 'next/image'
import { Text } from '@mantine/core'

const PostPreview = () => {
  return (
    <div>
        {/* IMAGEN SI LA HAY */}
        {/* <Image src={''} alt={''}></Image> */}
        <div className='styles.postHeader'>
            {/* POST TITLE */}
            <Text>React Fiber</Text>
            {/* SOCIAL MEDIA ICON */}
            <div></div>
        </div>
        {/* POST */}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolores tempora aliquam, inventore facere aperiam sequi natus. Tempore repellat excepturi nesciunt ut, assumenda atque provident, accusamus iusto deserunt quos itaque?</p>
        {/* Link to post */}
    </div>
  )
}

export default PostPreview