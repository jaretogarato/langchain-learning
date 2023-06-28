import { OpenAI } from 'langchain'
import * as dotenv from 'dotenv'
dotenv.config()

const model = new OpenAI({
	temperature: 0.9,
})

const res = await model.call(
	'What would be a good company name for a company that makes colorful socks?'
)

console.log(res)
