import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import './Table.css'

const Table = () => {
    return (
        <form>
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
                    <td className="tableCells">
                        <h4 className="titleRoom">
                            Premium King
                        </h4>
                    </td>
                    <td className="smallTableCells">
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                    </td>
                    <td className="tableCells">
                        <span className="roomCost">
                            $140
                        </span>
                    </td>
                    <td className="tableCells">
                        <div className="tableCellContainer">
                            <span>Private kitchen</span>
                            <span>Air conditioning</span>
                            <span>Free WiFi</span>
                        </div>
                    </td>
                    <td className="tableCells">
                        <select name="" id="" className="tableSelect">
                            <option value="0">0 &nbsp; &nbsp; &nbsp; ($0)</option>
                            <option value="1">1 &nbsp; &nbsp; &nbsp; ($140)</option>
                            <option value="2">2 &nbsp; &nbsp; &nbsp; ($280)</option>
                            <option value="3">3 &nbsp; &nbsp; &nbsp; ($420)</option>
                            <option value="4">4 &nbsp; &nbsp; &nbsp; ($560)</option>
                            <option value="5">5 &nbsp; &nbsp; &nbsp; ($600)</option>
                            <option value="6">6 &nbsp; &nbsp; &nbsp; ($740)</option>
                        </select>
                    </td>
                    <td className="ReserveCell">
                        <input type="submit" className="buttonTable" value="Reserve" />
                    </td>
                </tr>
                <tr>
                    <td className="tableCells">
                        <h4 className="titleRoom">
                            Premium King
                        </h4>
                    </td>
                    <td className="smallTableCells">
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                    </td>
                    <td className="tableCells">
                        <span className="roomCost">
                            $140
                        </span>
                    </td>
                    <td className="tableCells">
                        <div className="tableCellContainer">
                            <span>Private kitchen</span>
                            <span>Air conditioning</span>
                            <span>Free WiFi</span>
                        </div>
                    </td>
                    <td className="tableCells">
                        <select name="" id="" className="tableSelect">
                            <option value="0">0 &nbsp; &nbsp; &nbsp; ($0)</option>
                            <option value="1">1 &nbsp; &nbsp; &nbsp; ($140)</option>
                            <option value="2">2 &nbsp; &nbsp; &nbsp; ($280)</option>
                            <option value="3">3 &nbsp; &nbsp; &nbsp; ($420)</option>
                            <option value="4">4 &nbsp; &nbsp; &nbsp; ($560)</option>
                            <option value="5">5 &nbsp; &nbsp; &nbsp; ($600)</option>
                            <option value="6">6 &nbsp; &nbsp; &nbsp; ($740)</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className="tableCells">
                        <h4 className="titleRoom">
                            Premium King
                        </h4>
                    </td>
                    <td className="smallTableCells">
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                    </td>
                    <td className="tableCells">
                        <span className="roomCost">
                            $140
                        </span>
                    </td>
                    <td className="tableCells">
                        <div className="tableCellContainer">
                            <span>Private kitchen</span>
                            <span>Air conditioning</span>
                            <span>Free WiFi</span>
                        </div>
                    </td>
                    <td className="tableCells">
                        <select name="" id="" className="tableSelect">
                            <option value="0">0 &nbsp; &nbsp; &nbsp; ($0)</option>
                            <option value="1">1 &nbsp; &nbsp; &nbsp; ($140)</option>
                            <option value="2">2 &nbsp; &nbsp; &nbsp; ($280)</option>
                            <option value="3">3 &nbsp; &nbsp; &nbsp; ($420)</option>
                            <option value="4">4 &nbsp; &nbsp; &nbsp; ($560)</option>
                            <option value="5">5 &nbsp; &nbsp; &nbsp; ($600)</option>
                            <option value="6">6 &nbsp; &nbsp; &nbsp; ($740)</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className="tableCells">
                        <h4 className="titleRoom">
                            Premium King
                        </h4>
                    </td>
                    <td className="smallTableCells">
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                    </td>
                    <td className="tableCells">
                        <span className="roomCost">
                            $140
                        </span>
                    </td>
                    <td className="tableCells">
                        <div className="tableCellContainer">
                            <span>Private kitchen</span>
                            <span>Air conditioning</span>
                            <span>Free WiFi</span>
                        </div>
                    </td>
                    <td className="tableCells">
                        <select name="" id="" className="tableSelect">
                            <option value="0">0 &nbsp; &nbsp; &nbsp; ($0)</option>
                            <option value="1">1 &nbsp; &nbsp; &nbsp; ($140)</option>
                            <option value="2">2 &nbsp; &nbsp; &nbsp; ($280)</option>
                            <option value="3">3 &nbsp; &nbsp; &nbsp; ($420)</option>
                            <option value="4">4 &nbsp; &nbsp; &nbsp; ($560)</option>
                            <option value="5">5 &nbsp; &nbsp; &nbsp; ($600)</option>
                            <option value="6">6 &nbsp; &nbsp; &nbsp; ($740)</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>
    )
}

export default Table