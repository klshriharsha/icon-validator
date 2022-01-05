import {
    Box,
    Heading,
    HStack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { formatBytes } from '../utils/formatter'
import { Result } from '../utils/types'
import Icon from './icon'

interface DetailsProps {
    icons: Result[]
}

export default function Results({ icons }: DetailsProps) {
    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Sizes</Th>
                        <Th>Colors</Th>
                        <Th>File Size</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {icons.map(({ svg, name, originalSize, optimizedSize }) => (
                        <Tr key={svg}>
                            <Td>{name}</Td>
                            <Td>
                                <HStack gap={5}>
                                    <Icon id="size-def" title="Default" svg={svg} />
                                    <Icon id="size-25" title="25px" svg={svg} size="25" />
                                    <Box id="size-font-30" fontSize="4xl">
                                        <Icon title="font-size: 30px" svg={svg} />
                                    </Box>
                                </HStack>
                            </Td>
                            <Td>
                                <HStack gap={5}>
                                    <Icon id="color-def" title="Default" svg={svg} />
                                    <Icon
                                        id="color-cyan"
                                        title="#0bc5ea"
                                        svg={svg}
                                        attributes={{ color: '#0bc5ea' }}
                                    />
                                    <Box id="color-purple" color="purple.400">
                                        <Icon title="color: #9f7aea" svg={svg} />
                                    </Box>
                                </HStack>
                            </Td>
                            <Td>
                                <HStack gap={5}>
                                    <VStack>
                                        <Heading size="sm">{formatBytes(originalSize)}</Heading>
                                        <Text fontSize="md" color="gray.800">
                                            Original Size
                                        </Text>
                                    </VStack>
                                    <VStack>
                                        <Heading size="sm">{formatBytes(optimizedSize)}</Heading>
                                        <Text fontSize="md" color="gray.800">
                                            Optimized Size
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    )
}
