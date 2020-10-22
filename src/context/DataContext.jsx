import React, { createContext, useState, useEffect } from 'react'
import fakeData from '../data.json'
import moment from 'moment'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    // const [id, setId] = useState([])
    const [data, setData] = useState(fakeData)
    const [isLoading, setIsLoading] = useState(false)
    const [inputFilter, setInputFilter] = useState('')

    // let myHeaders = new Headers();

    // myHeaders.append('X-Cisco-Meraki-API-Key', '6f4bf0d272b57719d69550e832cd32d5f381197d');
    // myHeaders.append('Content-Type', 'application/json');

    // const requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };

    // useEffect(() => {
    //     async function fetchData() {
    //         await fetch('https://cors-anywhere.herokuapp.com/https://dashboard.meraki.com/api/v0/organizations', requestOptions)
    //             .then(response => response.json())
    //             .then(result =>
    //                 setId(...id, result)
    //             )
    //             .catch(error => console.log('error', error))
    //     }
    //     fetchData()
    // }, [])

    // useEffect(() => {
    //     setIsLoading(true)
    //     id.map(companyId => {
    //         async function fetchData() {
    //             await fetch(`https://cors-anywhere.herokuapp.com/https://dashboard.meraki.com/api/v0/organizations/${companyId.id}/licenses`, requestOptions)
    //                 .then(response => response.json())
    //                 .then(result =>
    //                     setData(prevState => [...prevState, { company: companyId.name, results: result, error: result.errors ? true : false }]))
    //                 .catch(error => console.log('error', error))
    //         }
    //         setIsLoading(false)
    //         fetchData()
    //     })
    // }, [id])

    const handleInputFilter = ev => {
        ev.preventDefault()
        setInputFilter(ev.target.value)
    }

    const cleanData = data.filter(each => !each.error &&
        each.company !== 'CORPORE' &&
        each.company.toLowerCase().includes(inputFilter.toLowerCase())
    )

    cleanData.map(data => console.log(data.results.filter(result => result.state === 'active')))

    // console.log(cleanData)


    const restingDays = (expirationDate) => {
        let date1 = moment();
        let date2 = moment(expirationDate);
        return date2.diff(date1, 'days');
    }

    const outputData = Object.values(cleanData.reduce((obj, curr) => {
        obj[curr.company] = Object.values(curr.results.reduce((data, { licenseType, expirationDate, state }) => {
            // generate the key based on what is the group
            const key = licenseType + expirationDate;
            //have we seen it, if not create record
            if (!data[key])
                data[key] = { licenseType, expirationDate: restingDays(expirationDate), qty: 0, company: curr.company, state };
            // update quantity
            data[key].qty++;
            return data;
        }, {}));
        return obj;
    }, {}))
        .flat()
        .sort((a, b) => {
            if (a.expirationDate < b.expirationDate) {
                return -1;
            } else {
                return 1;
            }
        })
        .filter(each => each.expirationDate >= 0 && each.state === 'active')

    return (
        <DataContext.Provider value={{ isLoading, inputFilter, restingDays, handleInputFilter, cleanData, outputData }}>
            {children}
        </DataContext.Provider>
    )
}
