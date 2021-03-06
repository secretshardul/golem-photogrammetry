import path from 'path'
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { Executor, Task, utils, vm, WorkContext } from "yajsapi"
import { v4 as uuidv4 } from 'uuid'

dayjs.extend(duration)

const { asyncWith, logUtils, range } = utils

export default async function generateMesh(fileName: string, instructions: string[]) {
    const MICMAC_HASH = '6d6069a827b0674d7b5463ccb1b2c7c375b14f23c5dec8dba8f114ae'
    const subnet_tag = 'devnet-beta.1'
    const driver = 'zksync'
    const network = 'rinkeby'
    const tasks = [new Task<number, string>(0)]
    const outputFileName = uuidv4() + '.zip' // UUID to generate a unique name for file

    const _package = await vm.repo({
        image_hash: MICMAC_HASH,
        min_mem_gib: 0.5,
        min_storage_gib: 2.0,
    })

    async function* worker(ctx: WorkContext, tasks: Task<any, any>[]) {
        console.log('Got instructions', instructions)

        ctx.send_file(
            path.join(__dirname, '../', fileName),
            "/golem/resource/" + fileName
        )

        ctx.run("/bin/sh", [
            "-c",
            `unzip /golem/resource/${fileName} -d /golem/resource/extracted`,
        ])

        for await (let task of tasks) {
            for(let instr of instructions) {
                ctx.run("/bin/sh", [
                    "-c",
                    instr,
                ])
            }

            ctx.run("/bin/sh", [
                "-c",
                'zip -r /golem/resource/output.zip /golem/resource/extracted',
            ])

            ctx.download_file(
                "/golem/resource/output.zip",
                path.join(__dirname, 'response', outputFileName)
            )

            yield ctx.commit({ timeout: dayjs.duration({ seconds: 120 }).asMilliseconds() })
            task.accept_result('done')
        }

        ctx.log("no more frames to render")
        return
    }

    await asyncWith(
        new Executor({
            task_package: _package,
            max_workers: 1,
            timeout: dayjs.duration({ minutes: 30 }).asMilliseconds(),
            budget: "10.0",
            subnet_tag,
            driver,
            network,
            event_consumer: logUtils.logSummary(),
        }),
        async (executor: Executor): Promise<void> => {
            for await (let task of executor.submit(
                worker,
                tasks as any
            )) {
                console.log("result=", task.result())
            }
        }
    )
    return outputFileName
}