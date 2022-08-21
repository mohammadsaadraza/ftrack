import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AUTH } from "../graphql/query";
import { useStateSelector } from "../hooks/useState";
import { AuthInput, AuthOutput, setUser } from "../redux/user";

interface FormData {
  password: string
}

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const user = useStateSelector(state => state.user)

  // on-click query of authentication
  const [getAuth, { loading, data, error }] = useLazyQuery<{authenticate: AuthOutput}, AuthInput>(
    AUTH,
    {
      fetchPolicy: "network-only",
    }
  );

  // controlling form field; password
  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({ defaultValues: { password: ""}})

  // redirect if user is logged in
  useEffect(() => {
    if(user){
      router.push("/")
    }
  }, [router, user])
  
  // submit func of form
  const onSubmit = async (formData: FormData) => {
    const {data} = await getAuth({ variables: { password: formData.password }})

    if(data){
      dispatch(setUser(data.authenticate))
    }
  };

  return (
    <>
      <div>Index Page</div>

      { loading ? <div>Loading...</div> : null}

      <div>{JSON.stringify(user)}</div>
      { error ? <div>Error on Query: {error.graphQLErrors[0].extensions.code as string}</div> : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("password", { required: true})} ></input>
        {errors.password && <div>Password is required</div>}
        <button type={"submit"}>
          Click
        </button>
      </form>

    </>
  );
}
