import * as dotenv from 'dotenv'
import { toNumber } from 'lodash'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as entities from '../entity/index.entity'

dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: toNumber(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: Object.values(entities),
    synchronize: true,
    migrations: ['dist/database/migrations/*.js'],
}

const databaseSource = new DataSource(dataSourceOptions)
export default databaseSource
