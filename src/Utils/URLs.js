const baseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'http://10.2.2.47:5334'
    } else {
        return 'http://10.2.2.47:5334'
    }
}
 
export const institutionLoginUrl = `${baseUrl()}/api/v1/login`;
export const superAdminLoginUrl = `${baseUrl()}/api/v1/superadmin/login`;


//Terminal Management
export const allTerminals = `${baseUrl()}/api/v1/tms`;
export const registerTerminalURL = `${baseUrl()}/api/v1/tms`;
export const viewATerminal = `${baseUrl()}/api/v1/tms`;

//Institution Management
export const allInstitutions = `${baseUrl()}/api/v1/institution/`;
export const registerInstitutionURL = `${baseUrl()}/api/v1/institution`;
export const viewAnInstitution = `${baseUrl()}/api/v1/institution`;