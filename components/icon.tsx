import { Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface IconProps extends React.ComponentPropsWithoutRef<'div'> {
    svg: React.ReactNode
    title: string
    size?: string
    attributes?: React.HTMLAttributes<'svg'>
}

export default function Icon({ svg, size, title, attributes = {}, ...props }: IconProps) {
    const iconRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!iconRef.current) {
            return
        }

        const svgEl = iconRef.current.querySelector('svg')
        if (!svgEl) {
            return
        }

        Object.entries(attributes).forEach(([key, val]) => svgEl.setAttribute(key, val))

        if (size) {
            svgEl.setAttribute('width', size)
            svgEl.setAttribute('height', size)
        }
    }, [svg, size, attributes])

    return (
        <VStack {...props}>
            {typeof svg === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: svg }} ref={iconRef} />
            ) : (
                svg
            )}
            <Text fontSize="md" color="gray.800" whiteSpace="nowrap" fontWeight="normal">
                {title}
            </Text>
        </VStack>
    )
}
