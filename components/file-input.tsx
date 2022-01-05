import { Button, HStack, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { BiUpload } from 'react-icons/bi'

export default function FileInput(props: React.ComponentPropsWithoutRef<'input'>) {
    const ref = useRef<HTMLInputElement>(null)

    const files = Array.from(ref.current?.files ?? [])
    const text = files.length ? files.map(({ name }) => name).join(', ') : 'No files chosen'

    return (
        <HStack
            gap={5}
            padding="2"
            border="2px"
            borderRadius="md"
            width="container.md"
            borderColor="teal.500"
        >
            <input
                hidden
                multiple
                ref={ref}
                type="file"
                width="sm"
                accept="image/svg+xml"
                {...props}
            />
            <Button
                flexShrink={0}
                colorScheme="teal"
                rightIcon={<BiUpload />}
                onClick={() => ref.current?.click()}
            >
                Validate Icons
            </Button>
            <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" title={text}>
                {text}
            </Text>
        </HStack>
    )
}
