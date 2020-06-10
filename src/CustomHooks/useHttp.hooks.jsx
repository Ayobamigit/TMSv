import React, { useState, useEffect } from 'react';
import swal from '../constants/swal';

export const useHttp = (url, dependencies) => {
    const [isLoading, setIsLoading ] = useState(false);
    const [fetchedData, setFetchedData ] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error('Failed to Fetch Data');
            } 
            return response.json();
        })
        .then(data => {
            setIsLoading(false);
            setFetchedData(data)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
        })
    }, dependencies);
    return [isLoading, fetchedData];
}