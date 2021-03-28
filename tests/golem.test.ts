import generateMesh from '../src/golem'

const instructions = [
    'ls >> /golem/resource/extracted/files.txt',
    'Tapioca MulScale "/golem/resource/extracted/IMG_[0-9]{4}.tif" 300 -1 ExpTxt=1',
    'Apero /golem/resource/extracted/Apero-5.xml',
    'MICMAC /golem/resource/extracted/Param-6-Ter.xml'
]

describe('Golem test', () => {
    it('Perform micmac conversion', async () => {
        const fileName = 'Boudha.zip'

        await generateMesh(fileName, instructions)
    })
})