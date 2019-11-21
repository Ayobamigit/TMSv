const baseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'http://41.219.149.51:5334'
    } else {
        return 'http://41.219.149.51:5334'
    }
}
 
export const institutionLoginUrl = `${baseUrl()}/api/v1/login`;

//Dashboard 
export const transactionsHistoryURL = `${baseUrl()}/api/v1/transactions/tranHistory`;


//Terminal Management
export const allTerminals = `${baseUrl()}/api/v1/tms`;
export const registerTerminalURL = `${baseUrl()}/api/v1/tms`;
export const uploadTerminalsURL = `${baseUrl()}/api/v1/tms/upload`;
export const viewATerminal = `${baseUrl()}/api/v1/tms`;

//Institution Management
export const allInstitutions = `${baseUrl()}/api/v1/institution/`;
export const registerInstitutionURL = `${baseUrl()}/api/v1/institution`;
export const viewAnInstitution = `${baseUrl()}/api/v1/institution`;

//SuperAdmin
export const superAdminLoginUrl = `${baseUrl()}/api/v1/superadmin/login`;
export const superAdminGetAllUsers = `${baseUrl()}/api/v1/superadmin/sgetAllUsers`;
export const viewAUser = `${baseUrl()}/api/v1/superadmin/users`;
export const createAUser = `${baseUrl()}/api/v1/superadmin/createUsers`;
export const deleteAUser = `${baseUrl()}/api/v1/superadmin/user`;