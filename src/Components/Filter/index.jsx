import React, { useContext } from 'react'
import SearchIcon from '@material-ui/icons/Search';

import './Filter.css'
import { DataContext } from '../../context/DataContext'

const Filter = () => {

    const { inputFilter, handleInputFilter } = useContext(DataContext)

    return (
        <div className='filterContainer'>
            <label htmlFor="months" className='Filter'><SearchIcon className='searchIcon'/><strong>Filtre a empresa: </strong></label>
            <input type='text' name="companies" id="companies" value={inputFilter} onChange={handleInputFilter} placeholder='Nome da empresa...' />
        </div>
    )
}

export default Filter