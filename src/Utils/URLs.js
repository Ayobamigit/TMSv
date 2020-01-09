const baseUrl = () => {
    // return 'http://10.9.8.102:7070'; //Josh's Local
    // return 'http://10.2.2.47:5334'; //Test IP
    return 'http://10.9.8.63:5334'; //Public IP
}
 
export const institutionLoginUrl = `${baseUrl()}/api/v1/login`;

//Dashboard 
export const transactionsHistoryURL = `${baseUrl()}/api/v1/transactions/tranHistory`;
export const transactionsStatistics = `${baseUrl()}/api/v1/dashboard/transationStatistics`;
export const activeAndInactiveTerminalsStatistics = `${baseUrl()}/api/v1/dashboard/activeinactive`;
export const allTerminalsStatistics = `${baseUrl()}/api/v1/dashboard/terminalCount`;
export const totalNumberOfInstitutions = `${baseUrl()}/api/v1/dashboard/getTotalInstitutions`;
export const getNewTokenUrl = `${baseUrl()}/api/v1/superadmin/gettoken`;
export const getTransactionByIdUrl = `${baseUrl()}/api/v1/transactions`;

//Terminal Management
export const allTerminals = `${baseUrl()}/api/v1/tms/terminals`;
export const registerTerminalURL = `${baseUrl()}/api/v1/tms`;
export const uploadTerminalsURL = `${baseUrl()}/api/v1/tms/upload`;
export const viewATerminal = `${baseUrl()}/api/v1/tms`;
export const getProfilesByServiceProviderName = `${baseUrl()}/api/v1/tms/getprofilesByInstitutionName`;

//Institution Management
export const registerInstitutionURL = `${baseUrl()}/api/v1/institution`;
export const viewAnInstitution = `${baseUrl()}/api/v1/institution`;
export const getBanks = `${baseUrl()}/api/v1/serviceProviders/banks`;
export const allInstitutions = `${baseUrl()}/api/v1/institution/institutionslist`;
export const allInstitutionsList = `${baseUrl()}/api/v1/institution/institutions`;

//Configurations
export const allServiceProviders = `${baseUrl()}/api/v1/serviceProviders`;
export const addServiceProviders = `${baseUrl()}/api/v1/serviceProviders/addProviders`;
export const getServiceProviderById = `${baseUrl()}/api/v1/serviceProviders/getserviceProvider`;
export const addProfiles = `${baseUrl()}/api/v1/serviceProviders/addProfiles`;
export const getProfileById = `${baseUrl()}/api/v1/serviceProviders/profiles`;
export const editProfile = `${baseUrl()}/api/v1/serviceProviders/editprofiles`;
export const editProviders = `${baseUrl()}/api/v1/serviceProviders/providers`;
export const deleteServiceProviderById = `${baseUrl()}/api/v1/serviceProviders/deleteServiceProvider`;
export const deleteProfileById = `${baseUrl()}/api/v1/serviceProviders/deleteProfile`;
export const getProfilesByServiceProviderId = `${baseUrl()}/api/v1/serviceProviders/profilesbyProvidersID`;


//SuperAdmin
export const superAdminLoginUrl = `${baseUrl()}/api/v1/superadmin/login`;
export const superAdminGetAllUsers = `${baseUrl()}/api/v1/superadmin/sgetAllUsers`;
export const viewAUser = `${baseUrl()}/api/v1/superadmin/users`;
export const createAUser = `${baseUrl()}/api/v1/superadmin/createUsers`;
export const deleteAUser = `${baseUrl()}/api/v1/superadmin/user`;