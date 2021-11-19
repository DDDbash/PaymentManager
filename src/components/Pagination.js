import React from 'react'

export const Pagination = ({ dataPerPage, setDataPerPage, totalData, paginate, currentPage }) => {
    return (
        <div>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= Math.ceil(totalData / dataPerPage)}>Next</button>
            <select value={dataPerPage} onChange={(e) => setDataPerPage(Number(e.target.value))}>
                {
                    [10, 15].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Rows per page: {pageSize}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Pagination;
