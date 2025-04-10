import * as dotenv from 'dotenv'

dotenv.config()
const path = `${__dirname}/../../../.env`

dotenv.config({ path })

export const { ENV } = process.env
