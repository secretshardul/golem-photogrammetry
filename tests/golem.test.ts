import generateMesh from '../src/golem'

describe('Golem test', () => {
    it('Perform micmac conversion', async () => {
        const fileName = 'download.zip'
        await generateMesh(fileName)
    })
})