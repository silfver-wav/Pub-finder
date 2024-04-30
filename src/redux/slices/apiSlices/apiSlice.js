import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signout, setCredentials } from "../authSlice";
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    if (args.url.includes('null')) { // skipToken is not working in map.jsx so this is needed
      return {data: []}
    }

    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status == 403) {
        console.log('sending refresh token')
        // send refresh token
        const refreshToken = Cookies.get('refresher-cookie')
        localStorage.setItem("accessToken", refreshToken);

        const refreshResult = await baseQuery('user/refreshToken', api, extraOptions);
        
        console.log(refreshResult)

        if (refreshResult?.data) {
            // store new token
            api.dispatch(setCredentials(...refreshResult.data))

            // retry orginal query with new token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(signout())
        }
    } 
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})