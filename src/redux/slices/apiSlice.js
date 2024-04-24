import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signout, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus == 403) {
        console.log('sending refresh token')
        // send refresh token
        const refreshResult = await baseQuery('user/refreshToken', api, extraOptions)
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