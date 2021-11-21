import React from 'react'
import left from '../icons/left.svg';
import right from '../icons/right.svg';

export const Pagination = ({
    dataPerPage,
    setDataPerPage,
    totalData,
    paginate,
    currentPage,
    indexOfFirstData,
    currentDataSetLength
}) => {
    return (
        <div className="pagination">
            Rows per page:
            <select
                value={dataPerPage}
                onChange={(e) => setDataPerPage(Number(e.target.value))}
                className="page-size-btn"
            >
                {
                    [10, 15].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))
                }
            </select>
            {`${indexOfFirstData + 1} - ${indexOfFirstData + currentDataSetLength} of ${totalData}`}&nbsp;
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage <= 1}
                className="paginate-btn"
            >
                <img src={left} alt="prev" />
            </button>
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalData / dataPerPage)}
                className="paginate-btn"
            >
                <img src={right} alt="next" />
            </button>
        </div>
    )
}

export default Pagination;
