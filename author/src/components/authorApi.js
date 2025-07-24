import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authorApi = createApi({
    reducerPath: 'authorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_HOST}/`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['MuseumData', 'VenueSlots'],
    endpoints: (builder) => ({
        getMuseum: builder.query({
            query: (venueId) => `venue/museum/${venueId}`,
            providesTags: ['MuseumData'],
        }),

        getVenueSlots: builder.query({
            query: ({ venueId, date }) => `venue/slot/${venueId}/${date}`,
            providesTags: ['VenueSlots'],
        }),
    }),
});

export const {
    useGetMuseumQuery,
    useGetVenueSlotsQuery,
    useLazyGetVenueSlotsQuery,
} = authorApi;