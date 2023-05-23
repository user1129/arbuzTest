import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config();
export default new Sequelize (
    process.env.DATABASE,
    process.env.DB_OWNER,
    process.env.DB_PASSWORD,
    {
        dialect:'postgres',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT
    }
)