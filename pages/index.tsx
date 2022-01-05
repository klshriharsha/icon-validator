import { Container, Spinner, useBoolean, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'

import FileInput from '../components/file-input'
import Results from '../components/results'
import { Result } from '../utils/types'

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useBoolean()
    const [results, setResults] = useState<Result[]>([])

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading.on()
        const promises: Promise<Result>[] = []

        Array.from(e.target.files ?? []).forEach(async file => {
            const promise = new Promise<Result>(async resolve => {
                const text = await file.text()
                const response = await fetch('/api/icons/optimize', {
                    method: 'POST',
                    body: JSON.stringify({ svg: text }),
                })
                const json = await response.json()

                resolve({
                    svg: json.svg,
                    originalSize: text.length,
                    optimizedSize: json.svg.length,
                    name: file.name.replace(/\.svg$/, ''),
                })
            })

            promises.push(promise)
        })

        Promise.all(promises).then(res => {
            setResults(res)
            setIsLoading.off()
        })
    }

    return (
        <div>
            <Head>
                <title>Icon Validator</title>
                <meta name="description" content="Validate SVG icons" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container as="main" maxW="container.xl">
                <VStack gap={2} align="center" paddingTop="10" width="full">
                    <FileInput onChange={handleChange} />
                    {isLoading && <Spinner />}
                    {results.length && <Results icons={results} />}
                </VStack>
            </Container>
        </div>
    )
}

export default Home
