import { useApolloClient, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REFRESH_AUTH } from "../../graphql/query";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useStateSelector } from "../../hooks/useState";
import { AuthInput, AuthOutput, setUser } from "../../redux/user";

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter()
  const user = useStateSelector(state => state.user);

  const apolloClient = useApolloClient()
  const [token, setToken] = useLocalStorage("token")
  

  useEffect(() => {

    console.log(user)
    
    const fetch = async () => {
      if (!user) {

        if (token) {

          const { data, error } = await apolloClient.query<{refresh: AuthOutput}>(
            {
              query: REFRESH_AUTH,
              fetchPolicy: "network-only",
              context: {
                headers: {
                  authorization: `Bearer ${token}`
                },
              },
            });

          if (data) {
            dispatch(setUser(data.refresh));
          } else {
            router.push("/login")
          }

        }
        else{ 
          router.push("/login")
        }
      }
    }

    fetch()
    
  }, [apolloClient, dispatch, router, user, token])

  return (
    <div>
      {user ? <div>{JSON.stringify(user)}</div> : null}
      <button onClick={() => {
        dispatch(setUser(null))
        }}>log out</button>
    </div>
  );
}