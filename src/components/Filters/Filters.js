import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortUsers, filterUsers } from '../../actions/filters';

const Filters = (props) => {
    const [showFilterModal, setShowFilterModal] = useState(false)
    const sortBy = ['default', 'first name', 'last name', 'due date', 'last login']
    const userFilter = ['all', 'active', 'inactive']
    return (
        <section className="filters">
            <input
                type="text"
                placeholder="Search Users by Name, Email or Date"
                value={props.filters.text}
                className="searchbar"
                onChange={(e) => props.dispatch(setTextFilter(e.target.value))}
            />
            <div>
                <button
                    className={showFilterModal ? 'filter-btn show' : 'filter-btn'}
                    onClick={() => setShowFilterModal(!showFilterModal)}
                >
                    Filter
                </button>
                <div className={showFilterModal ? 'filter-modal show' : 'filter-modal'}>
                    <p>Sort by: </p>
                    <ul>
                        {
                            sortBy.map((sortAttribute, i) => (
                                <li key={i}
                                    onClick={
                                        () => props.filters.sortAttribute.toLowerCase() === sortAttribute.toLowerCase() ?
                                            true :
                                            props.dispatch(sortUsers(sortAttribute))
                                    }
                                >
                                    <input type="radio"
                                        id={sortAttribute}
                                        name="sortUsers"
                                        value={sortAttribute}
                                        checked={props.filters.sortAttribute.toLowerCase() === sortAttribute.toLowerCase()}
                                        readOnly
                                    />
                                    <label htmlFor={sortAttribute}>
                                        {sortAttribute}
                                    </label><br />
                                </li>
                            ))
                        }
                    </ul>
                    <p>Users: </p>
                    <ul>
                        {
                            userFilter.map((userFilterAttribute, i) => (
                                <li key={i}
                                    onClick={
                                        () => props.filters.userFilterAttribute.toLowerCase() === userFilterAttribute.toLowerCase() ?
                                            true :
                                            props.dispatch(filterUsers(userFilterAttribute))
                                    }
                                >
                                    <input type="radio"
                                        id={userFilterAttribute}
                                        name="userFilter"
                                        value={userFilterAttribute}
                                        checked={props.filters.userFilterAttribute.toLowerCase() === userFilterAttribute.toLowerCase()}
                                        readOnly
                                    />
                                    <label htmlFor={userFilterAttribute}>
                                        {userFilterAttribute}
                                    </label><br />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default connect((state) => {
    return {
        filters: state.filters
    };
})(Filters);