import { useApolloClient } from "@apollo/client"
import { useStore } from "react-redux"


export default function Home() {
  const client = useApolloClient()
  const store = useStore()
  console.log(client)
  console.log(store)
  return <div>Index Page</div>
}
