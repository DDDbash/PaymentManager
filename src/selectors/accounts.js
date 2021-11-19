const selectAccounts = (accounts, { text, paymentStatus, sortAttribute, userFilterAttribute }) => {
    return accounts.filter((account) => {
        const firstNameMatch = account.first_name.toLowerCase().includes(text.toLowerCase());
        const lastNameMatch = account.last_name.toLowerCase().includes(text.toLowerCase());
        const emailMatch = account.email.includes(text);
        const paymentMatch = paymentStatus.toLowerCase() === 'all' ? true : account.payment_status === paymentStatus;
        const userFilterMatch = userFilterAttribute.toLowerCase() === 'all' ? true : account.user_status === userFilterAttribute;

        return (firstNameMatch || lastNameMatch || emailMatch) && paymentMatch && userFilterMatch;
    }).sort((i, j) => {
        if (sortAttribute.toLowerCase() === 'default') {
            return i.id < j.id ? -1 : 1;
        } else if (sortAttribute.toLowerCase() === 'first name') {
            return i.first_name < j.first_name ? -1 : 1;
        } else if (sortAttribute.toLowerCase() === 'last name') {
            return i.last_name < j.last_name ? -1 : 1;
        } else if (sortAttribute.toLowerCase() === 'due date') {
            return Date.parse(i.paid_date) < Date.parse(j.paid_date) ? -1 : 1;
        } else if (sortAttribute.toLowerCase() === 'last login') {
            return Date.parse(i.last_login_date) < Date.parse(j.last_login_date) ? -1 : 1;
        }
    }
    );
}

export default selectAccounts;