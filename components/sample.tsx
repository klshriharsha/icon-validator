import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/react'
import { BsFillImageFill } from 'react-icons/bs'

import Icon from './icon'

interface SampleProps {
    size?: boolean
    color?: boolean
}

export default function Sample({ size, color }: SampleProps) {
    if (size) {
        return (
            <VStack align="flex-start" padding="2" gap={2} textTransform="none">
                <VStack width="full">
                    <Heading size="md">Expected</Heading>
                    <Divider />
                </VStack>
                <HStack gap={5}>
                    <Icon title="Default" svg={<BsFillImageFill />} />
                    <Icon title="25px" svg={<BsFillImageFill size={25} />} />
                    <Icon
                        title="font-size: 30px"
                        svg={
                            <Box fontSize="30px">
                                <BsFillImageFill />
                            </Box>
                        }
                    />
                </HStack>
            </VStack>
        )
    }

    if (color) {
        return (
            <VStack align="flex-start" padding="2" gap={2} textTransform="none">
                <VStack width="full">
                    <Heading size="md">Expected</Heading>
                    <Divider />
                </VStack>
                <HStack gap={5}>
                    <Icon title="Default" svg={<BsFillImageFill />} />
                    <Icon title="#0bc5ea" svg={<BsFillImageFill color="#0bc5ea" />} />
                    <Icon
                        title="color: #9f7aea"
                        svg={
                            <Box color="#9f7aea">
                                <BsFillImageFill />
                            </Box>
                        }
                    />
                </HStack>
            </VStack>
        )
    }

    return null
}
