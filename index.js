import { ApolloServer, gql } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { nanoid } from 'nanoid'

const typeDefs = gql`
	type Todo {
		id: ID
		title: String
	}

	type Query {
		todoList: [Todo]
	}
`

const todos = [
	{ id: nanoid(), title: '特拉斯“好感度”跌至“负59”，比约翰逊还惨' },
	{ id: nanoid(), title: '百年投行瑞士信贷陷破产传闻' },
	{ id: nanoid(), title: '法拉第未来执行董事长辞职:称遭到死亡威胁' },
	{ id: nanoid(), title: 'iPhone 14零件成本较13上涨20%：卖一部仍赚5千元' },
	{ id: nanoid(), title: '北京：博物馆度假期' },
	{ id: nanoid(), title: '假期余额不足 如何缓解和应对“节后综合征”？' }
]

const resolvers = {
	Query: {
		todoList: () => todos
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: 'bounded',
	plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})