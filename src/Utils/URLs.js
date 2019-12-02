const baseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        // return 'http://10.9.8.102:7070'; //Josh's Local
        return 'http://10.2.2.47:5334'; //Test IP
        // return 'http://41.219.149.51:5334'; //Public IP
    } else {
        // return 'http://10.9.8.102:7070'; //Josh's Local
        return 'http://10.2.2.47:5334'; //Test IP
        // return 'http://41.219.149.51:5334'; //Public IP
    }
}
 
export const institutionLoginUrl = `${baseUrl()}/api/v1/login`;

//Dashboard 
export const transactionsHistoryURL = `${baseUrl()}/api/v1/transactions/tranHistory`;


//Terminal Management
export const allTerminals = `${baseUrl()}/api/v1/tms/terminals`;
export const registerTerminalURL = `${baseUrl()}/api/v1/tms`;
export const uploadTerminalsURL = `${baseUrl()}/api/v1/tms/upload`;
export const viewATerminal = `${baseUrl()}/api/v1/tms`;

//Institution Management
export const allInstitutions = `${baseUrl()}/api/v1/institution/institutions`;
export const registerInstitutionURL = `${baseUrl()}/api/v1/institution`;
export const viewAnInstitution = `${baseUrl()}/api/v1/institution`;

//Configurations
export const allServiceProviders = `${baseUrl()}/api/v1/serviceProviders`;
export const addServiceProviders = `${baseUrl()}/api/v1/serviceProviders/addProviders`;
export const getServiceProviderById = `${baseUrl()}/api/v1/serviceProviders/getserviceProvider`;
export const addProfiles = `${baseUrl()}/api/v1/serviceProviders/addProfiles`;

//SuperAdmin
export const superAdminLoginUrl = `${baseUrl()}/api/v1/superadmin/login`;
export const superAdminGetAllUsers = `${baseUrl()}/api/v1/superadmin/sgetAllUsers`;
export const viewAUser = `${baseUrl()}/api/v1/superadmin/users`;
export const createAUser = `${baseUrl()}/api/v1/superadmin/createUsers`;
export const deleteAUser = `${baseUrl()}/api/v1/superadmin/user`;