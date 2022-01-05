import type { NextApiRequest, NextApiResponse } from 'next'
import { optimize, OptimizedSvg } from 'svgo'

type ApiError = {
    error: string
}

type ApiResponse = {
    svg: string
    info: OptimizedSvg['info']
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiError | ApiResponse>,
) {
    if (!req.body) {
        return res.status(400).json({ error: 'invalid svg' })
    }

    try {
        const { svg } = JSON.parse(req.body)
        const result = optimize(svg, {
            multipass: true,
            plugins: [
                'preset-default',
                'convertStyleToAttrs',
                'removeDimensions',
                {
                    name: 'iconify',
                    type: 'perItem',
                    fn: item => {
                        if (item.type === 'element' && item.name === 'svg') {
                            item.attributes.width = '1em'
                            item.attributes.height = '1em'
                        }
                    },
                },
            ],
        })

        res.status(200).json({ svg: result.data, info: result.info })
    } catch (e) {
        res.status(400).json({ error: 'invalid svg' })
    }
}
