import { useApolloClient, useQuery } from "@apollo/client"
import { useStore } from "react-redux"
import { AUTH } from "../graphql/query"


export default function Home() {
  const { client, loading, data, error} = useQuery(AUTH, { variables: { password: "Ftrack123$%"}})
  console.log(data, loading, error)
  return <div>Index Page</div>
}
