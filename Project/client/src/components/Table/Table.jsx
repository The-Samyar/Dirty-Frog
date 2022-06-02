import React from 'react'
import './Table.css'

const Table = () => {
    return (
        <table className="table">
            <tr>
                <th className="tableHeader">Room Type</th>
                <th className="tableHeader">Sleeps</th>
                <th className="tableHeader">Price per Night</th>
                <th className="tableHeader">Services</th>
                <th className="tableHeader">Select room</th>
                <th className="tableHeader">Reserve</th>
            </tr>

            <tr>
                <td className="tableCells">Value</td>
                <td className="smallTableCells">Value</td>
                <td className="tableCells">Value</td>
                <td className="tableCells">Value</td>
                <td className="tableCells">Value</td>
                <td className="tableCells">Value</td>
            </tr>
        </table>
    )
}

export default Table